const User = require('../models/User');
const Transaction = require('../models/Transactions');

exports.makeTransaction = async (req, res, next) => {
try {
const { type, amount, description } = req.body;
const userId = req.user._id; // Make sure this line exists

// Validate input
if (!['credit', 'debit'].includes(type)) {
    throw new Error('Invalid transaction type');
}

if (typeof amount !== 'number' || amount < 1) {
    throw new Error('Amount must be a number greater than 0');
}

// Get user with current balance
const user = await User.findById(userId);

if (!user) {
    throw new Error('User not found');
}

// Check for sufficient funds for debit
if (type === 'debit' && user.balance < amount) {
    const err = new Error('Insufficient funds');
    err.statusCode = 400;
    throw err;
}

// Calculate new balance
const newBalance = type === 'credit' 
    ? user.balance + amount 
    : user.balance - amount;

// Update user balance
user.balance = newBalance;
await user.save();

// Create transaction record
const transaction = await Transaction.create({
    user: userId,
    type,
    amount,
    description: description || '',
    balanceAfter: newBalance
});

res.status(201).json({
    success: true,
    data: {
    transaction: {
        _id: transaction._id,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        balanceAfter: transaction.balanceAfter,
        timestamp: transaction.timestamp
    },
    newBalance
    }
});
} catch (error) {
next(error);
}
};