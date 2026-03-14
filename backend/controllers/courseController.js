const db = require('../config/db');

const getCourses = async (req, res) => {
    try {
        const [courses] = await db.query(`
            SELECT c.id, c.title, c.subject, c.description, c.teacher_id, c.created_at, u.name as teacher_name 
            FROM Courses c
            LEFT JOIN Users u ON c.teacher_id = u.id
            ORDER BY c.id DESC
        `);
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createCourse = async (req, res) => {
    const { title, subject, description } = req.body;

    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can create courses' });
        }

        if (!title || !subject) {
            return res.status(400).json({ message: 'Title and subject are required' });
        }

        const [result] = await db.query(
            'INSERT INTO Courses (title, subject, description, teacher_id) VALUES (?, ?, ?, ?)',
            [title, subject, description || null, req.user.id]
        );

        res.status(201).json({
            id: result.insertId,
            title,
            subject,
            description,
            teacher_id: req.user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCourses,
    createCourse,
};
