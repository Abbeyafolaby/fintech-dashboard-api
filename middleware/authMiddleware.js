const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
let token;

if (req.headers.authorization?.startsWith('Bearer')) {
token = req.headers.authorization.split(' ')[1];
}

if (!token) {
const error = new Error('Not authorized, no token');
error.statusCode = 401;
throw error;
}

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
next();
} catch (err) {
const error = new Error('Not authorized, token failed');
error.statusCode = 401;
throw error;
}
});

exports.authorizeRoles = (...roles) => {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
    const error = new Error(`Not authorized. Required role: ${roles.join(', ')}`);
    error.statusCode = 403;
    throw error;
}
next();
};
};