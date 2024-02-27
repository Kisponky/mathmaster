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

router.put('/update-username', auth, UserController.updateUserUsername);

router.put('/update-email', auth, UserController.updateUserEmail);

router.delete('/deleteProfile', auth, UserController.deleteUserById);

router.put('/change-password', auth, UserController.changePassword);


// Védett útvonal, ahol az authMiddleware-t alkalmazzuk
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Ez egy védett útvonal.' });
});

// További felhasználókkal kapcsolatos útvonalak...

module.exports = router;
