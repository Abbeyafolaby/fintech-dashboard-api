const User = require('../models/User');
const Transaction = require('../models/Transactions');

exports.makeTransaction = async (req, res, next) => {
try {
const { type, amount, description } = req.body;

// Validation
if (!type || !amount) {
    throw new Error('Type and amount are required');
}

if (!['credit', 'debit'].includes(type)) {
    throw new Error('Invalid transaction type');
}

if (isNaN(amount) || amount < 1) {
    throw new Error('Amount must be a number greater than 0');
}

const user = await User.findById(req.user._id);
if (!user) {
    throw new Error('User not found');
}

// Check sufficient funds for debit
if (type === 'debit' && user.balance < amount) {
    const err = new Error('Insufficient funds');
    err.statusCode = 400;
    throw err;
}

// Calculate new balance
const newBalance = type === 'credit' 
    ? user.balance + amount 
    : user.balance - amount;

// Update user
user.balance = newBalance;
await user.save();

// Create transaction
const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    description,
    balanceAfter: newBalance
});

res.status(201).json({
    success: true,
    data: transaction
});

} catch (error) {
next(error); // Pass to error handler
}
};