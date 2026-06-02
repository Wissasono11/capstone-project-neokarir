const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const RecommendationService = require('../services/recommendation.service');

const listMyRecommendations = asyncHandler(async (req, res) => {
	const items = await RecommendationService.listByUserId(req.user.id, req.accessToken);
	return ApiResponse.success(res, { recommendations: items }, 'OK');
});

const generateRecommendations = asyncHandler(async (req, res) => {
	const items = await RecommendationService.generate(req.user.id, req.accessToken);
	return ApiResponse.success(res, { recommendations: items }, 'Recommendations generated successfully');
});

const getRoadmap = asyncHandler(async (req, res) => {
	const data = await RecommendationService.getRoadmap(req.params.jobId);
	return ApiResponse.success(res, data, 'Roadmap fetched successfully');
});

module.exports = {
	listMyRecommendations,
	generateRecommendations,
	getRoadmap,
};
