const User = require('../models/User');

exports.uploadProfileImage = async (req, res) => {
try {
if (!req.file) {
    return res.status(400).json({
    success: false,
    error: 'Please upload a file'
    });
}

// Update user profile with image path
const user = await User.findByIdAndUpdate(
    req.user._id,
    {
    profileImage: `/uploads/${req.file.filename}`
    },
    { new: true }
);

res.status(200).json({
    success: true,
    data: {
    profileImage: user.profileImage
    }
});
} catch (error) {
res.status(500).json({
    success: false,
    error: error.message
});
}
};