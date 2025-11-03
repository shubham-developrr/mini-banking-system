/**
 * Dashboard JavaScript
 * Handles dashboard data loading, charts, and account creation
 */

// API_BASE_URL is defined in auth.js

// ==================== LOAD DASHBOARD DATA ====================

/**
 * Load account information
 */
async function loadAccountInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/account/info`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Check if user has a banking account
            if (!data.has_account || !data.account) {
                // No account exists - show create account modal
                showCreateAccountModal();
                return null;
            }
            
            const account = data.account;
            
            // Update account number
            const accountNumberEl = document.getElementById('accountNumber');
            if (accountNumberEl) {
                accountNumberEl.textContent = account.account_number;
            }
            
            // Update balance
            const balanceEl = document.getElementById('accountBalance');
            if (balanceEl) {
                balanceEl.textContent = account.balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            
            return account;
        } else {
            console.error('Failed to load account info');
            return null;
        }
    } catch (error) {
        console.error('Error loading account info:', error);
        return null;
    }
}

/**
 * Load statistics for dashboard
 */
async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            const stats = data.stats;
            
            // Update deposits
            const depositsEl = document.getElementById('totalDeposits');
            if (depositsEl) {
                depositsEl.textContent = stats.total_deposits.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            
            // Update withdrawals
            const withdrawalsEl = document.getElementById('totalWithdrawals');
            if (withdrawalsEl) {
                withdrawalsEl.textContent = stats.total_withdrawals.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            
            // Create transaction chart
            createTransactionChart(stats);
            
            return stats;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

/**
 * Load recent transactions
 */
async function loadRecentTransactions() {
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/history?limit=10`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            displayRecentTransactions(data.transactions);
        } else {
            document.getElementById('recentTransactions').innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4 text-muted">
                        <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                        No transactions yet
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Error loading transactions:', error);
        document.getElementById('recentTransactions').innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-danger">
                    Failed to load transactions
                </td>
            </tr>
        `;
    }
}

/**
 * Display recent transactions in table
 */
function displayRecentTransactions(transactions) {
    const tbody = document.getElementById('recentTransactions');
    
    if (!tbody) return;
    
    if (transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">
                    <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                    No transactions yet
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = transactions.map(txn => {
        const date = new Date(txn.timestamp);
        const formattedDate = date.toLocaleDateString('en-IN');
        const formattedTime = date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let typeLabel = '';
        let typeClass = '';
        let amountPrefix = '';
        
        switch(txn.type) {
            case 'deposit':
                typeLabel = '<span class="badge bg-success">Deposit</span>';
                typeClass = 'text-success';
                amountPrefix = '+';
                break;
            case 'withdraw':
                typeLabel = '<span class="badge bg-warning">Withdraw</span>';
                typeClass = 'text-danger';
                amountPrefix = '-';
                break;
            case 'transfer_out':
                typeLabel = '<span class="badge bg-primary">Transfer Out</span>';
                typeClass = 'text-danger';
                amountPrefix = '-';
                break;
            case 'transfer_in':
                typeLabel = '<span class="badge bg-info">Transfer In</span>';
                typeClass = 'text-success';
                amountPrefix = '+';
                break;
        }
        
        return `
            <tr>
                <td>
                    <div>${formattedDate}</div>
                    <small class="text-muted">${formattedTime}</small>
                </td>
                <td>${typeLabel}</td>
                <td>${txn.description}</td>
                <td class="${typeClass} fw-bold">
                    ${amountPrefix}₹${txn.amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </td>
                <td>₹${txn.balance_after.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><code class="small">${txn.reference}</code></td>
            </tr>
        `;
    }).join('');
}

// ==================== CREATE TRANSACTION CHART ====================

/**
 * Create Chart.js transaction overview chart
 */
function createTransactionChart(stats) {
    const canvas = document.getElementById('transactionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Deposits', 'Withdrawals', 'Transfers Out', 'Transfers In'],
            datasets: [{
                data: [
                    stats.total_deposits,
                    stats.total_withdrawals,
                    stats.total_transfers_out,
                    stats.total_transfers_in
                ],
                backgroundColor: [
                    'rgba(25, 135, 84, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(13, 110, 253, 0.8)',
                    'rgba(13, 202, 240, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '₹' + context.parsed.toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ==================== CREATE ACCOUNT MODAL ====================

/**
 * Show create account modal
 */
function showCreateAccountModal() {
    const modalElement = document.getElementById('createAccountModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

/**
 * Create bank account
 */
async function createAccount(accountType = 'savings') {
    try {
        const response = await fetch(`${API_BASE_URL}/account/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                account_type: accountType
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Close modal
            const modalElement = document.getElementById('createAccountModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
            }
            
            // Reload page to show account data
            window.location.reload();
        } else {
            alert(data.error || 'Failed to create account');
        }
    } catch (error) {
        console.error('Error creating account:', error);
        alert('Network error. Please try again.');
    }
}

// ==================== INITIALIZE DASHBOARD ====================

/**
 * Initialize dashboard on page load
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Check authentication
    const authData = await checkAuth();
    
    if (!authData) return;
    
    // Update user name in navigation
    const navUserName = document.getElementById('navUserName');
    if (navUserName && authData.user && authData.user.full_name) {
        navUserName.textContent = authData.user.full_name.split(' ')[0];
    } else if (navUserName && authData.user && authData.user.name) {
        navUserName.textContent = authData.user.name.split(' ')[0];
    }
    
    // Update welcome message
    const userName = document.getElementById('userName');
    if (userName && authData.user && authData.user.full_name) {
        userName.textContent = authData.user.full_name.split(' ')[0];
    } else if (userName && authData.user && authData.user.name) {
        userName.textContent = authData.user.name.split(' ')[0];
    }
    
    // Load account info
    const account = await loadAccountInfo();
    
    if (account) {
        // Load statistics and transactions if account exists
        await loadStatistics();
        await loadRecentTransactions();
    }
    
    // Create account form handler
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const accountType = document.getElementById('accountType').value;
            await createAccount(accountType);
        });
    }
});
