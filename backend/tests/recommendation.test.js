const request = require('supertest');

const app = require('../src/app');

describe('recommendation', () => {
	it('GET /api/v1/recommendation/me without token returns 401', async () => {
		const res = await request(app).get('/api/v1/recommendation/me');
		expect(res.status).toBe(401);
	});
});
