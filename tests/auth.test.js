// tests/auth.test.js
const request = require('supertest');
const app = require('../server'); // si exportas app en server.js necesitarás ajustar: module.exports = app

describe('Auth endpoints', () => {
  it('POST /api/auth/register should register', async () => {
    const res = await request('http://localhost:4000')
      .post('/api/auth/register')
      .send({ username: 'testuser1', password: '12345678', role: 'user' });

    expect([200,201,400]).toContain(res.statusCode); // 400 if already exists
  });
});