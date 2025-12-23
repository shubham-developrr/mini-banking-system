/**
 * Dashboard Refresh Logic
 * Handles smooth refreshing of dashboard data without page reload
 */

async function refreshDashboard() {
    const refreshBtn = document.querySelector('.balance-refresh');
    const icon = refreshBtn ? refreshBtn.querySelector('i') : null;

    // Add spin animation
    if (icon) {
        icon.classList.add('fa-spin');
    }

    // Disable button to prevent multiple clicks
    if (refreshBtn) {
        refreshBtn.disabled = true;
    }

    try {
        // Load all data in parallel, ensuring spinner shows for at least 500ms
        // This prevents a "flash" if the data loads too quickly
        await Promise.all([
            loadAccountInfo(),
            loadStatistics(),
            loadRecentTransactions(),
            new Promise(resolve => setTimeout(resolve, 500))
        ]);

    } catch (error) {
        console.error('Error refreshing dashboard:', error);
    } finally {
        // Remove spin animation
        if (icon) {
            icon.classList.remove('fa-spin');
        }

        // Re-enable button
        if (refreshBtn) {
            refreshBtn.disabled = false;
        }
    }
}
