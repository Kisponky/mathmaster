const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../auth/authMiddleware');

router.get('/task', auth, taskController.generateTask);

router.get('/statistics/:muvelet', auth, taskController.getStatistics);


module.exports = router;
