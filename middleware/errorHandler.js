const errorHandler = (err, req, res, next) => {
// Set default status code if not set
err.statusCode = err.statusCode || 500;

// Handle different error types
const response = {
success: false,
error: err.message || 'Server Error'
};

// Mongoose validation error
if (err.name === 'ValidationError') {
response.error = Object.values(err.errors).map(val => val.message);
err.statusCode = 400;
}

// JWT errors
if (err.name === 'JsonWebTokenError') {
response.error = 'Invalid token';
err.statusCode = 401;
}

console.error(err.stack);
res.status(err.statusCode).json(response);
};

module.exports = errorHandler;