const db = require('../config/db');

const getLessons = async (req, res) => {
    try {
        const { courseId } = req.params;
        const [lessons] = await db.query('SELECT * FROM Lessons WHERE course_id = ? ORDER BY id ASC', [courseId]);
        res.json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createLesson = async (req, res) => {
    const { course_id, title, video_url, pdf_url } = req.body;

    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can create lessons' });
        }

        if (!course_id || !title) {
            return res.status(400).json({ message: 'Course ID and title are required' });
        }

        const [courses] = await db.query('SELECT * FROM Courses WHERE id = ? AND teacher_id = ?', [course_id, req.user.id]);
        if (courses.length === 0) {
            return res.status(403).json({ message: 'Course not found or you are not the owner' });
        }

        const [result] = await db.query(
            'INSERT INTO Lessons (course_id, title, video_url, pdf_url) VALUES (?, ?, ?, ?)',
            [course_id, title, video_url || null, pdf_url || null]
        );

        res.status(201).json({
            id: result.insertId,
            course_id,
            title,
            video_url,
            pdf_url
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getLessons,
    createLesson,
};
