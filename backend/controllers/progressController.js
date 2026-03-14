const db = require('../config/db');

const getStudentProgress = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const [progress] = await db.query(
            `SELECT p.id, p.student_id, p.lesson_id, p.score, p.status, p.created_at, l.course_id 
             FROM StudentProgress p
             JOIN Lessons l ON p.lesson_id = l.id
             WHERE p.student_id = ?`,
            [studentId]
        );
        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getStudentProgress,
};
