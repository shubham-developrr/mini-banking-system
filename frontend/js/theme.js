/**
 * THEME MANAGER
 * Handles dark mode toggle with persistence
 */

class ThemeManager {
    constructor() {
        this.theme = 'light';
        this.init();
    }

    init() {
        // Prevent transition on load
        document.body.classList.add('preload');
        
        // Load saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme();
        
        // Remove preload class after theme is applied
        requestAnimationFrame(() => {
            document.body.classList.remove('preload');
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        
        // Update toggle button if it exists
        this.updateToggleButton();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: this.theme } }));
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        
        // Haptic feedback on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('.theme-toggle-icon');
            if (icon) {
                icon.innerHTML = this.theme === 'dark' 
                    ? '<i class="fas fa-moon"></i>' 
                    : '<i class="fas fa-sun"></i>';
            }
        }
    }

    getTheme() {
        return this.theme;
    }

    isDark() {
        return this.theme === 'dark';
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Expose globally for easy access
window.themeManager = themeManager;

// Auto-setup toggle button when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => themeManager.toggle());
    }
});
