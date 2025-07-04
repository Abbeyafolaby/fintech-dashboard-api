const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
username: {
type: String,
required: [true, 'Please provide a username'],
unique: true,
trim: true,
},
password: {
type: String,
required: [true, 'Please provide a password'],
minlength: 6,
select: false,
},
role: {
type: String,
enum: ['user', 'admin'],
default: 'user',
},
});

// Hash password before saving
userSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 12);
next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);