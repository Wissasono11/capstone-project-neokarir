const { getSupabaseClient } = require('../config/database');
const { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../constants/error');

const extractBearerToken = (req) => {
	const header = req.headers.authorization || '';
	const [type, token] = header.split(' ');
	if (type !== 'Bearer' || !token) return null;
	return token;
};

const requireAuth = async (req, res, next) => {
	try {
		const token = extractBearerToken(req);
		if (!token) {
			return res.status(HTTP_STATUS_CODES[ERROR_CODES.AUTH_UNAUTHORIZED]).json({
				success: false,
				error: ERROR_CODES.AUTH_UNAUTHORIZED,
				message: ERROR_MESSAGES[ERROR_CODES.AUTH_UNAUTHORIZED],
				details: null,
				timestamp: new Date().toISOString(),
			});
		}

		const supabase = getSupabaseClient();
		const { data, error } = await supabase.auth.getUser(token);
		if (error || !data || !data.user) {
			return res.status(HTTP_STATUS_CODES[ERROR_CODES.AUTH_INVALID_TOKEN]).json({
				success: false,
				error: ERROR_CODES.AUTH_INVALID_TOKEN,
				message: ERROR_MESSAGES[ERROR_CODES.AUTH_INVALID_TOKEN],
				details: error ? { message: error.message } : null,
				timestamp: new Date().toISOString(),
			});
		}

		req.user = data.user;
		req.accessToken = token;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	requireAuth,
};
