async function fetchDashboard() {
    try {
        const response = await fetch('/api/dashboard', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Raw dashboard data:', data); // Debug log

        // Check if balance exists and is a number
        if (typeof data.balance !== 'number') {
            console.error('Balance is not a number:', data.balance);
        }

        const balance = data.balance ?? 40000; // Use nullish coalescing
        
        document.getElementById('userInfo').innerHTML = `
            <h2>Welcome ${data.username}</h2>
            <p>Balance: $${balance.toFixed(2)}</p>
            <p>Total Transactions: ${data.totalTransactions || 0}</p>
        `;
    } catch (err) {
        console.error('Fetch Error:', err);
        document.getElementById('userInfo').innerHTML = `<p class="error">Error loading dashboard data</p>`;
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

fetchDashboard();