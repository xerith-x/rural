const express = require('express');
const router = express.Router();
const { getLessons, createLesson } = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:courseId', getLessons);
router.post('/', protect, createLesson);

module.exports = router;
