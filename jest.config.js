module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js', './jest.setup.js'],
  testTimeout: 30000,
  verbose: true,
  // Force tests to run sequentially to avoid connection conflicts
  maxWorkers: 1,
  
  // Coverage configuration
  collectCoverage: false,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'middleware/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    '!node_modules/**',
    '!tests/**',
    '!coverage/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js'
  ],
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Handle ES6 modules if needed
  transform: {},
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/uploads/',
    '/public/'
  ]
};