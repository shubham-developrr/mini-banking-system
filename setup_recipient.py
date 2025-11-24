import os
import time
import random
import string
from datetime import datetime
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from bson.objectid import ObjectId

# Connect to local MongoDB
client = MongoClient('mongodb://127.0.0.1:27017/banking_system')
db = client['banking_system']
users_collection = db['users']
accounts_collection = db['accounts']

def generate_account_number():
    timestamp = str(int(time.time()))[-5:]
    random_num = ''.join(random.choices(string.digits, k=4))
    return f"1001{timestamp}{random_num}"

def create_recipient():
    email = "recipient@example.com"
    
    # Check if exists
    existing = users_collection.find_one({'email': email})
    if existing:
        # Get account
        account = accounts_collection.find_one({'user_id': existing['_id']})
        print(f"Recipient exists. Account: {account['account_number']}")
        return account['account_number']

    # Create User
    user = {
        'name': 'Recipient User',
        'email': email,
        'phone': '9876543210',
        'password': generate_password_hash('password123'),
        'created_at': datetime.utcnow()
    }
    result = users_collection.insert_one(user)
    user_id = result.inserted_id

    # Create Account
    account_number = generate_account_number()
    account = {
        'user_id': user_id,
        'account_number': account_number,
        'balance': 0, # Integer cents
        'created_at': datetime.utcnow()
    }
    accounts_collection.insert_one(account)
    
    print(f"Created Recipient. Account: {account_number}")
    return account_number

if __name__ == "__main__":
    create_recipient()
