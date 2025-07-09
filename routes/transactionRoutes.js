const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { makeTransaction } = require('../controllers/transactionController');

router.post('/', protect, makeTransaction);

module.exports = router;