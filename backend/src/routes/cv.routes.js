const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const CvController = require('../controllers/cv.controller');
const { upload } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/me', requireAuth, CvController.getMyCv);
router.put('/me', requireAuth, CvController.upsertMyCv);
router.post('/upload', requireAuth, upload.single('file'), CvController.uploadCvFile);
router.post('/analyze', requireAuth, upload.single('file'), CvController.analyzeCv);
router.post('/smart-analyze', requireAuth, upload.single('file'), CvController.smartAnalyzeCv);

module.exports = router;
