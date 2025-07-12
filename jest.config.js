module.exports = {
testEnvironment: 'node',
setupFilesAfterEnv: ['./tests/setup.js'],
testTimeout: 30000,
verbose: true,
// Force tests to run sequentially to avoid connection conflicts
maxWorkers: 1
};