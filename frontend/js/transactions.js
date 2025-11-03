/**
 * Transactions JavaScript
 * Handles deposit, withdraw, transfer operations
 */

// API_BASE_URL is defined in auth.js

// ==================== LOAD CURRENT BALANCE ====================

/**
 * Load and display current balance
 */
async function loadCurrentBalance() {
    try {
        const response = await fetch(`${API_BASE_URL}/account/balance`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            const balanceEl = document.getElementById('currentBalance');
            if (balanceEl) {
                balanceEl.textContent = data.balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            return data.balance;
        } else {
            console.error('Failed to load balance');
            return 0;
        }
    } catch (error) {
        console.error('Error loading balance:', error);
        return 0;
    }
}

// ==================== DEPOSIT ====================

/**
 * Deposit money into account
 */
async function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value.trim() || 'Cash deposit';
    
    // Validate amount
    if (!amount || amount <= 0) {
        showAlert('depositAlert', 'Please enter a valid amount!', 'danger');
        return;
    }
    
    if (amount > 1000000) {
        showAlert('depositAlert', 'Maximum deposit amount is ₹10,00,000!', 'danger');
        return;
    }
    
    const depositBtn = document.getElementById('depositBtn');
    depositBtn.disabled = true;
    depositBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/deposit`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                amount: amount,
                description: description
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Update modal with transaction details
            document.getElementById('modalAmount').textContent = amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalBalance').textContent = data.new_balance.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalReference').textContent = data.reference;
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            
            // Reset form
            document.getElementById('depositForm').reset();
            
            // Update current balance display
            await loadCurrentBalance();
        } else {
            showAlert('depositAlert', data.error || 'Deposit failed. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Deposit error:', error);
        showAlert('depositAlert', 'Network error. Please check your connection.', 'danger');
    } finally {
        depositBtn.disabled = false;
        depositBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Deposit Money';
    }
}

// ==================== WITHDRAW ====================

/**
 * Withdraw money from account
 */
async function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value.trim() || 'Cash withdrawal';
    
    // Validate amount
    if (!amount || amount <= 0) {
        showAlert('withdrawAlert', 'Please enter a valid amount!', 'danger');
        return;
    }
    
    const withdrawBtn = document.getElementById('withdrawBtn');
    withdrawBtn.disabled = true;
    withdrawBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/withdraw`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                amount: amount,
                description: description
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Update modal with transaction details
            document.getElementById('modalAmount').textContent = amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalBalance').textContent = data.new_balance.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalReference').textContent = data.reference;
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            
            // Reset form
            document.getElementById('withdrawForm').reset();
            
            // Update current balance display
            await loadCurrentBalance();
        } else {
            showAlert('withdrawAlert', data.error || 'Withdrawal failed. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Withdrawal error:', error);
        showAlert('withdrawAlert', 'Network error. Please check your connection.', 'danger');
    } finally {
        withdrawBtn.disabled = false;
        withdrawBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Withdraw Money';
    }
}

// ==================== TRANSFER ====================

/**
 * Transfer money to another account
 */
async function transfer() {
    const toAccount = document.getElementById('toAccount').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value.trim() || 'Fund transfer';
    
    // Validate account number
    if (!toAccount || toAccount.length !== 13 || !/^[0-9]{13}$/.test(toAccount)) {
        showAlert('transferAlert', 'Please enter a valid 13-digit account number!', 'danger');
        return;
    }
    
    // Validate amount
    if (!amount || amount <= 0) {
        showAlert('transferAlert', 'Please enter a valid amount!', 'danger');
        return;
    }
    
    const transferBtn = document.getElementById('transferBtn');
    transferBtn.disabled = true;
    transferBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/transfer`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                to_account: toAccount,
                amount: amount,
                description: description
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Update modal with transaction details
            document.getElementById('modalAmount').textContent = amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalToAccount').textContent = toAccount;
            document.getElementById('modalBalance').textContent = data.new_balance.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('modalReference').textContent = data.reference;
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            
            // Reset form
            document.getElementById('transferForm').reset();
            
            // Update current balance display
            await loadCurrentBalance();
        } else {
            showAlert('transferAlert', data.error || 'Transfer failed. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Transfer error:', error);
        showAlert('transferAlert', 'Network error. Please check your connection.', 'danger');
    } finally {
        transferBtn.disabled = false;
        transferBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Transfer Money';
    }
}

// ==================== TRANSACTION HISTORY ====================

/**
 * Load transaction history
 */
async function loadTransactionHistory() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin me-2"></i>Loading...';
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/history?limit=100`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store transactions globally for filtering
            window.allTransactions = data.transactions;
            
            // Display transactions
            displayTransactions(data.transactions);
            
            // Update summary
            updateTransactionSummary(data.transactions);
            
            // Enable export button
            const exportBtn = document.getElementById('exportBtn');
            if (exportBtn) {
                exportBtn.disabled = false;
            }
            
            // Show pagination info
            const paginationInfo = document.getElementById('paginationInfo');
            if (paginationInfo) {
                paginationInfo.classList.remove('d-none');
                document.getElementById('showingCount').textContent = data.transactions.length;
            }
        } else {
            document.getElementById('transactionTableBody').innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5 text-danger">
                        Failed to load transactions
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Error loading transaction history:', error);
        document.getElementById('transactionTableBody').innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5 text-danger">
                    Network error. Please try again.
                </td>
            </tr>
        `;
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Refresh';
        }
    }
}

/**
 * Update transaction summary cards
 */
function updateTransactionSummary(transactions) {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let currentBalance = 0;
    
    transactions.forEach(txn => {
        if (txn.type === 'deposit' || txn.type === 'transfer_in') {
            totalDeposits += txn.amount;
        } else if (txn.type === 'withdraw' || txn.type === 'transfer_out') {
            totalWithdrawals += txn.amount;
        }
        
        // Get latest balance
        if (transactions.indexOf(txn) === 0) {
            currentBalance = txn.balance_after;
        }
    });
    
    // Update summary cards
    const totalCountEl = document.getElementById('totalCount');
    if (totalCountEl) {
        totalCountEl.textContent = transactions.length;
    }
    
    const totalDepositsEl = document.getElementById('totalDeposits');
    if (totalDepositsEl) {
        totalDepositsEl.textContent = totalDeposits.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    const totalWithdrawalsEl = document.getElementById('totalWithdrawals');
    if (totalWithdrawalsEl) {
        totalWithdrawalsEl.textContent = totalWithdrawals.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    const currentBalanceEl = document.getElementById('currentBalance');
    if (currentBalanceEl) {
        currentBalanceEl.textContent = currentBalance.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

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
