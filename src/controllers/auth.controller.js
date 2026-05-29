const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const AuthService = require('../services/auth.service');

const register = asyncHandler(async (req, res) => {
	const { email, password, profile } = req.body;
	const result = await AuthService.register({ email, password, profile });
	return ApiResponse.success(res, result, 'Registered', 201);
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const result = await AuthService.login({ email, password });
	return ApiResponse.success(res, result, 'Logged in');
});

const me = asyncHandler(async (req, res) => {
	return ApiResponse.success(res, { user: req.user }, 'OK');
});

const changePassword = asyncHandler(async (req, res) => {
	const { newPassword } = req.body;
	const result = await AuthService.changePassword(req.user.id, newPassword, req.accessToken);
	return ApiResponse.success(res, result, 'Password changed successfully');
});

module.exports = {
	register,
	login,
	me,
	changePassword,
};
