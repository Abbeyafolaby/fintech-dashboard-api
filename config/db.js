const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If already connected to the in-memory DB, skip
    if (mongoose.connection.readyState === 1 && 
        mongoose.connection.host.includes('127.0.0.1')) {
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fintech-dashboard');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;