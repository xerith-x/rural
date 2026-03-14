const express = require('express');
const router = express.Router();
const { getStudentProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:studentId', protect, getStudentProgress);

module.exports = router;
