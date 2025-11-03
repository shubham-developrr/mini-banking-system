# 🚀 Quick Setup Guide - SecureBank Banking System

This guide will help you set up and run the banking system in **under 10 minutes**!

## 📋 What You'll Need

1. **Python 3.8+** - [Download Here](https://www.python.org/downloads/)
2. **MongoDB Atlas Account (FREE!)** - [Sign Up Here](https://cloud.mongodb.com)
3. A web browser (Chrome, Firefox, Edge)

**⚠️ NO need to install MongoDB locally! We're using cloud database.**

---

## ⚡ Quick Setup (2 Steps + Cloud Setup)

### � Step 0: Setup MongoDB Atlas (5 Minutes)

**📖 Complete guide:** See `MONGODB-ATLAS-SETUP.md`

**Quick version:**
1. Go to https://cloud.mongodb.com → Sign up (FREE)
2. Create FREE cluster (M0 Sandbox)
3. Create database user (save username + password!)
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
6. Update `backend/.env`:
   ```bash
   MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**✅ Done once, works forever!**

---

### � Step 1: Start Backend Server

1. Open a **NEW** terminal/command prompt
2. Navigate to the backend folder:
   ```bash
   cd "c:\Users\shubham\Desktop\Dev\mini banking system\backend"
   ```
3. Install dependencies (first time only):
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
5. You should see:
   ```
   ✅ MongoDB Atlas connected successfully!
   ✅ Database: banking_system
   ✅ Server starting on http://localhost:5000
   ```
6. **Keep this window open!**

**⚠️ If you see "MongoDB Atlas connection error":**
- Check `MONGODB-ATLAS-SETUP.md`
- Verify your connection string in `.env`
- Make sure you replaced `<username>` and `<password>`

---

### 🟢 Step 2: Open Frontend

**Option A - Direct Open:**
1. Navigate to: `c:\Users\shubham\Desktop\Dev\mini banking system\frontend`
2. Double-click `index.html`

**Option B - Using Python Server:**
1. Open a **NEW** terminal
2. Navigate to frontend:
   ```bash
   cd "c:\Users\shubham\Desktop\Dev\mini banking system\frontend"
   ```
3. Start server:
   ```bash
   python -m http.server 8000
   ```
4. Open browser: http://localhost:8000

**Option C - VS Code Live Server:**
1. Open project in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🎯 Testing the Application

### Create Your First Account

1. **Register:**
   - Click "Get Started" or "Register"
   - Fill in the form:
     - Full Name: John Doe
     - Email: john@test.com
     - Phone: 9876543210
     - Password: test123
   - Click "Create Account"

2. **Login:**
   - Email: john@test.com
   - Password: test123
   - Click "Login"

3. **Create Bank Account:**
   - A popup will appear
   - Choose "Savings Account"
   - Click "Create Account"
   - You'll get a 13-digit account number!

4. **Test Deposit:**
   - Click "Deposit Money"
   - Enter amount: 5000
   - Description: Initial deposit
   - Click "Deposit Money"
   - ✅ Success! You should see confirmation

5. **Test Withdraw:**
   - Click "Withdraw Money"
   - Enter amount: 1000
   - Click "Withdraw Money"
   - ✅ Success!

6. **Test Transfer:**
   - First, create another account (logout, register again)
   - Note the new account number
   - Login to first account
   - Click "Transfer Funds"
   - Enter recipient account number
   - Enter amount: 500
   - Click "Transfer Money"
   - ✅ Success!

7. **View History:**
   - Click "Transactions" in the navigation
   - See all your transactions!

---

## 📸 Screenshot Locations for Documentation

Take screenshots at these points:

### 1. Landing Page
- **Location:** `index.html` (homepage)
- **What to capture:** Hero section, features, services

### 2. Registration Page
- **Location:** `register.html`
- **What to capture:** Registration form

### 3. Login Page
- **Location:** `login.html`
- **What to capture:** Login form

### 4. Create Account Modal
- **Location:** First login on `dashboard.html`
- **What to capture:** Account creation popup

### 5. Dashboard
- **Location:** `dashboard.html`
- **What to capture:** 
  - Account summary cards
  - Transaction chart
  - Recent transactions table
  - Quick actions buttons

### 6. Deposit Page
- **Location:** `deposit.html`
- **What to capture:** 
  - Deposit form
  - Success modal after deposit

### 7. Withdraw Page
- **Location:** `withdraw.html`
- **What to capture:** 
  - Withdraw form
  - Success modal

### 8. Transfer Page
- **Location:** `transfer.html`
- **What to capture:** 
  - Transfer form
  - Success modal with reference number

### 9. Transaction History
- **Location:** `history.html`
- **What to capture:** 
  - Summary cards
  - Complete transaction table
  - Filter options

### 10. Backend Console
- **What to capture:** 
  - Terminal showing "MongoDB connected"
  - Transaction logs in the console

---

## 🎨 Features to Highlight in Documentation

1. **Modern UI Design:**
   - Gradient backgrounds
   - Smooth animations
   - Responsive design
   - Clean, professional look

2. **Real-time Updates:**
   - Balance updates instantly
   - Transaction history refreshes
   - Chart updates automatically

3. **Security Features:**
   - Password hashing
   - Session management
   - Input validation
   - Error handling

4. **Complete Functionality:**
   - User registration/login
   - Account creation
   - Deposits
   - Withdrawals
   - Transfers
   - Transaction history

5. **Data Visualization:**
   - Interactive Chart.js charts
   - Transaction overview
   - Summary statistics

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoDB Atlas connection error"
**Solution:**
- See `MONGODB-ATLAS-SETUP.md` for complete setup
- Verify connection string in `backend/.env`
- Check username and password are correct
- Ensure IP is whitelisted (0.0.0.0/0)
- Test internet connection

### Issue 2: "Authentication failed"
**Solution:**
```bash
# Make sure .env has correct format:
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Replace USERNAME and PASSWORD with actual values
# NO brackets < > should remain
```

### Issue 3: "Module not found" error
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Issue 4: Frontend can't connect to backend
**Solution:**
- Verify backend is running on http://localhost:5000
- Check browser console for errors
- Make sure CORS is enabled (it is by default)

### Issue 5: "Port 5000 already in use"
**Solution:**
- Stop other applications using port 5000
- Or change the port in `backend/app.py` (last line)

---

## 📊 Demo Data for Testing

Use these for comprehensive testing:

**User 1:**
- Name: Alice Smith
- Email: alice@test.com
- Phone: 9876543210
- Password: alice123

**User 2:**
- Name: Bob Johnson
- Email: bob@test.com
- Phone: 9876543211
- Password: bob123

**Test Transactions:**
1. Alice deposits ₹10,000
2. Alice withdraws ₹2,000
3. Bob deposits ₹5,000
4. Alice transfers ₹1,500 to Bob
5. Bob transfers ₹500 to Alice

This creates a rich transaction history for demonstration!

---

## 🎓 For Your Partner's Documentation

Include these sections:

### 1. **Introduction**
- What is the banking system?
- Why we built it
- Technologies used

### 2. **System Requirements**
- Hardware requirements
- Software requirements
- Dependencies list

### 3. **Installation Guide**
- Step-by-step setup (from this file)
- Screenshots at each step

### 4. **Features Overview**
- List all 8 core features
- Screenshot of each feature
- How to use each feature

### 5. **System Architecture**
- Frontend architecture
- Backend architecture
- Database schema
- API endpoints

### 6. **User Manual**
- How to register
- How to create account
- How to perform transactions
- How to view history

### 7. **Technical Documentation**
- Code structure
- API documentation
- Database design
- Security measures

### 8. **Testing & Results**
- Test cases performed
- Screenshots of successful operations
- Performance observations

### 9. **Conclusion**
- What was learned
- Future improvements
- Challenges faced

### 10. **References**
- Technologies used
- Documentation links

---

## 💡 Tips for Presentation

1. **Start with Landing Page:** Show the beautiful design
2. **Demo Registration:** Create account live
3. **Show Dashboard:** Highlight the charts
4. **Perform Transactions:** Do each operation
5. **Show History:** Display transaction records
6. **Explain Backend:** Show terminal logs
7. **Discuss Security:** Mention password hashing, validation
8. **Show Code:** Brief code walkthrough (optional)

---

## 📝 Checklist Before Demo

- [ ] MongoDB Atlas account created and cluster setup
- [ ] Connection string added to backend/.env
- [ ] Backend server is running
- [ ] Frontend is open in browser
- [ ] Test account created
- [ ] Sample transactions performed
- [ ] All pages tested
- [ ] Screenshots taken
- [ ] Documentation ready
- [ ] Presentation slides prepared
- [ ] Demo flow practiced

---

## 🎉 You're All Set!

Your banking system is now ready to demonstrate!

**Good luck with your presentation! 🚀**

---

**Need Help?**
- Check README.md for detailed information
- Review code comments
- Test all features before demo day
