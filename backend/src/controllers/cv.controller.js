const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const CvService = require('../services/cv.service');

const getMyCv = asyncHandler(async (req, res) => {
	const cv = await CvService.getByUserId(req.user.id, req.accessToken);
	return ApiResponse.success(res, { cv }, 'OK');
});

const upsertMyCv = asyncHandler(async (req, res) => {
	const cv = await CvService.upsertByUserId(req.user.id, req.body, req.accessToken);
	return ApiResponse.success(res, { cv }, 'Updated');
});

const uploadCvFile = asyncHandler(async (req, res) => {
	const cv = await CvService.attachFile(req.user.id, req.file, req.accessToken);
	return ApiResponse.success(res, { cv }, 'Uploaded');
});

const analyzeCv = asyncHandler(async (req, res) => {
	const result = await CvService.analyzeCv(req.user.id, req.file, req.accessToken);
	return ApiResponse.success(res, result, 'CV analyzed and profile updated');
});

const smartAnalyzeCv = asyncHandler(async (req, res) => {
	const result = await CvService.smartAnalyze(req.user.id, req.file, req.accessToken);
	return ApiResponse.success(res, result, 'CV analyzed successfully');
});

module.exports = {
	getMyCv,
	upsertMyCv,
	uploadCvFile,
	analyzeCv,
	smartAnalyzeCv,
};
