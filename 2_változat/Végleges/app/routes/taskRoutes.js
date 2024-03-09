const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../auth/authMiddleware');
const adminAuthMiddleware = require('../auth/adminAuthMiddleware');

router.get('/task', auth, taskController.generateTask);

router.get('/statistics/:muvelet', auth, taskController.getStatistics);

router.post('/statistics/saveResult', auth, taskController.saveResult);

router.post('/task/new', adminAuthMiddleware, taskController.newTask);


module.exports = router;
