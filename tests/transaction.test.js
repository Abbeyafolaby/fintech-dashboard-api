const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transactions');

describe('Transaction API Tests', () => {
let token;
let user;

beforeEach(async () => {
// Clean state
await User.deleteMany({});
await Transaction.deleteMany({});

// Create test user
user = await User.create({
    username: 'testuser',
    password: 'password123',
    balance: 40000
});

// Login to get token
const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
    username: 'testuser',
    password: 'password123'
    });

expect(loginRes.statusCode).toEqual(200);
token = loginRes.body.token;
});

it('should process credit transaction', async () => {
const res = await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
    type: 'credit',
    amount: 5000,
    description: 'Test credit'
    });

expect(res.statusCode).toEqual(201);
expect(res.body.success).toBe(true);
expect(res.body.data.transaction.balanceAfter).toBe(45000);
expect(res.body.data.newBalance).toBe(45000);
});

it('should process debit transaction', async () => {
const res = await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
    type: 'debit',
    amount: 5000,
    description: 'Test debit'
    });

expect(res.statusCode).toEqual(201);
expect(res.body.success).toBe(true);
expect(res.body.data.transaction.balanceAfter).toBe(35000);
expect(res.body.data.newBalance).toBe(35000);
});

it('should reject insufficient debit', async () => {
const res = await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
    type: 'debit',
    amount: 50000,
    description: 'Test large debit'
    });

expect(res.statusCode).toEqual(400);
expect(res.body.success).toBe(false);
expect(res.body.error).toMatch(/insufficient funds/i);
});

it('should reject invalid transaction type', async () => {
const res = await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
    type: 'invalid',
    amount: 1000,
    description: 'Test invalid'
    });

expect(res.statusCode).toEqual(500);
expect(res.body.success).toBe(false);
});

it('should reject negative amount', async () => {
const res = await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
    type: 'credit',
    amount: -1000,
    description: 'Test negative'
    });

expect(res.statusCode).toEqual(500);
expect(res.body.success).toBe(false);
});
});