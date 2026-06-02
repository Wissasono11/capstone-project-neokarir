const request = require('supertest');

const app = require('../src/app');

describe('profile', () => {
	it('GET /api/v1/profile/me without token returns 401', async () => {
		const res = await request(app).get('/api/v1/profile/me');
		expect(res.status).toBe(401);
	});
});
