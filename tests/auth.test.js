const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API Tests', () => {
beforeEach(async () => {
await User.create({
    username: 'testuser',
    password: 'password123',
    role: 'user'
});
});

it('should login with valid credentials', async () => {
const res = await request(app)
    .post('/api/auth/login')
    .send({
    username: 'testuser',
    password: 'password123'
    });

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('token');
});

it('should reject invalid credentials', async () => {
const res = await request(app)
    .post('/api/auth/login')
    .send({
    username: 'testuser',
    password: 'wrongpassword'
    });

expect(res.statusCode).toEqual(401);
expect(res.body.success).toBe(false);
});
});