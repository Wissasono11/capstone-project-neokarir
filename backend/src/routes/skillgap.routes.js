const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const SkillgapController = require('../controllers/skillgap.controller');

const router = express.Router();

router.get('/me', requireAuth, SkillgapController.getMySkillGap);
router.post('/analyze', requireAuth, SkillgapController.analyzeSkillGap);

module.exports = router;

