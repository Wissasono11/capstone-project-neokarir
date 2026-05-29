const ApiResponse = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const MarketService = require('../services/market.service');
const { getPaginationParams } = require('../utils/pagination');

const listMarket = asyncHandler(async (req, res) => {
	const { page, limit, offset } = getPaginationParams(req.query);
	const result = await MarketService.list({ limit, offset });
	return ApiResponse.paginated(res, result.items, page, limit, result.total);
});

const listJobs = asyncHandler(async (req, res) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 10;
	const is_active = req.query.is_active !== undefined ? req.query.is_active === 'true' : true;
	const jobs = await MarketService.listJobs({ limit, is_active }, req.accessToken);
	return ApiResponse.success(res, { jobs }, 'OK');
});

const getJob = asyncHandler(async (req, res) => {
	const job = await MarketService.getJobById(req.params.id, req.accessToken);
	if (!job) {
		return ApiResponse.error(res, 'NOT_FOUND', 'Job not found', 404);
	}
	return ApiResponse.success(res, { job }, 'OK');
});

const searchJobs = asyncHandler(async (req, res) => {
	const jobs = await MarketService.searchJobs(req.query.q, req.accessToken);
	return ApiResponse.success(res, { jobs }, 'OK');
});

const getTrendDomains = asyncHandler(async (req, res) => {
	const data = await MarketService.getTrendDomains();
	return res.json(data); // Passthrough since AI returns custom format
});

const getTrendForecast = asyncHandler(async (req, res) => {
	const data = await MarketService.getTrendForecast(req.body);
	return res.json(data); // Passthrough
});

module.exports = {
	listMarket,
	listJobs,
	getJob,
	searchJobs,
	getTrendDomains,
	getTrendForecast,
};
