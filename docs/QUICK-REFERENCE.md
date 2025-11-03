# 📚 QUICK REFERENCE GUIDE
**3-Day Banking System Sprint**

---

## 🚀 QUICK START

### 1. Install MongoDB
```bash
# Download from: https://www.mongodb.com/try/download/community
# After installation, start MongoDB:
net start MongoDB
```

### 2. Install Python Packages
```bash
cd backend
pip install flask pymongo flask-cors werkzeug python-dotenv
```

### 3. Create .env File
```
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=banking_system
SECRET_KEY=your-secret-key-12345
```

### 4. Run Backend
```bash
cd backend
python app.py
```

### 5. Open Frontend
```
Open frontend/index.html in browser
Or use Live Server extension in VS Code
```

---

## 📋 ESSENTIAL COMMANDS

### MongoDB Commands
```bash
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# MongoDB Shell
mongosh

# Show databases
show dbs

# Use database
use banking_system

# Show collections
show collections

# Find all users
db.users.find()

# Find all accounts
db.accounts.find()

# Find all transactions
db.transactions.find()

# Drop database (start fresh)
db.dropDatabase()
```

### Python/Flask Commands
```bash
# Install package
pip install package-name

# Create requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Run Flask app
python app.py

# Run with debug mode
python app.py --debug
```

### Git Commands
```bash
# Initialize repo
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Check status
git status

# View changes
git diff
```

---

## 🔌 API ENDPOINTS QUICK REFERENCE

### Authentication
```
POST /api/auth/register
Body: {full_name, email, phone, password}

POST /api/auth/login
Body: {email, password}

POST /api/auth/logout

GET /api/auth/check
```

### Account
```
POST /api/account/create
Body: {account_type}

GET /api/account/info

GET /api/account/balance
```

### Transactions
```
POST /api/transaction/deposit
Body: {amount, description}

POST /api/transaction/withdraw
Body: {amount, description}

POST /api/transaction/transfer
Body: {to_account, amount, description}

GET /api/transaction/history
Query: ?limit=10&skip=0
```

---

## 💻 CODE SNIPPETS

### Fetch API Template
```javascript
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: 'Network error' };
    }
}

// Usage
const result = await apiCall('/api/auth/login', 'POST', {
    email: 'user@example.com',
    password: 'password123'
});
```

### Form Validation
```javascript
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

function validateAmount(amount) {
    return !isNaN(amount) && parseFloat(amount) > 0;
}
```

### Toast Notification
```javascript
function toast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

### Loading Spinner
```javascript
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}
```

---

## 🎨 CSS CLASSES REFERENCE

### Bootstrap Grid
```html
<div class="container">
    <div class="row">
        <div class="col-md-6">Half width on medium+</div>
        <div class="col-md-6">Half width on medium+</div>
    </div>
</div>
```

### Bootstrap Cards
```html
<div class="card">
    <div class="card-header">Title</div>
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Card content</p>
        <a href="#" class="btn btn-primary">Action</a>
    </div>
</div>
```

### Bootstrap Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
```

### Bootstrap Forms
```html
<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
</div>
```

---

## 🐛 DEBUGGING TIPS

### Check Backend is Running
```
Open browser: http://localhost:5000
Should see: "Banking System API" or similar message
```

### Check MongoDB is Running
```bash
mongosh
# If connects, MongoDB is running
```

### View Browser Console
```
Press F12 in browser
Go to Console tab
Look for errors (red text)
```

### Check Network Requests
```
Press F12 in browser
Go to Network tab
Click on API request
Check Request/Response data
```

### Common Errors

**Error:** `ModuleNotFoundError: No module named 'flask'`
**Fix:** `pip install flask`

**Error:** `pymongo.errors.ServerSelectionTimeoutError`
**Fix:** Start MongoDB: `net start MongoDB`

**Error:** `CORS policy blocked`
**Fix:** Add `from flask_cors import CORS; CORS(app)` to app.py

**Error:** `Cannot read property of undefined`
**Fix:** Check if data exists before accessing: `if (data && data.balance) { ... }`

---

## 📊 Chart.js Quick Reference

### Line Chart (Balance Trend)
```javascript
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Balance',
            data: [5000, 5500, 6000, 5800, 6200],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});
```

### Pie Chart (Transaction Types)
```javascript
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Deposits', 'Withdrawals', 'Transfers'],
        datasets: [{
            data: [45, 30, 25],
            backgroundColor: [
                '#10b981',  // Green
                '#ef4444',  // Red
                '#3b82f6'   // Blue
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});
```

---

## 🎯 Testing Checklist

### Manual Testing
- [ ] Register with valid data → Success
- [ ] Register with existing email → Error
- [ ] Login with correct credentials → Success
- [ ] Login with wrong password → Error
- [ ] Deposit positive amount → Balance increases
- [ ] Withdraw with sufficient balance → Success
- [ ] Withdraw with insufficient balance → Error
- [ ] Transfer to valid account → Success
- [ ] Transfer to invalid account → Error
- [ ] View transaction history → Shows all transactions

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

### Responsive Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🎤 DEMO TIPS

### Before Demo
1. Clear browser cache
2. Close all unnecessary tabs
3. Have fresh database with demo data
4. Test complete flow once
5. Have backup plan

### During Demo
1. Speak clearly and confidently
2. Explain what you're doing
3. Don't rush
4. If error occurs, stay calm
5. Have Plan B ready

### Demo Data
```javascript
// Demo User
Email: demo@bank.com
Password: Demo@123
Account: 1001234567890
Balance: ₹10,000

// For transfers, create second account
Email: demo2@bank.com
Password: Demo@123
Account: 1001234567891
Balance: ₹5,000
```

---

## 📞 QUICK HELP

### VS Code Extensions
- Live Server (for frontend)
- Python (for Python support)
- MongoDB for VS Code (optional)

### Useful Websites
- Bootstrap Docs: https://getbootstrap.com/docs/5.3
- Chart.js Docs: https://www.chartjs.org/docs/latest
- Font Awesome Icons: https://fontawesome.com/icons
- Google Fonts: https://fonts.google.com
- Color Picker: https://coolors.co

### If Stuck
1. Check console errors (F12)
2. Check Network tab for API errors
3. Check MongoDB is running: `mongosh`
4. Check Flask is running: Visit localhost:5000
5. Read error messages carefully
6. Google the error message
7. Ask your partner for help
8. Take a 5-minute break and come back

---

## 💡 PRO TIPS

1. **Save Often:** Ctrl+S after every change
2. **Test Often:** Test after adding each feature
3. **Commit Often:** Git commit after each working feature
4. **Comment Code:** Add comments as you write
5. **Use Console.log:** Debug with console.log() liberally
6. **Keep It Simple:** Don't overcomplicate
7. **Focus on MVP:** Get it working first, pretty second
8. **Ask Questions:** No question is stupid
9. **Take Breaks:** Rest your eyes every hour
10. **Stay Positive:** You've got this! 💪

---

## ⏰ TIME ALERTS

### End of Day 1 (7 PM):
✅ All backend APIs should work
✅ Test with Postman or browser
✅ Ready for frontend

### End of Day 2 (9 PM):
✅ All pages created and styled
✅ Everything connected to backend
✅ Can complete full user flow
✅ Ready for polish

### End of Day 3 (8 PM):
✅ No bugs
✅ UI looks professional
✅ Screenshots taken
✅ Demo practiced
✅ Ready for presentation

---

**BOOKMARK THIS PAGE!** You'll reference it constantly during development.

**Good luck! You're going to build something amazing! 🚀**
