/**
 * SECUREBANK - THEME MANAGEMENT
 * Light/Dark theme switching with localStorage persistence
 */

(function() {
    'use strict';
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle functionality
    function initThemeToggle() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (!toggleBtn) return;
        
        toggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add subtle animation
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    // Device detection
    function isMobileDevice() {
        return window.innerWidth < 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
    
    // Log device type
    console.log('📱 Device type:', isMobileDevice() ? 'Mobile' : 'Desktop');
    console.log('🎨 Theme:', savedTheme);
    
})();
