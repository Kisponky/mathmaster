const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../auth/authMiddleware');
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');


// Regisztráció útvonala
router.post('/register', UserController.register);

// Bejelentkezés útvonala
router.post('/login', UserController.login);

router.post('/newAdmin', adminAuthMiddleware, UserController.addAdminPrivilege);

router.get('/vizsgalatinaplo', adminAuthMiddleware, UserController.getVizsgalatinaplo);


// Védett útvonal, ahol az authMiddleware-t alkalmazzuk
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Ez egy védett útvonal.' });
});

// További felhasználókkal kapcsolatos útvonalak...

module.exports = router;
