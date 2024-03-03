const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const auth = require('../auth/authMiddleware');
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');

router.get('/vizsgalatinaplo/:type/:order', adminAuthMiddleware, auditLogController.getVizsgalatinaplo);
router.post('/addAuditLog', auth, auditLogController.addAuditLog);


module.exports = router;
