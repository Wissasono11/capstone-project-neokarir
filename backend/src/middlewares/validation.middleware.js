const { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../constants/error');
const ApiResponse = require('../utils/response');

const validateBody = (requiredFields = []) => {
	return (req, res, next) => {
		if (!requiredFields || requiredFields.length === 0) return next();

		const missing = requiredFields.filter((f) => req.body == null || req.body[f] == null);
		if (missing.length > 0) {
			return ApiResponse.error(
				res,
				ERROR_CODES.VALIDATION_ERROR,
				ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR],
				HTTP_STATUS_CODES[ERROR_CODES.VALIDATION_ERROR],
				{ missing }
			);
		}

		return next();
	};
};

module.exports = {
	validateBody,
};
