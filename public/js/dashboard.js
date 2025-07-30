// Check if user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

async function fetchDashboard() {
    try {
        const response = await fetch('https://fintech-dashboard-api-production.up.railway.app/api/dashboard', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Dashboard Data:', data);

        // Check if balance exists and is a number
        if (typeof data.balance !== 'number') {
            console.error('Balance is not a number:', data.balance);
        }

        const balance = data.balance ?? 40000; // Use nullish coalescing
        
        // Handle profile image - ensure the path starts with /
        const profileImageHtml = data.profileImage 
            ? `<img src="${data.profileImage.startsWith('/') ? data.profileImage : '/' + data.profileImage}" 
                alt="Profile" 
                class="profile-image"
                onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\'profile-image-placeholder\'>👤</div>'">` 
            : `<div class="profile-image-placeholder">👤</div>`;
        
        document.getElementById('profileImage').innerHTML = profileImageHtml;
        
        document.getElementById('userInfo').innerHTML = `
            <h2>Welcome ${data.username}</h2>
            <p>Balance: $${balance.toFixed(2)}</p>
            <p>Total Transactions: ${data.totalTransactions || 0}</p>
        `;
    } catch (err) {
        console.error('Fetch Error:', err);
        document.getElementById('userInfo').innerHTML = `<p class="error">Error loading dashboard data</p>`;
        document.getElementById('profileImage').innerHTML = `<div class="profile-image-placeholder">👤</div>`;
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

fetchDashboard();