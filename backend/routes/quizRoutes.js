const express = require('express');
const router = express.Router();
const { getQuizByLesson, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:lessonId', getQuizByLesson);
router.post('/submit', protect, submitQuiz);

module.exports = router;
