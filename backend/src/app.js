const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const logger = require('./utils/logger');
const ApiResponse = require('./utils/response');
const asyncHandler = require('./utils/asyncHandler');
const { connectDatabase } = require('./config/database');
const routes = require('./routes');
const { healthCheckAll } = require('./utils/aiClient');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.disable('x-powered-by');

app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/v1/health', (req, res) => {
	return ApiResponse.success(
		res,
		{
			status: 'ok',
			service: 'neokarir-backend',
			env: env.NODE_ENV,
			uptimeSeconds: Math.round(process.uptime()),
		},
		'Healthy'
	);
});

app.get(
	'/api/v1/health/db',
	asyncHandler(async (req, res) => {
		await connectDatabase();
		return ApiResponse.success(
			res,
			{
				status: 'ok',
				healthcheckTable: process.env.DB_HEALTHCHECK_TABLE || null,
			},
			'Database OK'
		);
	})
);

app.get(
	'/api/v1/health/ai',
	asyncHandler(async (req, res) => {
		const status = await healthCheckAll();
		return ApiResponse.success(res, status, 'AI Services Health Status');
	})
);

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

process.on('uncaughtException', (err) => {
	logger.error('Uncaught exception', err);
});

process.on('unhandledRejection', (err) => {
	logger.error('Unhandled rejection', err);
});

module.exports = app;
