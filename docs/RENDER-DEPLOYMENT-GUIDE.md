# 🚀 Render Deployment Guide

## Complete Step-by-Step Guide to Deploy Your Banking System on Render

---

## ✅ Prerequisites

Before starting, make sure you have:

- [x] Code pushed to GitHub: `shubham-developrr/mini-banking-system` ✓
- [x] MongoDB Atlas account with connection string
- [ ] Render account (we'll create this)

---

## 📋 Deployment Steps

### **Step 1: Create Render Account**

1. Go to **[https://render.com](https://render.com)**
2. Click **"Get Started"** (top right)
3. Choose **"Sign up with GitHub"** 
   - This is the easiest method!
   - Authorize Render to access your GitHub repositories
4. Complete your profile (optional)

---

### **Step 2: Create New Web Service**

1. Once logged in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. You'll see a list of your GitHub repositories
4. Find **`mini-banking-system`** and click **"Connect"**
   - If you don't see it, click "Configure account" to grant access

---

### **Step 3: Configure Web Service Settings**

Fill in the following configuration:

#### **Basic Settings:**

| Setting | Value | Notes |
|---------|-------|-------|
| **Name** | `mini-banking-system` | Your app's URL will be based on this |
| **Region** | `Singapore` or `Oregon` | Choose closest to your location |
| **Branch** | `main` | The GitHub branch to deploy from |
| **Root Directory** | `backend` | ⚠️ **IMPORTANT!** Point to backend folder |

#### **Build Settings:**

| Setting | Value |
|---------|-------|
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python app.py` |

#### **Instance Type:**

- Select **"Free"** (You get 750 free hours/month)
- Free tier specs:
  - 512 MB RAM
  - Shared CPU
  - Apps sleep after 15 min of inactivity
  - Perfect for demos and learning!

---

### **Step 4: Add Environment Variables** ⚠️

This is the **MOST IMPORTANT** step! Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these **THREE** variables:

#### **1. MONGODB_URI**

```
Key: MONGODB_URI
Value: mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Where to get this:**
- From your local `.env` file
- Or from MongoDB Atlas: 
  - Database → Connect → Connect your application
  - Copy the connection string
  - Replace `<username>` and `<password>` with your actual credentials

#### **2. DATABASE_NAME**

```
Key: DATABASE_NAME
Value: banking_system
```

#### **3. SECRET_KEY**

```
Key: SECRET_KEY
Value: your-super-secret-random-key-make-it-very-long-and-secure-123456
```

**Generate a secure secret key** (PowerShell):
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 50 | ForEach-Object {[char]$_})
```

Or use any random string (minimum 32 characters)

---

### **Step 5: Deploy!**

1. Click **"Create Web Service"** (bottom of page)
2. Render will start building your application
3. You'll see **Build Logs** in real-time

**What to expect:**

```
==> Cloning from https://github.com/shubham-developrr/mini-banking-system...
==> Checking out commit 5f6d539...
==> Entering directory 'backend'
==> Installing dependencies...
Collecting Flask==2.3.3
Collecting pymongo==4.5.0
...
Successfully installed Flask-2.3.3 pymongo-4.5.0 ...
==> Build successful!
==> Starting service...

[OK] MongoDB Atlas connected successfully!
[OK] Database: banking_system
[OK] Server starting on port 10000
==> Your service is live 🎉
```

**Build time:** 2-3 minutes

---

### **Step 6: Access Your Live Application**

Once deployed, Render gives you a **public URL**:

```
https://mini-banking-system.onrender.com
```

Or it might be:
```
https://mini-banking-system-xxxx.onrender.com
```

🎉 **Click the URL and your banking system is LIVE!**

---

## 🔍 Verification Checklist

After deployment, test these:

- [ ] Landing page loads correctly
- [ ] Register new user works
- [ ] Login works
- [ ] Dashboard loads with account info
- [ ] Deposit transaction works
- [ ] Withdraw transaction works
- [ ] Transaction history displays
- [ ] No console errors

---

## 🐛 Common Issues & Solutions

### **Issue 1: Application Error on Start**

**Symptoms:** Page shows "Application failed to respond"

**Solutions:**
1. Check **Logs** tab in Render dashboard
2. Verify environment variables are set correctly
3. Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
4. Check MongoDB credentials are correct

### **Issue 2: MongoDB Connection Failed**

**Error in logs:** `ServerSelectionTimeoutError: cluster0.xxxxx.mongodb.net`

**Solutions:**
1. **Whitelist all IPs in MongoDB Atlas:**
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   
2. **Verify connection string:**
   - Should start with `mongodb+srv://`
   - No extra spaces
   - Username and password are correct
   - No special characters need encoding (use `%40` for @, `%23` for #)

### **Issue 3: Build Failed**

**Error:** `Failed to install requirements`

**Solutions:**
1. Check `requirements.txt` exists in `backend/` folder
2. Verify Python version compatibility
3. Check Render logs for specific package errors

### **Issue 4: Page Loads but Features Don't Work**

**Symptoms:** Can see landing page but can't register/login

**Solutions:**
1. Open browser DevTools (F12) → Console tab
2. Check for JavaScript errors
3. Verify API endpoints are accessible:
   - Try: `https://your-app.onrender.com/api/auth/check`
4. Check CORS settings in `app.py`

---

## 📊 Monitoring Your Application

### **View Logs:**
1. Go to your service in Render dashboard
2. Click **"Logs"** tab
3. See real-time server logs

### **View Metrics:**
1. Click **"Metrics"** tab
2. See:
   - Memory usage
   - CPU usage
   - Request count
   - Response times

### **Auto-Deploy on Push:**

Render automatically redeploys when you push to GitHub!

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Render automatically detects and redeploys!
```

---

## 🎯 Post-Deployment Configuration

### **Custom Domain (Optional)**

1. Go to **Settings** tab
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `bankingapp.com`)
5. Update DNS records as instructed
6. **Free SSL certificate** included!

### **Environment Variables Updates**

To update environment variables:
1. Go to **Environment** tab
2. Edit values
3. Click **"Save Changes"**
4. Service will automatically restart

---

## 💰 Render Free Tier Limits

What you get for FREE:

✅ **750 hours/month** per service (enough for 1 app running 24/7)  
✅ **512 MB RAM**  
✅ **Shared CPU**  
✅ **Automatic HTTPS**  
✅ **Auto-deploy from GitHub**  
✅ **Custom domains**  

Limitations:

⚠️ **Apps sleep after 15 minutes** of inactivity  
⚠️ **First request after sleep takes ~30 seconds** to wake up  
⚠️ **Limited concurrent connections**  

**Perfect for:**
- College projects ✓
- Demos ✓
- Portfolio projects ✓
- Learning & testing ✓

---

## 🚀 Upgrade Options

Need more power?

| Plan | Price | Specs |
|------|-------|-------|
| **Free** | $0/month | 512 MB RAM, Shared CPU |
| **Starter** | $7/month | 1 GB RAM, 0.5 CPU, No sleep |
| **Standard** | $25/month | 2 GB RAM, 1 CPU, Better performance |

---

## 📝 Deployment Checklist

Before deploying, verify:

- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas cluster is running
- [ ] Database user created in MongoDB Atlas
- [ ] IP whitelist set to `0.0.0.0/0` in MongoDB Atlas
- [ ] `.env` values ready to copy
- [ ] `backend/requirements.txt` exists
- [ ] App works locally (`python app.py`)

During deployment:

- [ ] Render account created
- [ ] Web Service connected to GitHub repo
- [ ] Root directory set to `backend`
- [ ] All 3 environment variables added
- [ ] Free instance type selected
- [ ] Build successful (check logs)

After deployment:

- [ ] URL accessible
- [ ] Landing page loads
- [ ] Can register new user
- [ ] Can login
- [ ] Transactions work
- [ ] No errors in browser console

---

## 🎓 Learning Resources

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Python on Render:** https://render.com/docs/deploy-flask

---

## 🆘 Need Help?

1. **Check Render Logs** (most issues show up here)
2. **Review this guide** step-by-step
3. **MongoDB Atlas Network Access** (most common issue!)
4. **Render Community Forums**
5. **Contact your instructor/team**

---

## 🎉 Success!

Once deployed, you can share your live app:

```
🌐 Live Demo: https://mini-banking-system.onrender.com
📱 Access from any device with internet
🌍 Share with anyone, anywhere
```

**Congratulations! Your banking system is now live on the internet!** 🚀

---

**Last Updated:** November 3, 2025  
**Repository:** https://github.com/shubham-developrr/mini-banking-system
