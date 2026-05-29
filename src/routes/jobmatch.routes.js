const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const JobmatchController = require('../controllers/jobmatch.controller');

const router = express.Router();

router.post('/run', requireAuth, JobmatchController.runJobMatch);

module.exports = router;
