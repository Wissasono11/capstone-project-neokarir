const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const ProfileService = require('../services/profile.service');

const getMyProfile = asyncHandler(async (req, res) => {
	const profile = await ProfileService.getByUserId(req.user.id, req.accessToken);
	return ApiResponse.success(res, { profile }, 'OK');
});

const upsertMyProfile = asyncHandler(async (req, res) => {
	const profile = await ProfileService.upsertByUserId(req.user.id, req.body, req.accessToken);
	return ApiResponse.success(res, { profile }, 'Updated');
});

const getMyScore = asyncHandler(async (req, res) => {
	const result = await ProfileService.getProfileScore(req.user.id, req.accessToken);
	return ApiResponse.success(res, result, 'OK');
});

const uploadAvatar = asyncHandler(async (req, res) => {
	const result = await ProfileService.uploadAvatarByUserId(req.user.id, req.file, req.accessToken);
	return ApiResponse.success(res, result, 'Avatar uploaded successfully');
});

module.exports = {
	getMyProfile,
	upsertMyProfile,
	getMyScore,
	uploadAvatar,
};
