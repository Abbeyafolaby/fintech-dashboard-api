const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Admin API Tests', () => {
let adminToken, userToken;

beforeEach(async () => {
// Clear and recreate users for each test
await User.deleteMany({});

const adminUser = await User.create({
    username: 'admin',
    password: 'admin123',
    role: 'admin'
});

const regularUser = await User.create({
    username: 'regular',
    password: 'password123',
    role: 'user'
});

adminToken = (await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'admin123' })).body.token;

userToken = (await request(app)
    .post('/api/auth/login')
    .send({ username: 'regular', password: 'password123' })).body.token;
});

it('should allow admin access to protected route', async () => {
const res = await request(app)
.get('/api/test/admin-only')
.set('Authorization', `Bearer ${adminToken}`);

expect(res.statusCode).toEqual(200);
expect(res.body.message).toMatch(/welcome admin/i);
});

it('should reject non-admin users', async () => {
const res = await request(app)
.get('/api/test/admin-only')
.set('Authorization', `Bearer ${userToken}`);

expect(res.statusCode).toEqual(403);
expect(res.body.error).toMatch(/not authorized/i);
});
});