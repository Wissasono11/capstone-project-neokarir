const logger = require('./logger');
const env = require('../config/env');

// ─── Redis Client (lazy init) ────────────────────────────────────────────────

let redis = null;
let useRedis = false;

const initRedis = () => {
	if (redis !== null) return; // already attempted

	if (env.REDIS_URL && env.REDIS_TOKEN) {
		try {
			const { Redis } = require('@upstash/redis');
			redis = new Redis({
				url: env.REDIS_URL,
				token: env.REDIS_TOKEN,
			});
			useRedis = true;
			logger.info('[Cache] Using Upstash Redis');
		} catch (err) {
			logger.warn('[Cache] Failed to init Upstash Redis, falling back to in-memory', err.message);
			redis = false; // mark as failed so we don't retry
			useRedis = false;
		}
	} else {
		redis = false;
		useRedis = false;
		logger.info('[Cache] No Redis config found, using in-memory cache');
	}
};

// ─── Cache Manager ───────────────────────────────────────────────────────────

/**
 * Hybrid cache with Upstash Redis (primary) and in-memory Map (fallback).
 *
 * All methods are async to support Redis.
 * If Redis is not configured or fails, falls back to in-memory Map seamlessly.
 */
class CacheManager {
	constructor() {
		/** @type {Map<string, { value: any, expiresAt: number }>} */
		this._store = new Map();

		// Cleanup expired in-memory entries every 10 minutes
		this._cleanupInterval = setInterval(() => this._cleanup(), 10 * 60 * 1000);
	}

	/**
	 * Ensure Redis is initialized (lazy).
	 * @private
	 */
	_ensureInit() {
		if (redis === null) initRedis();
	}

	/**
	 * Get a cached value.
	 * @param {string} key
	 * @returns {Promise<any|null>} cached value or null if miss/expired
	 */
	async get(key) {
		this._ensureInit();

		if (useRedis) {
			try {
				const value = await redis.get(key);
				if (value !== null && value !== undefined) {
					logger.info(`[Cache] HIT (Redis): ${key}`);
					return value;
				}
				return null;
			} catch (err) {
				logger.warn(`[Cache] Redis GET failed for "${key}", falling back to memory: ${err.message}`);
			}
		}

		// Fallback: in-memory
		const entry = this._store.get(key);
		if (!entry) return null;

		if (Date.now() > entry.expiresAt) {
			this._store.delete(key);
			return null;
		}

		logger.info(`[Cache] HIT (memory): ${key}`);
		return entry.value;
	}

	/**
	 * Set a cached value with TTL.
	 * @param {string} key
	 * @param {any} value
	 * @param {number} ttlMs — time-to-live in milliseconds
	 */
	async set(key, value, ttlMs) {
		this._ensureInit();
		const ttlSeconds = Math.round(ttlMs / 1000);

		if (useRedis) {
			try {
				await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
				logger.info(`[Cache] SET (Redis): ${key} (TTL: ${ttlSeconds}s)`);
				return;
			} catch (err) {
				logger.warn(`[Cache] Redis SET failed for "${key}", falling back to memory: ${err.message}`);
			}
		}

		// Fallback: in-memory
		this._store.set(key, {
			value,
			expiresAt: Date.now() + ttlMs,
		});
		logger.info(`[Cache] SET (memory): ${key} (TTL: ${ttlSeconds}s)`);
	}

	/**
	 * Check if a key exists and is not expired.
	 * @param {string} key
	 * @returns {Promise<boolean>}
	 */
	async has(key) {
		this._ensureInit();

		if (useRedis) {
			try {
				const exists = await redis.exists(key);
				return exists === 1;
			} catch (err) {
				logger.warn(`[Cache] Redis EXISTS failed for "${key}": ${err.message}`);
			}
		}

		// Fallback: in-memory
		const entry = this._store.get(key);
		if (!entry) return false;
		if (Date.now() > entry.expiresAt) {
			this._store.delete(key);
			return false;
		}
		return true;
	}

