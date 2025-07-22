const User = require('../models/User');
const Transaction = require('../models/Transactions');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
    try {
        // Fetch user with balance included
        const user = await User.findById(req.user.id);
        
        // Debug log to check what's being fetched
        console.log('User data from DB:', user);

        // Get total transactions
        const totalTransactions = await Transaction.countDocuments({ user: req.user.id });

        res.json({
            username: user.username,
            balance: user.balance, // Explicitly include balance
            totalTransactions
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error fetching dashboard data' 
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