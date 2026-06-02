const express = require('express');
const ProfileController = require('../controllers/profile.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/me', requireAuth, ProfileController.getMyProfile);
router.put('/me', requireAuth, ProfileController.upsertMyProfile);
router.get('/me/score', requireAuth, ProfileController.getMyScore);
router.post('/avatar', requireAuth, upload.single('avatar'), ProfileController.uploadAvatar);

module.exports = router;
