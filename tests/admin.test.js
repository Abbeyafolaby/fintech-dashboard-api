const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Admin API Tests', () => {
let adminToken, userToken;

beforeEach(async () => {
// Clear and recreate users for each test
await User.deleteMany({});

// Create admin user
await User.create({
    username: 'admin',
    password: 'admin123',
    role: 'admin'
});

// Create regular user
await User.create({
    username: 'regular',
    password: 'password123',
    role: 'user'
});

// Login as admin
const adminLoginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'admin123' });

expect(adminLoginRes.statusCode).toEqual(200);
adminToken = adminLoginRes.body.token;

// Login as regular user
const userLoginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'regular', password: 'password123' });

expect(userLoginRes.statusCode).toEqual(200);
userToken = userLoginRes.body.token;
});

it('should allow admin access to protected route', async () => {
const res = await request(app)
    .get('/api/test/admin-only')
    .set('Authorization', `Bearer ${adminToken}`);

expect(res.statusCode).toEqual(200);
expect(res.body.success).toBe(true);
expect(res.body.message).toMatch(/welcome admin/i);
});

it('should reject non-admin users', async () => {
const res = await request(app)
    .get('/api/test/admin-only')
    .set('Authorization', `Bearer ${userToken}`);

expect(res.statusCode).toEqual(403);
expect(res.body.success).toBe(false);
expect(res.body.error).toMatch(/not authorized/i);
});

it('should reject requests without token', async () => {
const res = await request(app)
    .get('/api/test/admin-only');

expect(res.statusCode).toEqual(401);
expect(res.body.success).toBe(false);
});
});