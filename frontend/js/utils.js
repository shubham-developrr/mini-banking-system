/**
 * UX UTILITIES
 * Toast notifications, Loading states, Haptic feedback, etc.
 */

/* ========================================
   TOAST NOTIFICATIONS
   ======================================== */
class ToastManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <div class="d-flex align-center gap-md">
                <div style="font-size: 1.25rem;">${icon}</div>
                <div style="flex: 1;">${message}</div>
            </div>
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => {
            toast.style.animation = 'toast-slide-out 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(type === 'error' ? [10, 50, 10] : 10);
        }
    }

    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle" style="color: var(--success);"></i>',
            error: '<i class="fas fa-exclamation-circle" style="color: var(--error);"></i>',
            warning: '<i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i>',
            info: '<i class="fas fa-info-circle" style="color: var(--info);"></i>'
        };
        return icons[type] || icons.info;
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// Add slide-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes toast-slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const toast = new ToastManager();
window.toast = toast;

/* ========================================
   LOADING STATES
   ======================================== */
class LoadingManager {
    constructor() {
        this.overlay = null;
    }

    show(message = 'Loading...') {
        this.hide(); // Remove any existing loader
        
        this.overlay = document.createElement('div');
        this.overlay.className = 'loading-overlay';
        this.overlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <div style="margin-top: var(--space-lg); color: var(--text-primary);">
                    ${message}
                </div>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';
    }

    hide() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            document.body.style.overflow = '';
        }
    }
}

// Add loading overlay styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--surface-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
    }
    
    .loading-content {
        text-align: center;
        padding: var(--space-2xl);
        background-color: var(--surface-primary);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-2xl);
    }
`;
document.head.appendChild(loadingStyle);

const loading = new LoadingManager();
window.loading = loading;

/* ========================================
   HAPTIC FEEDBACK
   ======================================== */
const haptic = {
    light() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    },
    
    medium() {
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
    },
    
    heavy() {
        if ('vibrate' in navigator) {
            navigator.vibrate([20, 10, 20]);
        }
    },
    
    success() {
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10]);
        }
    },
    
    error() {
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 100, 50]);
        }
    }
};

window.haptic = haptic;

/* ========================================
   FORM VALIDATION HELPERS
   ======================================== */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('.form-control[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

function clearValidation(formElement) {
    const inputs = formElement.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

window.validateForm = validateForm;
window.clearValidation = clearValidation;

/* ========================================
   NUMBER FORMATTING (INDIAN RUPEES)
   ======================================== */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount).replace('₹', 'Rs. ');
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

window.formatCurrency = formatCurrency;
window.formatNumber = formatNumber;

/* ========================================
   SMOOTH SCROLL TO TOP
   ======================================== */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.scrollToTop = scrollToTop;

/* ========================================
   DEBOUNCE UTILITY
   ======================================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.debounce = debounce;

/* ========================================
   COPY TO CLIPBOARD
   ======================================== */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
        haptic.light();
        return true;
    } catch (err) {
        toast.error('Failed to copy');
        return false;
    }
}

window.copyToClipboard = copyToClipboard;

/* ========================================
   DETECT MOBILE DEVICE
   ======================================== */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

window.isMobile = isMobile;
window.isIOS = isIOS;
window.isAndroid = isAndroid;

/* ========================================
   PULL TO REFRESH (MOBILE)
   ======================================== */
class PullToRefresh {
    constructor(element, onRefresh) {
        this.element = element;
        this.onRefresh = onRefresh;
        this.startY = 0;
        this.currentY = 0;
        this.pulling = false;
        this.threshold = 80;
        
        if (isMobile) {
            this.init();
        }
    }

    init() {
        this.element.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                this.startY = e.touches[0].pageY;
                this.pulling = true;
            }
        });

        this.element.addEventListener('touchmove', (e) => {
            if (this.pulling) {
                this.currentY = e.touches[0].pageY;
                const distance = this.currentY - this.startY;
                
                if (distance > 0 && distance < this.threshold * 2) {
                    e.preventDefault();
                    this.element.style.transform = `translateY(${distance / 3}px)`;
                }
            }
        });

        this.element.addEventListener('touchend', () => {
            if (this.pulling) {
                const distance = this.currentY - this.startY;
                
                this.element.style.transform = '';
                this.pulling = false;
                
                if (distance > this.threshold) {
                    haptic.medium();
                    this.onRefresh();
                }
            }
        });
    }
}

window.PullToRefresh = PullToRefresh;

/* ========================================
   NETWORK STATUS INDICATOR
   ======================================== */
function initNetworkStatus() {
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            toast.warning('You are offline', 5000);
        } else {
            toast.success('Back online!', 2000);
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetworkStatus);
} else {
    initNetworkStatus();
}

/* ========================================
   AUTO-FOCUS FIRST INPUT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const firstInput = document.querySelector('.form-control:not([disabled])');
    if (firstInput && !isMobile) {
        // Don't auto-focus on mobile to prevent keyboard popup
        setTimeout(() => firstInput.focus(), 100);
    }
});

/* ========================================
   PREVENT DOUBLE SUBMIT
   ======================================== */
document.addEventListener('submit', (e) => {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (submitBtn && !submitBtn.disabled) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></span>';
        
        // Re-enable after 3 seconds as fallback
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit';
        }, 3000);
    }
});

console.log('✨ UX Utilities loaded successfully');
console.log('📱 Mobile device:', isMobile);
console.log('🎨 Theme:', themeManager.getTheme());
