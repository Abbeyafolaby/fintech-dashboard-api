const Transaction = require('../models/Transactions');
const User = require('../models/User');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
try {
// Get all transactions for the logged-in user
const transactions = await Transaction.find({ user: req.user.id });

// Calculate balance
const balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'credit' 
    ? total + transaction.amount 
    : total - transaction.amount;
}, 0);

res.status(200).json({
    success: true,
    username: req.user.username,
    role: req.user.role,
    balance,
    totalTransactions: transactions.length,
    transactions // Optional: include transaction details
});
} catch (error) {
res.status(500).json({
    success: false,
    error: 'Server Error'
});
}
};

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
try {
const transactions = await Transaction.find({ user: req.user._id })
    .sort({ createdAt: -1 }) // Newest first
    .select('-__v'); // Exclude version key

res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
});
} catch (error) {
res.status(500).json({
    success: false,
    error: 'Server Error'
});
}
};