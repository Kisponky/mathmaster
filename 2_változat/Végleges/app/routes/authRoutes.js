const express = require('express');
const router = express.Router();
const auth = require('../auth/authMiddleware');
const adminAuth = require('../auth/adminAuthMiddleware');

router.get('/check-auth', auth, (req, res) => {
    res.json({ message: 'Ez egy érvényes token.' });
});

router.get('/check-admin', adminAuth, (req, res) => {
    res.json({ message: 'Ez egy érvényes token.' });
});


module.exports = router;


