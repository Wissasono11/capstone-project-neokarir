const MarketRepository = require('../repositories/market.repository');
const JobRepository = require('../repositories/job.repository');
const { getPrismaClient } = require('../config/prisma');
const { cache, CACHE_TTL, CACHE_KEYS } = require('../utils/cacheManager');

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

const { callAI2 } = require('../utils/aiClient');

const generateFallbackHistory = (nMonths) => {
  const domains = [
    "Cyber Security",
    "Data Analytics",
    "Data Engineering",
    "Data Science & AI",
    "DevOps & Cloud",
    "Product Management",
    "Software Development",
    "UI/UX Design",
    "Web Development"
  ];
  
  const baseDemand = {
    "Cyber Security": 270.0,
    "Data Analytics": 360.0,
    "Data Engineering": 900.0,
    "Data Science & AI": 2500.0,
    "DevOps & Cloud": 1300.0,
    "Product Management": 200.0,
    "Software Development": 500.0,
    "UI/UX Design": 320.0,
    "Web Development": 470.0
  };

  const growthRates = {
    "Cyber Security": 0.024,
    "Data Analytics": 0.018,
    "Data Engineering": 0.031,
    "Data Science & AI": 0.045,
    "DevOps & Cloud": 0.028,
    "Product Management": 0.012,
    "Software Development": 0.015,
    "UI/UX Design": 0.016,
    "Web Development": 0.011
  };

  const history = [];
  const today = new Date();
  
  for (let i = nMonths; i >= 1; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 15);
    const dateStr = d.toISOString().split('T')[0];
    const demand = {};
    
    domains.forEach(domain => {
      const base = baseDemand[domain];
      const rate = growthRates[domain];
      const val = base / Math.pow(1 + rate, i);
      demand[domain] = Math.round(val * 10) / 10;
    });
    
    history.push({ date: dateStr, demand });
  }
  
  return history;
};

const groupTrendsByDate = (trends) => {
  const grouped = {};
  for (const t of trends) {
    const dateStr = new Date(t.trend_date).toISOString().split('T')[0];
    if (!grouped[dateStr]) {
      grouped[dateStr] = {};
    }
    grouped[dateStr][t.category] = Number(t.job_count);
  }
  
  return Object.keys(grouped).sort().map(date => ({
    date,
    demand: grouped[date]
  }));
};

const getEndOfCurrentMonthISO = () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay.toISOString().split('T')[0];
};

const getLiveCountsByDomain = async () => {
	const prisma = getPrismaClient();
	const results = await prisma.$queryRaw`
		SELECT (job_data->>'job_domain') as domain, COUNT(*)::int as count 
		FROM jobs 
		WHERE is_active = true 
		GROUP BY (job_data->>'job_domain')
	`;

	const counts = {};
	const domains = [
		"Cyber Security",
		"Data Analytics",
		"Data Engineering",
		"Data Science & AI",
		"DevOps & Cloud",
		"Product Management",
		"Software Development",
		"UI/UX Design",
		"Web Development"
	];
	domains.forEach(d => { counts[d] = 0; });

	results.forEach(row => {
		if (domains.includes(row.domain)) {
			counts[row.domain] = row.count;
		}
	});

	return counts;
};

const getTrendDomains = async () => {
	return callAI2('/api/trend/domains', null, { method: 'GET' });
};

const getTrendForecast = async (payload) => {
	// Check cache first
	const cacheKey = CACHE_KEYS.trendForecast(payload.domain, payload.n_months || 3);
	const cached = await cache.get(cacheKey);
	if (cached) return cached;

	let trends = [];
	try {
		trends = await MarketRepository.getHistoricalTrends();
	} catch (err) {
		console.error('Failed to fetch historical trends from DB:', err.message);
	}

	let history = groupTrendsByDate(trends);
	if (history.length === 0) {
		history = generateFallbackHistory(12);
	}

	// Dynamic live real-time current month integration
	try {
		const liveCounts = await getLiveCountsByDomain();
		const currentMonthISO = getEndOfCurrentMonthISO();
		const currentMonthYear = currentMonthISO.substring(0, 7);

		const existingIndex = history.findIndex(h => h.date.substring(0, 7) === currentMonthYear);
		if (existingIndex !== -1) {
			history[existingIndex].demand = liveCounts;
		} else {
			history.push({
				date: currentMonthISO,
				demand: liveCounts
			});
		}

		if (history.length > 12) {
			history = history.slice(-12);
		}
	} catch (liveErr) {
		console.error('Failed to append live real-time job counts:', liveErr.message);
	}

	const aiResult = await callAI2('/api/trend/forecast', {
		history,
		n_months: payload.n_months || 3,
		domain: payload.domain || null,
	}, { method: 'POST' });

	// Save predictions to Database
	if (aiResult && aiResult.status === 'success' && aiResult.predictions) {
		const lastDateStr = history[history.length - 1].date;
		const lastDate = new Date(lastDateStr);

		const domains = [
			"Cyber Security",
			"Data Analytics",
			"Data Engineering",
			"Data Science & AI",
			"DevOps & Cloud",
			"Product Management",
			"Software Development",
			"UI/UX Design",
			"Web Development"
		];

		const growthRates = {
			"Cyber Security": 0.024,
			"Data Analytics": 0.018,
			"Data Engineering": 0.031,
			"Data Science & AI": 0.045,
			"DevOps & Cloud": 0.028,
			"Product Management": 0.012,
			"Software Development": 0.015,
			"UI/UX Design": 0.016,
			"Web Development": 0.011
		};

		const salaries = {
			"Cyber Security": 12000000,
			"Data Analytics": 9500000,
			"Data Engineering": 14000000,
			"Data Science & AI": 16000000,
			"DevOps & Cloud": 15000000,
			"Product Management": 11000000,
			"Software Development": 10000000,
			"UI/UX Design": 8500000,
			"Web Development": 8000000
		};

		for (let i = 0; i < aiResult.predictions.length; i++) {
			const predictionMonth = aiResult.predictions[i];
			const targetDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + i + 2, 0); // last day of month i + 1 after lastDate
			const trendDateISO = targetDate.toISOString();

			for (const category of Object.keys(predictionMonth)) {
				if (!domains.includes(category)) continue;

				const jobCount = Math.round(predictionMonth[category]);
				const rate = growthRates[category] || 0.02;
				const salary = salaries[category] || 9000000;

				try {
					await MarketRepository.upsertForecastTrend({
						title: `${category} Forecast - Month +${i + 1}`,
						category,
						trend_date: trendDateISO,
						job_count: jobCount,
						growth_rate: rate * 100,
						avg_salary: salary,
						market_data: { is_forecast: true }
					});
				} catch (dbErr) {
					console.error(`Failed to save forecast row for ${category} at ${trendDateISO}:`, dbErr.message);
				}
			}
		}
	}

	// Cache the result
	if (aiResult && aiResult.status === 'success') {
		await cache.set(cacheKey, aiResult, CACHE_TTL.TREND_FORECAST);
	}

	return aiResult;
};

module.exports = {
	list,
	listJobs,
	getJobById,
	searchJobs,
	getTrendDomains,
	getTrendForecast,
};
