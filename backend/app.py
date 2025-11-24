# Mini Banking System Backend API
# Simplified version for Windows compatibility

import os
import time
import random
import string
import secrets
from datetime import datetime
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient, ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# FIX: Use secure secret key generation if not provided
app.secret_key = os.getenv('SECRET_KEY') or secrets.token_hex(32)

# Session configuration for same-origin cookies
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
# FIX: Enable secure cookies in production (or if explicitly set)
app.config['SESSION_COOKIE_SECURE'] = os.getenv('FLASK_ENV') == 'production'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_PATH'] = '/'

# Enable CORS with credentials
CORS(app, 
     supports_credentials=True, 
     origins=['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:5000'],
     allow_headers=['Content-Type', 'Authorization'],
     expose_headers=['Set-Cookie'],
     max_age=3600)

# MongoDB Connection
try:
    mongo_uri = os.getenv('MONGODB_URI')
    if not mongo_uri or ('mongodb+srv://' not in mongo_uri and 'mongodb://' not in mongo_uri):
        print("[WARN] MongoDB Atlas connection string not configured!")
        print("\n[INFO] SETUP INSTRUCTIONS:")
        print("  1. Create MongoDB Atlas account at https://cloud.mongodb.com")
        print("  2. Create a cluster")
        print("  3. Create a database user")
        print("  4. Whitelist your IP (0.0.0.0/0 for all IPs)")
        print("  5. Update MONGODB_URI in backend/.env with your connection string\n")
        exit(1)
    
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    db = client[os.getenv('DATABASE_NAME', 'banking_system')]
    
    users_collection = db['users']
    accounts_collection = db['accounts']
    transactions_collection = db['transactions']
    
    users_collection.create_index('email', unique=True)
    accounts_collection.create_index('account_number', unique=True)
    accounts_collection.create_index('user_id')
    transactions_collection.create_index('account_id')
    transactions_collection.create_index('timestamp')
    
    print("[OK] MongoDB Atlas connected successfully!")
    print(f"[OK] Database: {os.getenv('DATABASE_NAME', 'banking_system')}")
except Exception as e:
    print(f"[ERROR] MongoDB Atlas connection error: {e}")
    print("\n[TIP] Make sure you've:")
    print("   - Created a MongoDB Atlas account")
    print("   - Set up a cluster")
    print("   - Updated the MONGODB_URI in backend/.env")
    print("   - Whitelisted your IP address (0.0.0.0/0 for all IPs)")
    exit(1)

def generate_account_number():
    timestamp = str(int(time.time()))[-5:]
    random_num = ''.join(random.choices(string.digits, k=4))
    return f"1001{timestamp}{random_num}"

def validate_amount(amount_val):
    """
    Validate amount and convert to integer (paisa/cents).
    Returns (is_valid, value_in_cents_or_error_msg)
    """
    try:
        val = float(amount_val)
        if val <= 0:
            return False, "Amount must be positive"
        if val > 1000000:
            return False, "Maximum amount is Rs.10,00,000"
        # Convert to integer cents to avoid float precision issues
        return True, int(round(val * 100))
    except (ValueError, TypeError):
        return False, "Invalid amount format"

def format_money(amount_cents):
    """Convert integer cents back to float for display"""
    return amount_cents / 100.0

