const request = require('supertest');

const app = require('../src/app');

describe('auth', () => {
	it('GET /api/v1/auth/me without token returns 401', async () => {
		const res = await request(app).get('/api/v1/auth/me');
		expect(res.status).toBe(401);
		expect(res.body).toHaveProperty('success', false);
	});
});
