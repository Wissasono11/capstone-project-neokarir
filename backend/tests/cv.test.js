const request = require('supertest');

const app = require('../src/app');

describe('cv', () => {
	it('GET /api/v1/cv/me without token returns 401', async () => {
		const res = await request(app).get('/api/v1/cv/me');
		expect(res.status).toBe(401);
	});
});
