const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Global setup
beforeAll(async () => {
  // Close any existing connections
  await mongoose.disconnect();
  
  // Create new in-memory server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
  
  // Override the app's database connection
  process.env.MONGO_URI = mongoUri;
});

// Global teardown
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clean collections between tests
beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});