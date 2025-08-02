const mongoose = require('mongoose');

// Increase timeout for CI/CD environments
jest.setTimeout(30000);

// Handle MongoDB memory server warnings
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

// Mock console.log in test environment to reduce noise
if (process.env.NODE_ENV === 'test') {
  console.log = jest.fn();
  console.error = jest.fn();
}

// Global test setup
beforeAll(async () => {
  // Ensure we're in test environment
  process.env.NODE_ENV = 'test';
});

// Global cleanup
afterAll(async () => {
  // Close any remaining connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});