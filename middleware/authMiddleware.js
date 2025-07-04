const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Error handler for async/await
const asyncHandler = require('express-async-handler');

// Protect routes - JWT verification
exports.protect = asyncHandler(async (req, res, next) => {
let token;

if (
req.headers.authorization &&
req.headers.authorization.startsWith('Bearer')
) {
try {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token and attach to request
    req.user = await User.findById(decoded.id).select('-password');

    next();
} catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
}
}

if (!token) {
res.status(401);
throw new Error('Not authorized, no token');
}
});

// Role-based authorization
exports.authorizeRoles = (...roles) => {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
    res.status(403);
    throw new Error(`Not authorized. Required role: ${roles.join(', ')}`);
}
next();
};
};