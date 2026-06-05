const env = require('../config/env');
const logger = require('./logger');

const PING_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes — keep HF Spaces awake (free tier sleeps after ~5 min idle)

let intervalId = null;

/**
 * Ping a single service's root endpoint.
 * Returns { ok, latencyMs, error? }
 */
const pingService = async (name, baseUrl) => {
	const start = Date.now();
	try {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 10_000); // 10s timeout for ping

		const response = await fetch(baseUrl.replace(/\/$/, ''), {
			method: 'GET',
			signal: controller.signal,
		});
		clearTimeout(timer);

		const latencyMs = Date.now() - start;
		if (response.ok) {
			return { ok: true, latencyMs };
		}
		return { ok: false, latencyMs, error: `HTTP ${response.status}` };
	} catch (err) {
		const latencyMs = Date.now() - start;
		return { ok: false, latencyMs, error: err.name === 'AbortError' ? 'Timeout (10s)' : err.message };
	}
};

/**
 * Ping both AI services concurrently.
 */
const pingAll = async () => {
	const [ai1, ai2] = await Promise.all([
		pingService('AI-1', env.AI_SERVICE_1_URL),
		pingService('AI-2', env.AI_SERVICE_2_URL),
	]);

	const ai1Status = ai1.ok ? `✓ ${ai1.latencyMs}ms` : `✗ ${ai1.error} (${ai1.latencyMs}ms)`;
	const ai2Status = ai2.ok ? `✓ ${ai2.latencyMs}ms` : `✗ ${ai2.error} (${ai2.latencyMs}ms)`;

	logger.info(`[KeepAlive] AI-1: ${ai1Status} | AI-2: ${ai2Status}`);
};

/**
 * Start the keep-alive cron. Call once after server starts listening.
 */
const startKeepAlive = () => {
	if (intervalId) {
		logger.warn('[KeepAlive] Already running, skipping duplicate start');
		return;
	}

	logger.info(`[KeepAlive] Started — pinging AI services every ${PING_INTERVAL_MS / 1000}s`);
	logger.info(`[KeepAlive] AI-1: ${env.AI_SERVICE_1_URL}`);
	logger.info(`[KeepAlive] AI-2: ${env.AI_SERVICE_2_URL}`);

	// Initial ping on startup (warm up immediately)
	pingAll();

	intervalId = setInterval(pingAll, PING_INTERVAL_MS);
};

/**
 * Stop the keep-alive cron (for graceful shutdown).
 */
const stopKeepAlive = () => {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
		logger.info('[KeepAlive] Stopped');
	}
};

module.exports = { startKeepAlive, stopKeepAlive };
