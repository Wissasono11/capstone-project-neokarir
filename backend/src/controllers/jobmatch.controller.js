const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const JobmatchService = require('../services/jobmatch.service');

const runJobMatch = asyncHandler(async (req, res) => {
	const result = await JobmatchService.run(req.user.id, req.body, req.accessToken);
	return ApiResponse.success(res, result, 'OK');
});

module.exports = {
	runJobMatch,
};
