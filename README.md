<div align="center">

# 🏦 SecureBank - Mini Banking System

### *A Modern, Secure, Cloud-Powered Banking Application*

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/cloud/atlas)
[![License](https://img.shields.io/badge/License-Educational-orange.svg)]()

[🚀 Features](#-features) • [📦 Installation](#-quick-start) • [📖 Documentation](#-documentation) • [🎯 Demo](#-usage-guide)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Project Structure](#️-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Overview

**SecureBank** is a full-stack mini banking system built for educational purposes. It demonstrates modern web development practices with a clean, intuitive interface and robust backend architecture. Perfect for college projects, learning full-stack development, or understanding banking system fundamentals.

### ✨ Why SecureBank?

- 🌐 **Cloud-First**: MongoDB Atlas integration - access from anywhere
- 🔒 **Secure**: Password hashing, session management, input validation
- 📱 **Responsive**: Beautiful UI that works on all devices
- 🚀 **Production-Ready**: Deployment-ready code structure
- 📊 **Feature-Rich**: Complete banking operations with real-time updates
- 🎨 **Modern Design**: Bootstrap 5 with custom styling

---

## ✨ Features

<div align="center">

| 🔐 Authentication | 💰 Transactions | 📊 Analytics | 🎨 UI/UX |
|:----------------:|:---------------:|:------------:|:--------:|
| ✅ User Registration | ✅ Deposit Money | ✅ Account Dashboard | ✅ Responsive Design |
| ✅ Secure Login | ✅ Withdraw Funds | ✅ Transaction History | ✅ Interactive Charts |
| ✅ Session Management | ✅ Transfer Money | ✅ Real-time Statistics | ✅ Modern Interface |
| ✅ Password Hashing | ✅ Balance Tracking | ✅ Data Visualization | ✅ Mobile Friendly |

</div>

### 🎯 Core Functionalities

1. **User Management**
   - 📝 Register new account with email verification format
   - 🔑 Secure login with hashed passwords
   - 👤 Profile management
   - 🚪 Session-based authentication

2. **Account Operations**
   - 🏦 Create bank account with unique 13-digit number
   - 💳 View account details and balance
   - 📈 Real-time balance updates
   - 🔍 Account verification

3. **Banking Transactions**
   - 💵 **Deposit**: Add funds instantly (₹1 - ₹10,00,000)
   - 💸 **Withdraw**: Withdraw with balance validation
   - 🔄 **Transfer**: Send money to other accounts
   - 📜 Complete transaction history with timestamps

4. **Dashboard & Analytics**
   - 📊 Interactive charts (deposits, withdrawals, trends)
   - 💰 Total deposits and withdrawals summary
   - 📅 Recent transactions overview
   - 🎯 Quick action buttons

---

## 🛠️ Technology Stack

### Frontend
```
HTML5 + CSS3 + JavaScript (ES6+)
├── Bootstrap 5.3.0      → Responsive UI Framework
├── Chart.js             → Data Visualization
├── Font Awesome         → Icon Library
└── Custom CSS           → Brand Styling
```

### Backend
```python
Python 3.8+
├── Flask 2.3.3          → Web Framework
├── PyMongo 4.5.0        → MongoDB Driver
├── Flask-CORS 4.0.0     → Cross-Origin Support
├── Werkzeug 2.3.7       → Security & Hashing
└── Python-dotenv        → Environment Management
```

### Database
```
MongoDB Atlas (Cloud NoSQL Database)
├── Users Collection     → User accounts & credentials
├── Accounts Collection  → Bank accounts & balances
└── Transactions         → All transaction records
```

---

## 🚀 Quick Start

### Prerequisites

- ✅ Python 3.8 or higher ([Download](https://www.python.org/downloads/))
- ✅ MongoDB Atlas account ([Sign Up FREE](https://cloud.mongodb.com))
- ✅ Git (optional) ([Download](https://git-scm.com/))

### Installation (5 Minutes Setup! ⚡)

#### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/securebank.git
cd securebank
```

#### Step 2: Setup MongoDB Atlas

📖 **[See Detailed MongoDB Setup Guide](docs/MONGODB-ATLAS-SETUP.md)**

**Quick Steps:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create FREE account (M0 cluster - no credit card needed!)
3. Create database user (username + password)
4. Whitelist IP: `0.0.0.0/0` (allows all IPs)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

#### Step 3: Configure Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
cp .env.example .env

# Edit .env and add your MongoDB connection string
# Use notepad, VS Code, or any text editor:
notepad .env
```

**`.env` file should look like:**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=banking_system
SECRET_KEY=your-super-secret-key-change-this
```

#### Step 4: Run the Application

```bash
# Start backend server (from backend directory)
python app.py

# Server will start on http://localhost:5000
# Frontend is served automatically from the same port!
```

#### Step 5: Access the Application

🌐 Open your browser and navigate to:
```
http://localhost:5000
```

**🎉 That's it! You're ready to go!**

---

## 📖 Usage Guide

### 1️⃣ Register New User

<details>
<summary>Click to expand registration steps</summary>

1. Navigate to `http://localhost:5000`
2. Click **"Get Started"** or **"Register"**
3. Fill in the form:
   - **Full Name**: Your name
   - **Email**: Valid email address
   - **Phone**: 10-digit mobile number
   - **Password**: Minimum 6 characters
4. Click **"Create Account"**
5. You'll be redirected to login page

</details>

### 2️⃣ Login to Dashboard

<details>
<summary>Click to expand login steps</summary>

1. Click **"Login"**
2. Enter credentials:
   - Email: `demo@securebank.com`
   - Password: `demo1234`
3. Click **"Login"**
4. You'll be redirected to Dashboard

</details>

### 3️⃣ Create Bank Account

<details>
<summary>Click to expand account creation</summary>

- First-time users will see a modal to create bank account
- Choose **Account Type**: Savings or Current
- Click **"Create Account"**
- You'll receive a unique 13-digit account number
- Example: `1001745618456`

</details>

### 4️⃣ Perform Transactions

#### 💵 Deposit Money
```
Dashboard → Deposit Money
→ Enter Amount (₹1 - ₹10,00,000)
→ Add Description (optional)
→ Click "Deposit Money"
→ ✅ Balance updated instantly!
```

#### 💸 Withdraw Money
```
Dashboard → Withdraw Money
→ Enter Amount (must not exceed balance)
→ Add Description (optional)
→ Click "Withdraw Money"
→ ✅ Balance deducted instantly!
```

#### 🔄 Transfer Funds
```
Dashboard → Transfer Funds
→ Enter Recipient's Account Number (13 digits)
→ Enter Amount
→ Add Description
→ Click "Transfer Money"
→ ✅ Both accounts updated!
```

#### 📜 View Transaction History
```
Dashboard → View History
→ See all transactions with:
  - Date & Time
  - Transaction Type
  - Amount
  - Balance After
  - Description
→ Filter by type or search
```

---

## 🗂️ Project Structure

```
securebank/
│
├── 📂 backend/
│   ├── app.py                 # 🔥 Main Flask application
│   ├── requirements.txt       # 📦 Python dependencies
│   ├── .env.example          # 🔧 Environment template
│   └── .env                  # 🔒 Your config (git-ignored)
│
├── 📂 frontend/
│   ├── 📄 index.html         # 🏠 Landing page
│   ├── 📄 login.html         # 🔑 Login page
│   ├── 📄 register.html      # 📝 Registration page
│   ├── 📄 dashboard.html     # 📊 Main dashboard
│   ├── 📄 deposit.html       # 💵 Deposit page
│   ├── 📄 withdraw.html      # 💸 Withdrawal page
│   ├── 📄 transfer.html      # 🔄 Transfer page
│   ├── 📄 history.html       # 📜 Transaction history
│   │
│   ├── 📂 css/
│   │   └── style.css         # 🎨 Custom styles
│   │
│   └── 📂 js/
│       ├── auth.js           # 🔐 Authentication logic
│       ├── dashboard.js      # 📊 Dashboard functions
│       └── transactions.js   # 💰 Transaction operations
│
├── 📂 docs/                  # 📚 Documentation files
│   ├── MONGODB-ATLAS-SETUP.md
│   ├── QUICK-REFERENCE.md
│   └── PROJECT_BLUEPRINT.md
│
├── 📂 .archive/              # 🗄️ Old/test files (git-ignored)
├── 📄 README.md              # 📖 You are here!
├── 📄 .gitignore            # 🚫 Git ignore rules
└── 📄 LICENSE               # ⚖️ License file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |
| `POST` | `/auth/logout` | Logout user | ✅ |
| `GET` | `/auth/check` | Check session | ✅ |

### Account Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/account/create` | Create bank account | ✅ |
| `GET` | `/account/info` | Get account details | ✅ |
| `GET` | `/account/balance` | Get current balance | ✅ |

### Transaction Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/transactions/deposit` | Deposit money | ✅ |
| `POST` | `/transactions/withdraw` | Withdraw money | ✅ |
| `POST` | `/transactions/transfer` | Transfer funds | ✅ |
| `GET` | `/transactions/history` | Get transaction history | ✅ |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/dashboard/stats` | Get account statistics | ✅ |

<details>
<summary>📝 Click to see example API requests</summary>

#### Register User
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "secure123"
}
```

#### Deposit Money
```javascript
POST /api/transactions/deposit
Content-Type: application/json

{
  "amount": 1000,
  "description": "Initial deposit"
}
```

</details>

---

## 🚀 Deployment

### Option 1: Render (Recommended - FREE)

<details>
<summary>Click for Render deployment guide</summary>

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `SECRET_KEY`: Random secret key
7. Click "Create Web Service"
8. Wait for deployment (2-3 minutes)
9. Access your app at `https://your-app.onrender.com`

</details>

### Option 2: Railway

<details>
<summary>Click for Railway deployment guide</summary>

1. Push code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Railway auto-detects Python
6. Add environment variables in Settings
7. Deploy automatically!

</details>

### Option 3: Heroku

<details>
<summary>Click for Heroku deployment guide</summary>

**Note**: Heroku no longer has a free tier

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your-connection-string
   heroku config:set SECRET_KEY=your-secret-key
   ```
5. Deploy: `git push heroku main`

</details>

---

## 🐛 Troubleshooting

### Common Issues & Solutions

<details>
<summary><b>❌ MongoDB Connection Error</b></summary>

**Symptoms**: `Connection timeout`, `Authentication failed`

**Solutions**:
1. ✅ Verify MongoDB Atlas credentials in `.env`
2. ✅ Whitelist IP address `0.0.0.0/0` in MongoDB Atlas
3. ✅ Check internet connection
4. ✅ Ensure no extra spaces in connection string
5. ✅ Test connection string in MongoDB Compass

**Check your `.env` format**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
```

</details>

<details>
<summary><b>❌ Module Not Found Error</b></summary>

**Symptoms**: `ImportError: No module named 'flask'`

**Solutions**:
```bash
# Make sure you're in backend directory
cd backend

# Reinstall dependencies
pip install -r requirements.txt

# If using virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

</details>

<details>
<summary><b>❌ Port Already in Use</b></summary>

**Symptoms**: `OSError: [Errno 48] Address already in use`

**Solutions**:

**Windows**:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Linux/Mac**:
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

Or change port in `app.py`:
```python
app.run(host='0.0.0.0', port=8080)  # Use different port
```

</details>

<details>
<summary><b>❌ CORS Error</b></summary>

**Symptoms**: `Access to fetch blocked by CORS policy`

**Solutions**:
1. ✅ Ensure Flask-CORS is installed
2. ✅ Check CORS configuration in `app.py`
3. ✅ Frontend served from same port as backend (already configured!)
4. ✅ Clear browser cache

</details>

<details>
<summary><b>❌ Session Not Persisting</b></summary>

**Symptoms**: Keeps redirecting to login

**Solutions**:
1. ✅ Check `SECRET_KEY` is set in `.env`
2. ✅ Access via `http://localhost:5000` (not file://)
3. ✅ Enable cookies in browser
4. ✅ Clear browser cookies and try again

</details>

---

## 📚 Documentation

Detailed documentation available in the `docs/` folder:

- 📖 [MongoDB Atlas Setup Guide](docs/MONGODB-ATLAS-SETUP.md)
- 📖 [Quick Reference](docs/QUICK-REFERENCE.md)
- 📖 [Project Blueprint](docs/PROJECT_BLUEPRINT.md)

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ **Full-Stack Development**: Frontend + Backend + Database
- ✅ **RESTful API Design**: CRUD operations with proper HTTP methods
- ✅ **Database Operations**: MongoDB with PyMongo
- ✅ **Authentication**: Session-based user authentication
- ✅ **Security**: Password hashing, input validation
- ✅ **Modern UI/UX**: Responsive design with Bootstrap
- ✅ **Version Control**: Git workflow
- ✅ **Deployment**: Cloud deployment strategies

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔀 Open Pull Request

---

## 📝 License

This project is created for **educational purposes** as a college project demonstration.

---

## 👥 Credits

**Developed by**: Your Team Name
- Developer: [Your Name]
- Documentation: [Partner Name]

**Technologies Used**: Python, Flask, MongoDB, Bootstrap, Chart.js

---

## 📞 Support

Need help? Here's what to do:

1. 📖 Check the [Troubleshooting](#-troubleshooting) section
2. 📚 Read the documentation in `docs/` folder
3. 🐛 Open an issue on GitHub
4. 💬 Contact the development team

---

## 🎯 Future Enhancements

Planned features for version 2.0:

- [ ] Two-factor authentication (2FA)
- [ ] Email notifications for transactions
- [ ] Account statements (PDF generation)
- [ ] Loan management system
- [ ] Admin dashboard
- [ ] Transaction limits and alerts
- [ ] Multi-currency support
- [ ] Mobile app (React Native)

---

## ⭐ Star This Repository!

If this project helped you learn or if you found it useful, please give it a ⭐!

---

<div align="center">

**Made with ❤️ for Educational Excellence**

**Last Updated**: November 2025

[⬆ Back to Top](#-securebank---mini-banking-system)

</div>
