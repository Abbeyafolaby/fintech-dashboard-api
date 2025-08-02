const mongoose = require('mongoose');

// Increase timeout for CI/CD environments
jest.setTimeout(30000);

// Handle MongoDB memory server warnings
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

// Set test environment variables before any modules are loaded
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';

// Mock console.log in test environment to reduce noise
if (process.env.NODE_ENV === 'test') {
const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
if (!args[0]?.includes('MongoDB Connected') && !args[0]?.includes('Server running')) {
    originalLog(...args);
}
};

console.error = (...args) => {
if (!args[0]?.includes('Database connection error')) {
    originalError(...args);
}
};
}

// Global test setup
beforeAll(async () => {
// Ensure we're in test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
});

// Global cleanup
afterAll(async () => {
// Close any remaining connections
if (mongoose.connection.readyState !== 0) {
await mongoose.connection.close();
}
});