require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoute');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// XSS protection
app.use(xss());

// Helmet for secure HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//  Enable CORS
app.use(cors());



app.get('/', (req, res) => {
  res.send('Fintech Dashboard API is running...');
});

app.use('/api/auth', authRoutes);

// Test routes
app.use('/api/test', testRoutes);

// Connect to database
connectDB();

module.exports = app;