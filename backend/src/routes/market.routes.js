const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const MarketController = require('../controllers/market.controller');

const router = express.Router();

router.get('/', MarketController.listMarket);
router.get('/jobs', requireAuth, MarketController.listJobs);
router.get('/jobs/search', requireAuth, MarketController.searchJobs);
router.get('/jobs/:id', requireAuth, MarketController.getJob);

// AI Trend Forecast Proxy
router.get('/trend/domains', requireAuth, MarketController.getTrendDomains);
router.post('/trend/forecast', requireAuth, MarketController.getTrendForecast);

module.exports = router;
