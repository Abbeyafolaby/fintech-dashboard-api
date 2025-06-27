require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// 1. Helmet for secure HTTP headers
app.use(helmet());

// 2. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// 3. XSS protection
app.use(xss());

// 4. Enable CORS
app.use(cors());

// 5. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Fintech Dashboard API is running...');
});

// Connect to database
connectDB();

module.exports = app;