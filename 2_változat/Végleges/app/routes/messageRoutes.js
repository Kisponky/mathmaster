const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');
const messageController = require('../controllers/MessageController');

// Üzenetek lekérése útvonala
router.get('/messages', adminAuthMiddleware, messageController.getMessages);

router.post('/text', messageController.saveMessage);

router.delete('/kapcsolat/:kapcsolat_id', adminAuthMiddleware, messageController.deleteMessage);

router.put('/valasz/:kapcsolatId', adminAuthMiddleware, messageController.updateMessage);

module.exports = router;
