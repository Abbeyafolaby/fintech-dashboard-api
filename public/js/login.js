document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('fintech-dashboard-api-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = '/dashboard.html';
        } else {
            alert('Login failed');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});