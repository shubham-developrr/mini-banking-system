/**
 * Authentication JavaScript
 * Handles login, register, logout, and session management
 */

const API_BASE_URL = '/api';

// ==================== HELPER FUNCTIONS ====================

/**
 * Show alert message
 */
function showAlert(elementId, message, type = 'success') {
    const alertElement = document.getElementById(elementId);
    if (!alertElement) return;
    
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    alertElement.classList.remove('d-none');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 5000);
}

/**
 * Set button loading state
 */
function setButtonLoading(buttonId, isLoading, originalText = 'Submit') {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Processing...
        `;
    } else {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

// ==================== REGISTRATION ====================

/**
 * Register new user
 */
async function register() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showAlert('registerAlert', 'Passwords do not match!', 'danger');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        showAlert('registerAlert', 'Password must be at least 6 characters long!', 'danger');
        return;
    }
    
    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
        showAlert('registerAlert', 'Phone number must be exactly 10 digits!', 'danger');
        return;
    }
    
    setButtonLoading('registerBtn', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                phone: phone,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showAlert('registerAlert', data.message, 'success');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showAlert('registerAlert', data.error || 'Registration failed. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('registerAlert', 'Network error. Please check your connection and try again.', 'danger');
    } finally {
        setButtonLoading('registerBtn', false, '<i class="fas fa-user-plus me-2"></i>Create Account');
    }
}

// ==================== LOGIN ====================

/**
 * Login user
 */
async function login() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showAlert('loginAlert', 'Please enter both email and password!', 'danger');
        return;
    }
    
    setButtonLoading('loginBtn', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Important for session cookies
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showAlert('loginAlert', 'Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showAlert('loginAlert', data.error || 'Login failed. Please check your credentials.', 'danger');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('loginAlert', 'Network error. Please check your connection and try again.', 'danger');
    } finally {
        setButtonLoading('loginBtn', false, '<i class="fas fa-sign-in-alt me-2"></i>Login');
    }
}

// ==================== LOGOUT ====================

/**
 * Logout user
 */
async function logout() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Network error. Please try again.');
    }
}

// ==================== SESSION CHECK ====================

/**
 * Check if user is authenticated
 */
async function checkAuth() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.logged_in) {  // Fixed: check logged_in instead of authenticated
            return data;
        } else {
            // Redirect to login if on a protected page
            if (window.location.pathname.includes('dashboard') || 
                window.location.pathname.includes('deposit') ||
                window.location.pathname.includes('withdraw') ||
                window.location.pathname.includes('transfer') ||
                window.location.pathname.includes('history')) {
                window.location.href = 'login.html';
            }
            return null;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return null;
    }
}

// ==================== EVENT LISTENERS ====================

// Add logout event listener if logout button exists
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
});
