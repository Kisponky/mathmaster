const express = require('express');
const router = express.Router();
const auth = require('../auth/authMiddleware')
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');
const messageController = require('../controllers/MessageController');

router.get('/messages', adminAuthMiddleware, messageController.getMessages);

router.post('/text', messageController.saveMessage);

router.delete('/kapcsolat/:kapcsolat_id', auth, messageController.deleteMessage);

router.put('/valasz/:kapcsolatId', adminAuthMiddleware, messageController.updateMessage);

router.get('/archived-messages', auth, messageController.getArchivedMessages);

module.exports = router;
