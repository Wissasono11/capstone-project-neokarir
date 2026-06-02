const express = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const ChatController = require('../controllers/chat.controller');

const router = express.Router();

router.get('/', requireAuth, ChatController.listChats);
router.post('/', requireAuth, ChatController.createChat);
router.post('/:chatId/messages', requireAuth, ChatController.sendMessage);

module.exports = router;
