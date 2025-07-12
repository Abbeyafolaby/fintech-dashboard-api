const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transactions');

describe('Dashboard API Tests', () => {
let token;

beforeEach(async () => {
const user = await User.create({
    username: 'testuser',
    password: 'password123',
    balance: 5000
});

await Transaction.create([
    { user: user._id, type: 'credit', amount: 5000, balanceAfter: 5000 }
]);

// Login to get token
const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
    username: 'testuser',
    password: 'password123'
    });

token = loginRes.body.token;
});

it('should get dashboard summary', async () => {
const res = await request(app)
    .get('/api/dashboard')
    .set('Authorization', `Bearer ${token}`);

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('balance', 5000);
expect(res.body.totalTransactions).toBe(1);
});

it('should reject unauthorized access', async () => {
const res = await request(app)
    .get('/api/dashboard');

expect(res.statusCode).toEqual(401);
});
});