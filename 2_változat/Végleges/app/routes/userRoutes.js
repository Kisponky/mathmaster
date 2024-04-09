const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../auth/authMiddleware');
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');


router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/newAdmin', adminAuthMiddleware, UserController.addAdminPrivilege);

router.put('/update-username', auth, UserController.updateUserUsername);

router.put('/update-email', auth, UserController.updateUserEmail);

router.delete('/deleteProfile', auth, UserController.deleteUserById);

router.put('/change-password', auth, UserController.changePassword);


router.get('/protected', (req, res) => {
  res.json({ message: 'Ez egy védett útvonal.' });
});


module.exports = router;
