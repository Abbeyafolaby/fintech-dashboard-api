
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('profile', document.getElementById('profile').files[0]);

    try {
        const response = await fetch('https://fintech-dashboard-api-production.up.railway.app/api/profile/upload-profile', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('message').innerHTML = 'Profile image uploaded successfully!';
            document.getElementById('preview').innerHTML = `<img src="${data.data.profileImage}" style="max-width: 200px;">`;
        } else {
            document.getElementById('message').innerHTML = data.error;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = 'Error uploading image';
    }
});
