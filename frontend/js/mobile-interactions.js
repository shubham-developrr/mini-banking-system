/**
 * Mobile UI Interactions & Feedback
 * Adds visual feedback, animations, and loading states for mobile UI
 */

// Add loading state to button
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.setAttribute('data-original-html', button.innerHTML);
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        const originalHtml = button.getAttribute('data-original-html');
        if (originalHtml) {
            button.innerHTML = originalHtml;
        }
    }
}

// Show success feedback
function showSuccessFeedback(element) {
    element.classList.add('success-animation');
    setTimeout(() => {
        element.classList.remove('success-animation');
    }, 500);
}

// Add ripple effect to button
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add haptic feedback (vibration) for mobile
function hapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        switch(type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(50);
                break;
            case 'success':
                navigator.vibrate([10, 50, 10]);
                break;
            case 'error':
                navigator.vibrate([50, 30, 50]);
                break;
        }
    }
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `mobile-toast mobile-toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Initialize mobile interactions
function initializeMobileInteractions() {
    // Add ripple effect only to form submit buttons and quick amount buttons (not navigation)
    document.querySelectorAll('.mobile-form-submit, .mobile-quick-amount').forEach(button => {
        button.addEventListener('click', function(e) {
            hapticFeedback('light');
            createRipple(e);
        });
    });
    
    // Add touch feedback to nav items (haptic only, no ripple for navigation)
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item, .quick-action-btn').forEach(item => {
        item.addEventListener('click', function() {
            hapticFeedback('light');
        });
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add pull-to-refresh visual feedback
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
        if (touchStartY < 50 && touchEndY - touchStartY > 100) {
            // Pull to refresh detected
            const isAtTop = window.scrollY === 0;
            if (isAtTop) {
                hapticFeedback('medium');
                // Trigger refresh if on certain pages
                if (typeof loadCurrentBalance === 'function') {
                    loadCurrentBalance();
                }
                if (typeof loadTransactionHistory === 'function') {
                    loadTransactionHistory();
                }
            }
        }
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileInteractions);
} else {
    initializeMobileInteractions();
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.mobileUI = {
        setButtonLoading,
        showSuccessFeedback,
        hapticFeedback,
        showToast,
        refreshBalance
    };
}

/**
 * Refresh balance with animation
 * @param {HTMLElement} btnElement - The button element triggered
 */
async function refreshBalance(btnElement) {
    // Add animation class
    const icon = btnElement.querySelector('i');
    if (icon) {
        icon.classList.add('fa-spin');
    }

    // Disable button to prevent multiple clicks
    btnElement.disabled = true;

    // Haptic feedback
    hapticFeedback('medium');

    try {
        // Minimum spin time of 500ms for UX
        const minSpinTime = new Promise(resolve => setTimeout(resolve, 500));

        const tasks = [minSpinTime];

        // Determine which load function to call
        if (typeof window.loadAccountInfo === 'function') {
            tasks.push(window.loadAccountInfo());
        } else if (typeof window.loadCurrentBalance === 'function') {
            tasks.push(window.loadCurrentBalance());
        }

        // Also refresh transactions if available
        if (typeof window.loadRecentTransactions === 'function') {
            tasks.push(window.loadRecentTransactions());
        }

        await Promise.all(tasks);

        // Show success feedback
        showToast('Balance updated', 'success');
        hapticFeedback('success');

    } catch (error) {
        console.error('Error refreshing balance:', error);
        showToast('Failed to refresh', 'error');
        hapticFeedback('error');
    } finally {
        // Remove animation and enable button
        if (icon) {
            icon.classList.remove('fa-spin');
        }
        btnElement.disabled = false;
    }
}
