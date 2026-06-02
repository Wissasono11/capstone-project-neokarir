const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const SkillgapService = require('../services/skillgap.service');

const analyzeSkillGap = asyncHandler(async (req, res) => {
	const result = await SkillgapService.analyze(req.user.id, req.body, req.accessToken);
	return ApiResponse.success(res, result, 'OK');
});

const getMySkillGap = asyncHandler(async (req, res) => {
	const jobId = req.query.jobId || null;
	let result = await SkillgapService.getByUserId(req.user.id, req.accessToken, jobId);
	
	const hasValidAnalysis = result && result.analysis_result && Object.keys(result.analysis_result).length > 0;
	
	if (!hasValidAnalysis) {
		// Trigger the first analysis automatically if no record exists or if it's an old empty record
		try {
			result = await SkillgapService.analyze(req.user.id, null, req.accessToken);
		} catch (err) {
			console.error('Auto skill gap analysis failed:', err);
			if (err.statusCode === 404) {
				return ApiResponse.error(res, 'User profile not found. Please onboarding first.', 404);
			}
			throw err;
		}
	}
	return ApiResponse.success(res, result, 'OK');
});

module.exports = {
	analyzeSkillGap,
	getMySkillGap,
};

