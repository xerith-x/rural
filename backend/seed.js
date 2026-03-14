const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seedData() {
    try {
        console.log("Seeding data...");

        const salt = await bcrypt.genSalt(10);
        const teacherHash = await bcrypt.hash('password123', salt);
        const studentHash = await bcrypt.hash('password123', salt);

        const [existingTeacher] = await db.query("SELECT id FROM Users WHERE email = 'teacher@ruraledu.app'");
        let teacherId;
        if (existingTeacher.length === 0) {
            const [t] = await db.query(
                "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, 'teacher')",
                ['Demo Teacher', 'teacher@ruraledu.app', teacherHash]
            );
            teacherId = t.insertId;
            console.log("Teacher created with ID:", teacherId);
        } else {
            teacherId = existingTeacher[0].id;
            console.log("Teacher already exists with ID:", teacherId);
        }

        const [existingStudent] = await db.query("SELECT id FROM Users WHERE email = 'student@ruraledu.app'");
        if (existingStudent.length === 0) {
            await db.query(
                "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, 'student')",
                ['Demo Student', 'student@ruraledu.app', studentHash]
            );
            console.log("Student created.");
        } else {
            console.log("Student already exists.");
        }

        const courses = [
            { title: "Basic Computer Skills", subject: "Digital Literacy", description: "Keyboard, mouse, files, and basic software operations." },
            { title: "English Communication", subject: "English", description: "Reading, writing, and speaking skills for everyday use." },
            { title: "Digital Mathematics", subject: "Mathematics", description: "Arithmetic, algebra, and geometry with interactive lessons." },
            { title: "Environmental Science", subject: "Science", description: "Explore ecosystems, climate, and conservation locally." }
        ];

        for (const c of courses) {
            const [existing] = await db.query("SELECT id FROM Courses WHERE title = ?", [c.title]);
            if (existing.length === 0) {
                const [insertedCourse] = await db.query(
                    "INSERT INTO Courses (title, subject, description, teacher_id) VALUES (?, ?, ?, ?)",
                    [c.title, c.subject, c.description, teacherId]
                );
                const courseId = insertedCourse.insertId;
                console.log("Course created:", c.title, "ID:", courseId);

                const lessonTitles = [
                    `Introduction to ${c.title}`,
                    `${c.title} - Fundamentals`,
                    `${c.title} - Practice Session`
                ];

                for (const lt of lessonTitles) {
                    const [insertedLesson] = await db.query(
                        "INSERT INTO Lessons (course_id, title, video_url) VALUES (?, ?, ?)",
                        [courseId, lt, "https://www.w3schools.com/html/mov_bbb.mp4"]
                    );
                    const lessonId = insertedLesson.insertId;

                    await db.query(
                        "INSERT INTO Quizzes (lesson_id, question, options, correct_answer) VALUES (?, ?, ?, ?)",
                        [lessonId, `What is the main focus of ${lt}?`, JSON.stringify([c.subject, "Nothing", "Everything", "Other"]), c.subject]
                    );

                    await db.query(
                        "INSERT INTO Quizzes (lesson_id, question, options, correct_answer) VALUES (?, ?, ?, ?)",
                        [lessonId, `Which subject does ${c.title} belong to?`, JSON.stringify(["Art", c.subject, "Sports", "Music"]), c.subject]
                    );
                }
                console.log("Lessons and quizzes created for:", c.title);
            } else {
                console.log("Course already exists:", c.title);
            }
        }

        console.log("Database seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seedData();
