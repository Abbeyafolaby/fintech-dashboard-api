
// Check if user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const transaction = {
        type: document.getElementById('type').value,
        amount: parseFloat(document.getElementById('amount').value),
        description: document.getElementById('description').value
    };

    try {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(transaction)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(`Transaction successful! New balance: $${data.data.newBalance}`, 'success');
            document.getElementById('transactionForm').reset();
        } else {
            showMessage(data.error || 'Transaction failed', 'error');
        }
    } catch (error) {
        showMessage('Error processing transaction', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 5000);
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
