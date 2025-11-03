# 🏦 SecureBank - Mini Banking System

A modern, secure mini banking system built with Python Flask and MongoDB for college project demonstration.

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Account Management**: Create and manage bank accounts
- **Deposit Money**: Add funds to your account instantly
- **Withdraw Money**: Withdraw funds with balance verification
- **Transfer Funds**: Send money to other accounts
- **Transaction History**: View detailed transaction records
- **Beautiful Dashboard**: Interactive charts and real-time updates
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5 (Responsive UI framework)
- Chart.js (Data visualization)
- Font Awesome (Icons)

### Backend
- Python 3.8+
- Flask 2.3.3 (Web framework)
- PyMongo 4.5.0 (MongoDB driver)
- Flask-CORS 4.0.0 (Cross-origin support)
- Werkzeug 2.3.7 (Security utilities)

### Database
- MongoDB Atlas (Cloud NoSQL database - FREE tier)

## 📋 Prerequisites

Before running this project, ensure you have the following:

1. **Python 3.8 or higher**
   - Download from: https://www.python.org/downloads/
   - Verify: `python --version`

2. **MongoDB Atlas Account (FREE!)**
   - Sign up at: https://cloud.mongodb.com
   - NO local installation needed!
   - See: `MONGODB-ATLAS-SETUP.md` for detailed setup

3. **Git** (Optional, for cloning)
   - Download from: https://git-scm.com/downloads/

## 🚀 Installation & Setup

### Step 1: Clone or Download Project

```bash
# If you have git
git clone <repository-url>
cd mini-banking-system

# OR download ZIP and extract it
```

### Step 2: Setup MongoDB Atlas (Cloud Database)

**📖 See detailed guide:** `MONGODB-ATLAS-SETUP.md`

**Quick steps:**
1. Go to https://cloud.mongodb.com
2. Create FREE account
3. Create FREE M0 cluster
4. Create database user (username + password)
5. Whitelist IP: 0.0.0.0/0 (all IPs)
6. Get connection string
7. Update `backend/.env` with your connection string

**⏱️ Takes only 5 minutes!**

### Step 3: Setup Backend

Open a NEW terminal in the project directory:

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Update .env file with your MongoDB Atlas connection string
# See MONGODB-ATLAS-SETUP.md for detailed instructions
# Edit backend/.env and replace:
# <username> with your database username
# <password> with your database password
# <cluster-url> with your cluster URL
```

### Step 4: Run Backend Server

```bash
# Make sure you're in the backend directory
python app.py

# You should see:
# ✅ MongoDB Atlas connected successfully!
# ✅ Database: banking_system
# ✅ Server starting on http://localhost:5000
```

**Keep this terminal window open!**

### Step 5: Open Frontend

Open a NEW terminal:

```bash
# Navigate to frontend directory
cd frontend

# Open index.html in your browser
# You can use any of these methods:

# Method 1: Direct open
start index.html

# Method 2: Using Python HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000

# Method 3: Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## 📱 How to Use

### 1. Register New Account

1. Open your browser and go to http://localhost:8000 (or wherever frontend is hosted)
2. Click "Register" or "Get Started"
3. Fill in the registration form:
   - Full Name
   - Email
   - Phone (10 digits)
   - Password (min 6 characters)
4. Click "Create Account"

### 2. Login

1. Click "Login" or "Sign In"
2. Enter your email and password
3. Click "Login"

### 3. Create Bank Account

- After first login, you'll see a modal to create your bank account
- Choose account type (Savings or Current)
- Click "Create Account"
- You'll receive a 13-digit account number

### 4. Perform Transactions

**Deposit Money:**
- Go to Dashboard → Deposit Money
- Enter amount and optional description
- Click "Deposit Money"

**Withdraw Money:**
- Go to Dashboard → Withdraw Money
- Enter amount (must not exceed balance)
- Click "Withdraw Money"

**Transfer Funds:**
- Go to Dashboard → Transfer Funds
- Enter recipient's 13-digit account number
- Enter amount and description
- Click "Transfer Money"

**View History:**
- Go to "Transactions" in navigation
- See all your transaction history
- Filter by type or search

## 🎨 Screenshots

### Landing Page
Beautiful hero section with features overview

### Dashboard
Real-time account summary with charts

### Transaction Pages
Clean, intuitive forms for all operations

### Transaction History
Detailed records with filters and search

## 🔒 Security Features

- Password hashing using Werkzeug
- Session-based authentication
- Input validation on frontend and backend
- CORS configuration
- MongoDB injection prevention

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check session

### Account
- `POST /api/account/create` - Create bank account
- `GET /api/account/info` - Get account info
- `GET /api/account/balance` - Get current balance

### Transactions
- `POST /api/transaction/deposit` - Deposit money
- `POST /api/transaction/withdraw` - Withdraw money
- `POST /api/transaction/transfer` - Transfer funds
- `GET /api/transaction/history` - Get transaction history

### Statistics
- `GET /api/stats` - Get account statistics

## 🗂️ Project Structure

```
mini-banking-system/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── index.html          # Landing page
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── dashboard.html      # Main dashboard
│   ├── deposit.html        # Deposit page
│   ├── withdraw.html       # Withdrawal page
│   ├── transfer.html       # Transfer page
│   ├── history.html        # Transaction history
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── js/
│       ├── auth.js         # Authentication logic
│       ├── dashboard.js    # Dashboard functionality
│       └── transactions.js # Transaction operations
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🐛 Troubleshooting

### MongoDB Atlas Connection Error

```
Problem: "MongoDB Atlas connection error" or "Authentication failed"
Solution:
1. Check MONGODB-ATLAS-SETUP.md for complete setup guide
2. Verify username and password in .env are correct
3. Make sure IP is whitelisted (0.0.0.0/0)
4. Ensure no extra spaces in connection string
5. Check internet connection
```

### Backend Not Starting

```
Problem: "Import errors" or "Module not found"
Solution:
1. Make sure you're in backend directory
2. Run: pip install -r requirements.txt
3. Check Python version: python --version (must be 3.8+)
```

### Frontend Not Connecting to Backend

```
Problem: "Network error" or CORS issues
Solution:
1. Make sure backend is running on http://localhost:5000
2. Check API_BASE_URL in JavaScript files
3. Verify Flask-CORS is installed
```

### Port Already in Use

```
Problem: "Port 5000 already in use"
Solution:
1. Stop other applications using port 5000
2. Or change port in app.py (last line)
```

## 📝 Testing Credentials

For quick testing, you can use these demo credentials:

**Demo Account (if you create one):**
- Email: demo@securebank.com
- Password: demo123

**Note:** You'll need to register this account first!

## 🎓 College Project Information

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database operations (CRUD)
- User authentication
- Modern frontend design
- Client-server architecture

## 👥 Team

- **Developer**: [Your Name]
- **Documentation**: [Partner's Name]

## 📄 License

This project is created for educational purposes as a college project.

## 🤝 Support

For any issues or questions:
1. Check the Troubleshooting section
2. Review the code comments
3. Contact the development team

## 🎉 Features to Demonstrate

During your presentation, highlight:
1. **Beautiful UI** - Modern, responsive design
2. **Smooth Transactions** - Real-time updates
3. **Data Visualization** - Charts and graphs
4. **Security** - Password hashing, validation
5. **Complete CRUD** - Create, Read, Update operations
6. **Error Handling** - User-friendly error messages

---

**Made with ❤️ for 5th Semester College Project**

**Date**: November 2024
