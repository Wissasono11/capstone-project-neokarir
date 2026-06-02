const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const RecommendationController = require('../controllers/recommendation.controller');

const router = express.Router();

router.get('/me', requireAuth, RecommendationController.listMyRecommendations);
router.post('/generate', requireAuth, RecommendationController.generateRecommendations);
router.get('/roadmap/:jobId', requireAuth, RecommendationController.getRoadmap);

module.exports = router;
