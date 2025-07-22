require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoute');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

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

// Configure CORS middleware
app.use(cors({
  origin: true, // Allow requests from any origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const { swaggerUi, swaggerSpec } = require('./swagger');


app.get('/', (req, res) => {
  res.send('Fintech Dashboard API is running...');
});

app.use('/api/auth', authRoutes);

// Test routes
app.use('/api/test', testRoutes);

// Dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// transactions routes
app.use('/api', dashboardRoutes);

app.use('/api/transactions', transactionRoutes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Connect to database
connectDB();

module.exports = app;