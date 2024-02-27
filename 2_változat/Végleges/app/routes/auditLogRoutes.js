const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auditLogController');
const auth = require('../auth/authMiddleware');
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');

router.get('/vizsgalatinaplo/:type/:order', adminAuthMiddleware, UserController.getVizsgalatinaplo);


module.exports = router;
