# 🧪 SecureBank - Testing Guide for Demo Day

**Date:** November 4, 2025  
**Repository:** mini-banking-system  
**Server:** http://localhost:5000

---

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   cd "c:\Users\shubham\Desktop\Dev\mini banking system\backend"
   python app.py
   ```

2. **Open browser:**
   ```
   http://localhost:5000
   ```

3. **Test dark mode:**
   - Click the moon/sun icon in the top right
   - Should toggle between light and dark
   - Should persist when you reload

---

## ✅ Testing Checklist

### **1. Homepage (http://localhost:5000)**

**Desktop (1920x1080):**
- [ ] Hero section displays properly
- [ ] Feature cards in 4 columns
- [ ] Dark mode toggle works
- [ ] Navbar is sticky
- [ ] "Get Started" button → register.html
- [ ] "Sign In" button → login.html

**Mobile (375x667 - iPhone SE):**
- [ ] Hero section is vertical (not horizontal)
- [ ] Feature cards stack vertically
- [ ] Buttons are full-width
- [ ] Text is readable
- [ ] Mobile menu works (hamburger icon)
- [ ] Bottom spacing adequate

**Dark Mode:**
- [ ] Background is dark (#0f172a)
- [ ] Text is light
- [ ] Buttons have proper contrast
- [ ] No white flashes

---

### **2. Register Page**

**Form Fields:**
- [ ] Full Name - accepts text
- [ ] Email - shows email keyboard on mobile
- [ ] Phone - shows numeric keyboard, formats to 10 digits
- [ ] Password - has show/hide toggle
- [ ] Confirm Password - has show/hide toggle, validates match
- [ ] Terms checkbox - required

**Validation:**
- [ ] Empty fields show errors
- [ ] Email format validated
- [ ] Phone must be 10 digits
- [ ] Password minimum 6 characters
- [ ] Passwords must match
- [ ] Terms must be checked

**Submit:**
- [ ] Click "Create Account"
- [ ] Shows loading spinner
- [ ] Success → redirects to dashboard
- [ ] Error → shows error message

---

### **3. Login Page**

**Form Fields:**
- [ ] Email - accepts email
- [ ] Password - has show/hide toggle
- [ ] Remember me checkbox

**Demo Credentials:**
- [ ] Click info box to auto-fill
- [ ] Email: demo@securebank.com
- [ ] Password: demo123

**Submit:**
- [ ] Click "Login to Account"
- [ ] Shows loading spinner
- [ ] Success → redirects to dashboard
- [ ] Error → shows error message

---

### **4. Dashboard**

**Stat Cards:**
- [ ] Account Balance shows correctly
- [ ] Account number displays
- [ ] Total Deposits calculated
- [ ] Total Withdrawals calculated
- [ ] Transaction count accurate

**Quick Actions:**
- [ ] Deposit Money → deposit.html
- [ ] Withdraw Money → withdraw.html
- [ ] Transfer Funds → transfer.html
- [ ] Transaction History → history.html

**Recent Transactions:**
- [ ] Shows last 5 transactions
- [ ] Date/time formatted properly
- [ ] Amount with ₹ symbol
- [ ] Icon matches type (deposit/withdraw/transfer)

**Mobile:**
- [ ] Bottom navigation visible
- [ ] Stat cards stack vertically
- [ ] Quick actions in grid (2 columns)
- [ ] All touchable

---

### **5. Deposit Money**

**Form:**
- [ ] Current balance displayed
- [ ] Amount input shows numeric keyboard on mobile
- [ ] ₹ symbol before input

**Quick Amounts:**
- [ ] ₹500 button works
- [ ] ₹1,000 button works
- [ ] ₹2,000 button works
- [ ] ₹5,000 button works
- [ ] ₹10,000 button works
- [ ] Clicking button fills amount

**Validation:**
- [ ] Minimum ₹1
- [ ] Maximum ₹10,00,000
- [ ] Decimal values accepted (₹100.50)

**Submit:**
- [ ] "Deposit Now" button
- [ ] Shows loading spinner
- [ ] Success → balance updates, redirects to dashboard
- [ ] Shows success toast

---

### **6. Withdraw Money**

**Form:**
- [ ] Available balance displayed
- [ ] Amount input shows numeric keyboard

**Quick Amounts:**
- [ ] All quick amount buttons work
- [ ] Disables buttons > balance
- [ ] Shows "Insufficient balance" toast

**Validation:**
- [ ] Cannot withdraw more than balance
- [ ] Minimum ₹1
- [ ] Shows error if insufficient

**Submit:**
- [ ] "Withdraw Now" button
- [ ] Success → balance decreases
- [ ] Shows success toast

---

### **7. Transfer Money**

**Form:**
- [ ] Your account number displayed
- [ ] Recipient account - 10 digits only
- [ ] Amount input - numeric keyboard

**Validation:**
- [ ] Account number must be 10 digits
- [ ] Cannot transfer to same account
- [ ] Cannot transfer more than balance
- [ ] Confirmation dialog before transfer

**Submit:**
- [ ] Confirm dialog appears
- [ ] "Transfer Now" after confirmation
- [ ] Success → both accounts update
- [ ] Shows success toast

---

### **8. Transaction History**

**Filters:**
- [ ] "All" shows all transactions
- [ ] "Deposits" shows only deposits
- [ ] "Withdrawals" shows only withdrawals
- [ ] "Transfers" shows only transfers

**Transaction List:**
- [ ] Each transaction has icon
- [ ] Type clearly visible
- [ ] Date formatted (e.g., "3 Nov 2025")
- [ ] Time formatted (e.g., "02:30 PM")
- [ ] Amount with + or - sign

**Empty State:**
- [ ] Shows when no transactions
- [ ] "Go to Dashboard" button works

**Mobile:**
- [ ] List view (not table)
- [ ] Each item touchable
- [ ] Filter buttons horizontal scroll if needed

---

## 🎨 Dark Mode Testing

**Toggle Behavior:**
- [ ] Click toggle → immediate switch
- [ ] Smooth transition (300ms)
- [ ] Icon changes (sun ↔ moon)
- [ ] Persists on page reload
- [ ] Works on ALL pages

**Visual Check:**
- [ ] Background color changes
- [ ] Text color changes
- [ ] Buttons adapt
- [ ] Cards have proper elevation
- [ ] No contrast issues
- [ ] Icons visible in both modes

---

## 📱 Mobile Testing (Chrome DevTools)

### **iPhone SE (375x667)**
- [ ] All pages responsive
- [ ] Bottom nav visible
- [ ] Touch targets adequate (44px+)
- [ ] No horizontal scroll
- [ ] Text readable

### **iPhone 12 (390x844)**
- [ ] Layouts adapt
- [ ] Bottom nav positioned correctly
- [ ] All buttons touchable

### **Galaxy S20 (360x800)**
- [ ] Forms fit screen
- [ ] No elements cut off
- [ ] Buttons full-width

### **iPad (768x1024)**
- [ ] Uses tablet layout
- [ ] Bottom nav hidden (desktop nav shows)
- [ ] Cards in grid

---

## 🐛 Common Issues to Check

**Issue 1: Dark mode not persisting**
- Check browser console for localStorage errors
- Verify theme.js loaded

**Issue 2: Mobile menu not sliding**
- Check mobile.css loaded
- Verify JavaScript for toggle

**Issue 3: Bottom nav overlapping content**
- Check padding-bottom on main content
- Should be ~80px on mobile

**Issue 4: Forms not submitting**
- Check auth.js, transactions.js loaded
- Verify server running (localhost:5000)
- Check browser console for errors

**Issue 5: Colors not changing in dark mode**
- Old style.css might be cached
- Hard refresh (Ctrl+Shift+R)
- Check using theme.css variables

---

## ✨ Features to Highlight in Demo

1. **Mobile-First Design**
   - Show on iPhone SE (375px)
   - Bottom navigation
   - Touch-optimized inputs

2. **Dark Mode**
   - Toggle on any page
   - Persists across session
   - Smooth transitions

3. **Quick Amount Buttons**
   - On deposit/withdraw/transfer
   - Haptic feedback

4. **Form Validation**
   - Real-time password match
   - Phone formatting
   - Helpful error messages

5. **Empty States**
   - Transaction history when empty
   - Clear call-to-action

6. **Loading States**
   - Skeleton loaders
   - Spinner on buttons
   - "Processing..." feedback

7. **Pull-to-Refresh**
   - On dashboard
   - On transaction history
   - Mobile only

8. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - High contrast

---

## 📊 Performance Checks

**Page Load Time:**
- [ ] Homepage < 1 second
- [ ] Dashboard < 2 seconds
- [ ] Forms instant

**Animations:**
- [ ] Smooth 60fps
- [ ] No jank
- [ ] GPU accelerated

**Mobile Performance:**
- [ ] Touch events responsive
- [ ] No lag on scroll
- [ ] Smooth transitions

---

## 🎯 Demo Flow Recommendation

1. **Start with Homepage**
   - Show responsive design
   - Toggle dark mode
   - Click "Get Started"

2. **Registration**
   - Fill form on mobile view
   - Show keyboard optimization
   - Show password toggle
   - Submit

3. **Dashboard**
   - Highlight stat cards
   - Show quick actions
   - Toggle dark mode again

4. **Deposit Money**
   - Use quick amount button
   - Show numeric keyboard
   - Submit and see success

5. **Transaction History**
   - Show filter buttons
   - Demonstrate responsive list
   - Pull to refresh (if mobile)

6. **Dark Mode Tour**
   - Visit each page in dark mode
   - Show consistent theme
   - Highlight contrast

---

## ✅ Final Checks Before Demo

- [ ] Server running (localhost:5000)
- [ ] MongoDB Atlas connected
- [ ] No console errors
- [ ] Dark mode toggle on all pages
- [ ] Mobile view tested (375px)
- [ ] All forms submittable
- [ ] Transaction flow works
- [ ] GitHub up-to-date
- [ ] Documentation complete
- [ ] Ready to present! 🎉

---

**Good luck with your demo! 🚀**