	/**
	 * Invalidate cache entries matching a prefix.
	 * @param {string} prefix — e.g. 'uuid123:' to clear all entries for that user
	 */
	async invalidate(prefix) {
		this._ensureInit();

		if (useRedis) {
			try {
				// Upstash Redis supports SCAN via the scan method
				let cursor = 0;
				let totalDeleted = 0;
				do {
					const [nextCursor, keys] = await redis.scan(cursor, { match: `${prefix}*`, count: 100 });
					cursor = Number(nextCursor);
					if (keys.length > 0) {
						await redis.del(...keys);
						totalDeleted += keys.length;
					}
				} while (cursor !== 0);

				if (totalDeleted > 0) {
					logger.info(`[Cache] INVALIDATED (Redis): ${totalDeleted} entries with prefix "${prefix}"`);
				}
				return;
			} catch (err) {
				logger.warn(`[Cache] Redis INVALIDATE failed for prefix "${prefix}": ${err.message}`);
			}
		}

		// Fallback: in-memory
		let count = 0;
		for (const key of this._store.keys()) {
			if (key.startsWith(prefix)) {
				this._store.delete(key);
				count++;
			}
		}
		if (count > 0) {
			logger.info(`[Cache] INVALIDATED (memory): ${count} entries with prefix "${prefix}"`);
		}
	}

	/**
	 * Delete a specific key.
	 * @param {string} key
	 */
	async delete(key) {
		this._ensureInit();

		if (useRedis) {
			try {
				await redis.del(key);
				return;
			} catch (err) {
				logger.warn(`[Cache] Redis DEL failed for "${key}": ${err.message}`);
			}
		}

		this._store.delete(key);
	}

	/**
	 * Clear all cached entries.
	 */
	async clear() {
		this._ensureInit();

		if (useRedis) {
			try {
				await redis.flushdb();
				logger.info('[Cache] CLEARED (Redis): all entries');
				return;
			} catch (err) {
				logger.warn(`[Cache] Redis FLUSHDB failed: ${err.message}`);
			}
		}

		const size = this._store.size;
		this._store.clear();
		logger.info(`[Cache] CLEARED (memory): ${size} entries`);
	}

	/**
	 * Get cache stats for monitoring.
	 * @returns {Promise<{ active: number, expired: number, total: number, backend: string }>}
	 */
	async stats() {
		this._ensureInit();

		if (useRedis) {
			try {
				const dbSize = await redis.dbsize();
				return { active: dbSize, expired: 0, total: dbSize, backend: 'upstash-redis' };
			} catch (err) {
				logger.warn(`[Cache] Redis DBSIZE failed: ${err.message}`);
			}
		}

		// Fallback: in-memory
		let active = 0;
		let expired = 0;
		const now = Date.now();

		for (const entry of this._store.values()) {
			if (now > entry.expiresAt) {
				expired++;
			} else {
				active++;
			}
		}

		return { active, expired, total: this._store.size, backend: 'in-memory' };
	}

	/**
	 * Remove expired entries from the in-memory store.
	 * Redis handles expiry automatically via TTL, so this only cleans the fallback Map.
	 * @private
	 */
	_cleanup() {
		const now = Date.now();
		let removed = 0;
		for (const [key, entry] of this._store) {
			if (now > entry.expiresAt) {
				this._store.delete(key);
				removed++;
			}
		}
		if (removed > 0) {
			logger.info(`[Cache] CLEANUP: removed ${removed} expired in-memory entries`);
		}
	}

	/**
	 * Stop the cleanup interval (for graceful shutdown).
	 */
	destroy() {
		if (this._cleanupInterval) {
			clearInterval(this._cleanupInterval);
			this._cleanupInterval = null;
		}
		this._store.clear();
	}
}

// ─── TTL Constants (in milliseconds) ────────────────────────────────────────

const CACHE_TTL = {
	RECOMMENDATIONS: 2 * 60 * 60 * 1000,   // 2 hours — recommendations rarely change
	SKILL_GAP:       2 * 60 * 60 * 1000,   // 2 hours — skill gap rarely changes
	PROFILE:         30 * 60 * 1000,        // 30 minutes
	ROADMAP:         6 * 60 * 60 * 1000,    // 6 hours — roadmap content is very stable
	TREND_FORECAST:  1 * 60 * 60 * 1000,    // 1 hour — trend data
};

// ─── Cache key builders ──────────────────────────────────────────────────────

const CACHE_KEYS = {
	recommendations: (userId) => `${userId}:recommendations`,
	skillGap:        (userId, jobId) => `${userId}:skillgap${jobId ? `:${jobId}` : ''}`,
	profile:         (userId) => `${userId}:profile`,
	roadmap:         (jobId) => `roadmap:${jobId}`,
	trendForecast:   (domain, nMonths) => `trend:${domain || 'all'}:${nMonths}`,
	userPrefix:      (userId) => `${userId}:`,
};

// Singleton instance
const cache = new CacheManager();

module.exports = { cache, CACHE_TTL, CACHE_KEYS };
