const MarketRepository = require('../repositories/market.repository');
const JobRepository = require('../repositories/job.repository');

const list = async ({ limit, offset }) => {
	return MarketRepository.list({ limit, offset });
};

const listJobs = async (options, accessToken) => {
	return JobRepository.list(options, accessToken);
};

const getJobById = async (id, accessToken) => {
	return JobRepository.getById(id, accessToken);
};

const searchJobs = async (q, accessToken) => {
	return JobRepository.search(q, accessToken);
};

const { callAI1 } = require('../utils/aiClient');

const getTrendDomains = async () => {
	return callAI1('/api/trend/domains', null, { method: 'GET' });
};

const getTrendForecast = async (payload) => {
	return callAI1('/api/trend/forecast', payload, { method: 'POST' });
};

module.exports = {
	list,
	listJobs,
	getJobById,
	searchJobs,
	getTrendDomains,
	getTrendForecast,
};
