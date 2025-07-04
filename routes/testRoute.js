const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
res.json({ 
success: true,
message: 'Welcome Admin!',
user: {
    id: req.user._id,
    role: req.user.role
}
});
});

module.exports = router;