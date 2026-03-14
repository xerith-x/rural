const db = require('../config/db');

const getQuizByLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const [questions] = await db.query('SELECT * FROM Quizzes WHERE lesson_id = ? ORDER BY id ASC', [lessonId]);
        
        const formattedQuestions = questions.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));

        res.json(formattedQuestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const submitQuiz = async (req, res) => {
    const { lesson_id, score } = req.body;

    try {
        if (!req.user || req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can submit quiz scores' });
        }

        if (!lesson_id || score === undefined) {
            return res.status(400).json({ message: 'Lesson ID and score are required' });
        }

        const student_id = req.user.id;

        const [result] = await db.query(`
            INSERT INTO StudentProgress (student_id, lesson_id, status, score) 
            VALUES (?, ?, 'completed', ?) 
            ON DUPLICATE KEY UPDATE status = 'completed', score = ?
        `, [student_id, lesson_id, score, score]);

        res.json({ message: 'Quiz score submitted successfully', score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getQuizByLesson,
    submitQuiz,
};
