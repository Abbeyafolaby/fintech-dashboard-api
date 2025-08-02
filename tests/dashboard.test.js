const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transactions');

describe('Dashboard API Tests', () => {
let token;
let userId;

beforeEach(async () => {
// Clean state
await User.deleteMany({});
await Transaction.deleteMany({});

// Create test user
const user = await User.create({
    username: 'testuser',
    password: 'password123',
    balance: 5000
});
userId = user._id;

// Create test transaction
await Transaction.create({
    user: userId,
    type: 'credit',
    amount: 5000,
    balanceAfter: 5000,
    description: 'Initial deposit'
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

it('should get dashboard summary', async () => {
const res = await request(app)
    .get('/api/dashboard')
    .set('Authorization', `Bearer ${token}`);

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('balance', 5000);
expect(res.body.totalTransactions).toBe(1);
expect(res.body).toHaveProperty('username', 'testuser');
});

it('should reject unauthorized access', async () => {
const res = await request(app)
    .get('/api/dashboard');

expect(res.statusCode).toEqual(401);
});

it('should get transactions list', async () => {
const res = await request(app)
    .get('/api/transactions')
    .set('Authorization', `Bearer ${token}`);

expect(res.statusCode).toEqual(200);
expect(res.body.success).toBe(true);
expect(res.body.count).toBe(1);
expect(res.body.data).toHaveLength(1);
});
});
