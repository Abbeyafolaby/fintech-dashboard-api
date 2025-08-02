const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API Tests', () => {
beforeEach(async () => {
// Ensure clean state
await User.deleteMany({});

// Create test user
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
expect(res.body.success).toBe(true);
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

it('should register a new user', async () => {
const res = await request(app)
    .post('/api/auth/register')
    .send({
    username: 'newuser',
    password: 'password123'
    });

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('token');
expect(res.body.success).toBe(true);
});
});