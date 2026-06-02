const env = require('../config/env');
const logger = require('./logger');

const DEFAULT_TIMEOUT_MS = 120_000; // 2 minutes — AI models can be slow

const normalizeServiceUrl = (baseUrl) => {
	try {
		const url = new URL(baseUrl);
		if (url.hostname === 'localhost') {
			url.hostname = '127.0.0.1';
		}
		return url.toString().replace(/\/$/, '');
	} catch {
		return baseUrl;
	}
};

/**
 * Generic fetch wrapper with timeout and structured error handling.
 */
const fetchWithTimeout = async (url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		return response;
	} finally {
		clearTimeout(timer);
	}
};

/**
 * Call an AI service endpoint with a JSON payload.
 *
 * @param {string} baseUrl  — e.g. http://localhost:8000
 * @param {string} endpoint — e.g. /api/v1/chat/
 * @param {object} payload  — JSON body
 * @param {object} [opts]
 * @param {string} [opts.method='POST']
 * @param {number} [opts.timeoutMs]
 * @returns {Promise<object>} parsed JSON response
 */
const callService = async (baseUrl, endpoint, payload = null, opts = {}) => {
	const url = `${baseUrl}${endpoint}`;
	const method = opts.method || (payload ? 'POST' : 'GET');

	const fetchOptions = {
		method,
		headers: { 'Content-Type': 'application/json' },
	};

	if (payload && method !== 'GET') {
		fetchOptions.body = JSON.stringify(payload);
	}

	logger.info(`AI request → ${method} ${url}`);

	const response = await fetchWithTimeout(url, fetchOptions, opts.timeoutMs || DEFAULT_TIMEOUT_MS);

	const body = await response.text();

	let parsed;
	try {
		parsed = JSON.parse(body);
	} catch {
		logger.error(`AI response not JSON: ${body.slice(0, 200)}`);
		const err = new Error(`AI service returned non-JSON response (status ${response.status})`);
		err.statusCode = 502;
		throw err;
	}

	if (!response.ok) {
		const detail = parsed.detail || parsed.message || JSON.stringify(parsed);
		logger.error(`AI error (${response.status}): ${detail}`);
		const err = new Error(`AI service error: ${detail}`);
		err.statusCode = response.status >= 500 ? 502 : response.status;
		throw err;
	}

	return parsed;
};

/**
 * Call an AI service endpoint with a multipart/form-data payload (file upload).
 *
 * @param {string} baseUrl
 * @param {string} endpoint
 * @param {FormData} formData — Node.js built-in FormData (18+)
 * @param {object} [opts]
 * @returns {Promise<object>}
 */
const callServiceMultipart = async (baseUrl, endpoint, formData, opts = {}) => {
	const url = `${baseUrl}${endpoint}`;

	logger.info(`AI multipart request → POST ${url}`);

	const response = await fetchWithTimeout(
		url,
		{ method: 'POST', body: formData },
		opts.timeoutMs || DEFAULT_TIMEOUT_MS
	);

	const body = await response.text();

	let parsed;
	try {
		parsed = JSON.parse(body);
	} catch {
		logger.error(`AI response not JSON: ${body.slice(0, 200)}`);
		const err = new Error(`AI service returned non-JSON response (status ${response.status})`);
		err.statusCode = 502;
		throw err;
	}

	if (!response.ok) {
		const detail = parsed.detail || parsed.message || JSON.stringify(parsed);
		logger.error(`AI error (${response.status}): ${detail}`);
		const err = new Error(`AI service error: ${detail}`);
		err.statusCode = response.status >= 500 ? 502 : response.status;
		throw err;
	}

	return parsed;
};

// ─── Convenience wrappers ────────────────────────────────────────────

/** Call neokarir-ai-1 (CV Analyzer, Profiling, Job Match, Chatbot) */
const callAI1 = (endpoint, payload, opts) =>
	callService(normalizeServiceUrl(env.AI_SERVICE_1_URL), endpoint, payload, opts);

/** Call neokarir-ai-1 with multipart form data */
const callAI1Multipart = (endpoint, formData, opts) =>
	callServiceMultipart(normalizeServiceUrl(env.AI_SERVICE_1_URL), endpoint, formData, opts);

/** Call neokarir-ai-2 (Recommendation, Scoring, Skill Gap, Roadmap) */
const callAI2 = (endpoint, payload, opts) =>
	callService(normalizeServiceUrl(env.AI_SERVICE_2_URL), endpoint, payload, opts);

/**
 * Ping an AI service to check if it's reachable.
 * @param {string} baseUrl
 * @returns {Promise<{ok: boolean, status?: string, error?: string}>}
 */
const pingService = async (baseUrl) => {
	try {
		const data = await callService(normalizeServiceUrl(baseUrl), '/', null, {
			method: 'GET',
			timeoutMs: 5_000,
		});
		return { ok: true, status: data.status || data.message || 'reachable' };
	} catch (err) {
		return { ok: false, error: err.message };
	}
};

/** Health-check both AI services */
const healthCheckAll = async () => ({
	ai_service_1: await pingService(env.AI_SERVICE_1_URL),
	ai_service_2: await pingService(env.AI_SERVICE_2_URL),
});

module.exports = {
	callAI1,
	callAI1Multipart,
	callAI2,
	pingService,
	healthCheckAll,
};
