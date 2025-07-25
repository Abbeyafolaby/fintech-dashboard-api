const User = require('../models/User');
const Transaction = require('../models/Transactions');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
    try {
        // Fetch user with all fields including profileImage
        const user = await User.findById(req.user._id);
        
        res.json({
            success: true,
            username: user.username,
            balance: user.balance,
            totalTransactions: user.totalTransactions || 0,
            profileImage: user.profileImage 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
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