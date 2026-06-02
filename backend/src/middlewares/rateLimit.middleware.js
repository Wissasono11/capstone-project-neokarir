// Minimal in-memory rate limiter (no external dependency)
// NOTE: resets when process restarts; for production consider Redis-backed limiter.

const ApiResponse = require('../utils/response');
const { ERROR_CODES } = require('../constants/error');

const buckets = new Map();

const rateLimit = ({ windowMs = 60_000, max = 120 } = {}) => {
	return (req, res, next) => {
		const now = Date.now();
		const key = req.ip;
		const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

		if (bucket.resetAt <= now) {
			bucket.count = 0;
			bucket.resetAt = now + windowMs;
		}

		bucket.count += 1;
		buckets.set(key, bucket);

		res.setHeader('X-RateLimit-Limit', String(max));
		res.setHeader('X-RateLimit-Remaining', String(Math.max(0, max - bucket.count)));
		res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));

		if (bucket.count > max) {
			return ApiResponse.error(
				res,
				ERROR_CODES.SERVICE_UNAVAILABLE,
				'Rate limit exceeded',
				429
			);
		}

		return next();
	};
};

module.exports = {
	rateLimit,
};