# ====================  ROUTES ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('name') or data.get('full_name', '').strip()
        email = data.get('email', '').strip().lower()
        phone = data.get('phone', '').strip()
        password = data.get('password', '')
        
        if not all([name, email, phone, password]):
            return jsonify({'success': False, 'error': 'All fields are required'}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'error': 'Password must be at least 6 characters'}), 400
        
        if len(phone) != 10 or not phone.isdigit():
            return jsonify({'success': False, 'error': 'Phone must be 10 digits'}), 400
        
        if users_collection.find_one({'email': email}):
            return jsonify({'success': False, 'error': 'Email already registered'}), 400
        
        user = {
            'name': name,
            'email': email,
            'phone': phone,
            'password': generate_password_hash(password),
            'created_at': datetime.utcnow()
        }
        
        result = users_collection.insert_one(user)
        user_id = result.inserted_id
        
        # Automatically create a banking account for the new user
        account_number = generate_account_number()
        account = {
            'user_id': user_id,
            'account_number': account_number,
            'balance': 0,  # Store as integer (cents)
            'created_at': datetime.utcnow()
        }
        accounts_collection.insert_one(account)
        
        # Set session
        session['user_id'] = str(user_id)
        session['user_email'] = email
        session['user_name'] = name
        
        print(f"[OK] User registered: {email}")
        print(f"[OK] Banking account created: {account_number}")
        
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'user': {'id': str(user_id), 'name': name, 'email': email},
            'account_number': account_number
        })
    
    except Exception as e:
        print(f"[ERROR] Registration error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password required'}), 400
        
        user = users_collection.find_one({'email': email})
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        session['user_id'] = str(user['_id'])
        session['user_email'] = email
        session['user_name'] = user['name']
        
        print(f"[OK] User logged in: {email}")
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'phone': user.get('phone', '')
            }
        })
    
    except Exception as e:
        print(f"[ERROR] Login error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    try:
        session.clear()
        return jsonify({'success': True, 'message': 'Logout successful'})
    except Exception as e:
        print(f"[ERROR] Logout error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/auth/check', methods=['GET'])
def check_session():
    try:
        if 'user_id' in session:
            return jsonify({
                'success': True,
                'logged_in': True,
                'user': {
                    'id': session.get('user_id'),
                    'name': session.get('user_name'),
                    'email': session.get('user_email')
                }
            })
        return jsonify({'success': True, 'logged_in': False})
    except Exception as e:
        print(f"[ERROR] Session check error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/account/create', methods=['POST'])
def create_account():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        user_id = session.get('user_id')
        
        existing = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        if existing:
            return jsonify({'success': False, 'error': 'Account already exists'}), 400
        
        account_number = generate_account_number()
        
        account = {
            'user_id': ObjectId(user_id),
            'account_number': account_number,
            'balance': 0, # Integer
            'created_at': datetime.utcnow()
        }
        
        accounts_collection.insert_one(account)
        
        print(f"[OK] Account created: {account_number}")
        return jsonify({
            'success': True,
            'message': 'Account created successfully',
            'account': {
                'account_number': account_number,
                'balance': 0.0
            }
        })
    
    except Exception as e:
        print(f"[ERROR] Account creation error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/account/info', methods=['GET'])
def get_account_info():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        user_id = session.get('user_id')
        account = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        
        if not account:
            return jsonify({'success': True, 'has_account': False})
        
        # Handle legacy float balances if any exist (migration on read)
        balance = account.get('balance', 0)
        if isinstance(balance, float):
            balance = int(round(balance * 100))
            # Optionally update DB here, but let's just convert for display
        
        return jsonify({
            'success': True,
            'has_account': True,
            'account': {
                'account_number': account['account_number'],
                'balance': format_money(balance)
            }
        })
    
    except Exception as e:
        print(f"[ERROR] Get account info error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/account/balance', methods=['GET'])
def get_balance():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        user_id = session.get('user_id')
        account = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        
        if not account:
            return jsonify({'success': False, 'error': 'No account found'}), 404
        
        balance = account.get('balance', 0)
        if isinstance(balance, float):
            balance = int(round(balance * 100))
            
        return jsonify({
            'success': True,
            'balance': format_money(balance),
            'account_number': account['account_number']
        })
    
    except Exception as e:
        print(f"[ERROR] Get balance error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/transactions/deposit', methods=['POST'])
def deposit():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        data = request.json
        is_valid, result = validate_amount(data.get('amount'))
        
        if not is_valid:
            return jsonify({'success': False, 'error': result}), 400
        
        amount_cents = result
        user_id = session.get('user_id')
        
        # Atomic update
        updated_account = accounts_collection.find_one_and_update(
            {'user_id': ObjectId(user_id)},
            {'$inc': {'balance': amount_cents}},
            return_document=ReturnDocument.AFTER
        )
        
        if not updated_account:
            return jsonify({'success': False, 'error': 'No account found'}), 404
        
        new_balance_cents = updated_account['balance']
        
        transaction = {
            'account_id': updated_account['_id'],
            'type': 'deposit',
            'amount': format_money(amount_cents),
            'balance_after': format_money(new_balance_cents),
            'timestamp': datetime.utcnow(),
            'description': f'Deposit of Rs.{format_money(amount_cents):,.2f}'
        }
        
        transactions_collection.insert_one(transaction)
        
        print(f"[OK] Deposit: Rs.{format_money(amount_cents)} to {updated_account['account_number']}")
        return jsonify({
            'success': True,
            'message': f'Successfully deposited Rs.{format_money(amount_cents):,.2f}',
            'new_balance': format_money(new_balance_cents)
        })
    
    except Exception as e:
        print(f"[ERROR] Deposit error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/transactions/withdraw', methods=['POST'])
def withdraw():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        data = request.json
        is_valid, result = validate_amount(data.get('amount'))
        
        if not is_valid:
            return jsonify({'success': False, 'error': result}), 400
            
        amount_cents = result
        user_id = session.get('user_id')
        
        # Atomic check and update
        # Only update if balance >= amount
        updated_account = accounts_collection.find_one_and_update(
            {
                'user_id': ObjectId(user_id),
                'balance': {'$gte': amount_cents}
            },
            {'$inc': {'balance': -amount_cents}},
            return_document=ReturnDocument.AFTER
        )
        
        if not updated_account:
            # Check if account exists at all to give better error message
            if not accounts_collection.find_one({'user_id': ObjectId(user_id)}):
                return jsonify({'success': False, 'error': 'No account found'}), 404
            return jsonify({'success': False, 'error': 'Insufficient balance'}), 400
        
        new_balance_cents = updated_account['balance']
        
        transaction = {
            'account_id': updated_account['_id'],
            'type': 'withdrawal',
            'amount': format_money(amount_cents),
            'balance_after': format_money(new_balance_cents),
            'timestamp': datetime.utcnow(),
            'description': f'Withdrawal of Rs.{format_money(amount_cents):,.2f}'
        }
        
        transactions_collection.insert_one(transaction)
        
        print(f"[OK] Withdrawal: Rs.{format_money(amount_cents)} from {updated_account['account_number']}")
        return jsonify({
            'success': True,
            'message': f'Successfully withdrew Rs.{format_money(amount_cents):,.2f}',
            'new_balance': format_money(new_balance_cents)
        })
    
    except Exception as e:
        print(f"[ERROR] Withdrawal error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/transactions/transfer', methods=['POST'])
def transfer():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        data = request.json
        to_account_number = data.get('to_account', '').strip()
        is_valid, result = validate_amount(data.get('amount'))
        
        if not to_account_number:
            return jsonify({'success': False, 'error': 'Recipient account number required'}), 400
            
        if not is_valid:
            return jsonify({'success': False, 'error': result}), 400
            
        amount_cents = result
        user_id = session.get('user_id')
        
        # 1. Verify sender account and check self-transfer
        sender_account = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        if not sender_account:
            return jsonify({'success': False, 'error': 'Sender account not found'}), 404
            
        if sender_account['account_number'] == to_account_number:
            return jsonify({'success': False, 'error': 'Cannot transfer to same account'}), 400

        # 2. Verify recipient account exists
        recipient_account = accounts_collection.find_one({'account_number': to_account_number})
        if not recipient_account:
            return jsonify({'success': False, 'error': 'Recipient account not found'}), 404

        # 3. Perform Transfer (Compensating Transaction Pattern)
        
        # Step A: Deduct from Sender (Atomic)
        updated_sender = accounts_collection.find_one_and_update(
            {
                '_id': sender_account['_id'],
                'balance': {'$gte': amount_cents}
            },
            {'$inc': {'balance': -amount_cents}},
            return_document=ReturnDocument.AFTER
        )
        
        if not updated_sender:
            return jsonify({'success': False, 'error': 'Insufficient balance'}), 400
            
        # Step B: Add to Recipient (Atomic)
        try:
            updated_recipient = accounts_collection.find_one_and_update(
                {'_id': recipient_account['_id']},
                {'$inc': {'balance': amount_cents}},
                return_document=ReturnDocument.AFTER
            )
            
            if not updated_recipient:
                raise Exception("Recipient account update failed (account might have been deleted)")
                
        except Exception as transfer_error:
            # COMPENSATION: Refund Sender
            print(f"[ERROR] Transfer failed, refunding sender: {transfer_error}")
            accounts_collection.update_one(
                {'_id': sender_account['_id']},
                {'$inc': {'balance': amount_cents}}
            )
            return jsonify({'success': False, 'error': 'Transfer failed. Amount refunded.'}), 500

        # 4. Record Transactions
        timestamp = datetime.utcnow()
        
        from_transaction = {
            'account_id': sender_account['_id'],
            'type': 'transfer_out',
            'amount': format_money(amount_cents),
            'balance_after': format_money(updated_sender['balance']),
            'to_account': to_account_number,
            'timestamp': timestamp,
            'description': f'Transfer to {to_account_number}'
        }
        
        to_transaction = {
            'account_id': recipient_account['_id'],
            'type': 'transfer_in',
            'amount': format_money(amount_cents),
            'balance_after': format_money(updated_recipient['balance']),
            'from_account': sender_account['account_number'],
            'timestamp': timestamp,
            'description': f'Transfer from {sender_account["account_number"]}'
        }
        
        transactions_collection.insert_many([from_transaction, to_transaction])
        
        print(f"[OK] Transfer: Rs.{format_money(amount_cents)} from {sender_account['account_number']} to {to_account_number}")
        return jsonify({
            'success': True,
            'message': f'Successfully transferred Rs.{format_money(amount_cents):,.2f} to {to_account_number}',
            'new_balance': format_money(updated_sender['balance'])
        })
    
    except Exception as e:
        print(f"[ERROR] Transfer error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/transactions/history', methods=['GET'])
def get_transaction_history():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        user_id = session.get('user_id')
        account = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        
        if not account:
            return jsonify({'success': False, 'error': 'No account found'}), 404
        
        transactions = list(transactions_collection.find(
            {'account_id': account['_id']}
        ).sort('timestamp', -1).limit(100))
        
        for t in transactions:
            t['_id'] = str(t['_id'])
            t['account_id'] = str(t['account_id'])
            t['date'] = t['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
        
        return jsonify({
            'success': True,
            'transactions': transactions,
            'account_number': account['account_number']
        })
    
    except Exception as e:
        print(f"[ERROR] Transaction history error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'Please login first'}), 401
        
        user_id = session.get('user_id')
        account = accounts_collection.find_one({'user_id': ObjectId(user_id)})
        
        if not account:
            return jsonify({'success': False, 'error': 'No account found'}), 404
        
        transactions = list(transactions_collection.find(
            {'account_id': account['_id']}
        ).sort('timestamp', -1).limit(10))
        
        total_deposits = sum(t['amount'] for t in transactions if t['type'] == 'deposit')
        total_withdrawals = sum(t['amount'] for t in transactions if t['type'] == 'withdrawal')
        total_transfers_out = sum(t['amount'] for t in transactions if t['type'] == 'transfer_out')
        total_transfers_in = sum(t['amount'] for t in transactions if t['type'] == 'transfer_in')
        
        for t in transactions:
            t['_id'] = str(t['_id'])
            t['account_id'] = str(t['account_id'])
            t['date'] = t['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
        
        # Handle legacy float balance
        balance = account.get('balance', 0)
        if isinstance(balance, float):
            balance = int(round(balance * 100))
            
        return jsonify({
            'success': True,
            'stats': {
                'balance': format_money(balance),
                'total_deposits': total_deposits,
                'total_withdrawals': total_withdrawals,
                'total_transfers_out': total_transfers_out,
                'total_transfers_in': total_transfers_in,
                'transaction_count': len(transactions)
            },
            'recent_transactions': transactions
        })
    
    except Exception as e:
        print(f"[ERROR] Stats error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== SERVE FRONTEND ====================

@app.route('/')
def serve_index():
    """Serve the frontend index page"""
    from flask import send_from_directory
    frontend_dir = os.path.join(os.path.dirname(__file__), '..', 'frontend')
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static frontend files"""
    from flask import send_from_directory
    frontend_dir = os.path.join(os.path.dirname(__file__), '..', 'frontend')
    return send_from_directory(frontend_dir, path)

if __name__ == '__main__':
    # Get port from environment variable (for deployment) or use 5000 for local
    port = int(os.getenv('PORT', 5000))
    
    print("\n" + "="*50)
    print("MINI BANKING SYSTEM - BACKEND API")
    print("="*50)
    print(f"[OK] Server starting on port {port}")
    print("[OK] Frontend accessible at the same URL")
    print("[OK] Press CTRL+C to stop the server")
    print("="*50 + "\n")
    
    # Use Flask's built-in server with threading
    app.run(host='0.0.0.0', port=port, debug=False, threaded=True, use_reloader=False)
