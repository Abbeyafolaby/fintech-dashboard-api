const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
try {
const { username, password, role } = req.body;

const user = await User.create({
    username,
    password,
    role: role || 'user', // Default to 'user' if no role is provided
});

const token = generateToken(user);

res.status(201).json({
    success: true,
    token,
});
} catch (err) {
res.status(400).json({
    success: false,
    error: err.message,
});
}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
try {
const { username, password } = req.body;

const user = await User.findOne({ username }).select('+password');

if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
}

const token = generateToken(user);

res.status(200).json({
    success: true,
    message: `Welcome back, ${user.username}!`,
    token,
});
} catch (err) {
res.status(401).json({
    success: false,
    error: err.message,
});
}
};

// Generate JWT token
const generateToken = (user) => {
return jwt.sign(
{ id: user._id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: '30d' }
);
};