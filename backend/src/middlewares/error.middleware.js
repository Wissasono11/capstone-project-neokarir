const ApiResponse = require('../utils/response');
const { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../constants/error');
const logger = require('../utils/logger');

class AppError extends Error {
	constructor(code, message, statusCode, details) {
		super(message || ERROR_MESSAGES[code] || 'Error');
		this.name = 'AppError';
		this.code = code || ERROR_CODES.INTERNAL_SERVER_ERROR;
		this.statusCode = statusCode || HTTP_STATUS_CODES[this.code] || 500;
		this.details = details || null;
	}
}

const notFoundHandler = (req, res) => {
	return ApiResponse.error(
		res,
		ERROR_CODES.NOT_FOUND,
		ERROR_MESSAGES[ERROR_CODES.NOT_FOUND],
		HTTP_STATUS_CODES[ERROR_CODES.NOT_FOUND],
		{ path: req.originalUrl, method: req.method }
	);
};

const normalizeError = (err) => {
	if (err instanceof AppError) return err;

	// Check if the error has a statusCode property (e.g. manually thrown service/repo error)
	if (err && typeof err === 'object' && err.statusCode) {
		return new AppError(
			err.code || ERROR_CODES.INVALID_INPUT,
			err.message,
			err.statusCode,
			err.details || null
		);
	}

	// Supabase errors often look like { message, details, hint, code }
	if (err && typeof err === 'object' && (err.details || err.hint || err.code)) {
		return new AppError(
			ERROR_CODES.DATABASE_ERROR,
			err.message || ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
			HTTP_STATUS_CODES[ERROR_CODES.DATABASE_ERROR],
			{
				code: err.code,
				details: err.details,
				hint: err.hint,
			}
		);
	}

	return new AppError(
		ERROR_CODES.INTERNAL_SERVER_ERROR,
		err && err.message ? err.message : ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR],
		HTTP_STATUS_CODES[ERROR_CODES.INTERNAL_SERVER_ERROR]
	);
};

const errorHandler = (err, req, res, next) => {
	const normalized = normalizeError(err);
	logger.error(normalized.message, {
		code: normalized.code,
		statusCode: normalized.statusCode,
		path: req.originalUrl,
		method: req.method,
		details: normalized.details,
	});

	if (res.headersSent) return next(err);

	return ApiResponse.error(
		res,
		normalized.code,
		normalized.message,
		normalized.statusCode,
		normalized.details
	);
};

module.exports = {
	AppError,
	notFoundHandler,
	errorHandler,
};
