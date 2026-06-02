const env = require('./config/env');
const app = require('./app');
const logger = require('./utils/logger');
const { connectDatabase } = require('./config/database');

const start = async () => {
	try {
		await connectDatabase();
	} catch (err) {
		logger.warn(
			'Database init failed; starting server anyway',
			err && err.message ? err.message : err
		);
	}

	const server = app.listen(env.PORT, () => {
		logger.info(`API listening on http://localhost:${env.PORT}`);
	});

	const shutdown = () => {
		logger.info('Shutting down...');
		server.close(() => process.exit(0));
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
};

start();
