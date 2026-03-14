import { useMemo } from 'react';
import { useCourses } from '../hooks/useCourses';

const Classes = () => {
  const { courses, lessonsByCourse, loading, error } = useCourses();

  const courseLessons = useMemo(
    () =>
      courses.map((course) => ({
        ...course,
        lessons: lessonsByCourse[course.id] || [],
      })),
    [courses, lessonsByCourse]
  );

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Classes</p>
          <h1>All classes</h1>
          <p className="page-subtitle">
            Browse every course and its lessons available in RuralEdu.
          </p>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <p>Loading classes...</p>
      ) : courseLessons.length ? (
        <div className="card-grid">
          {courseLessons.map((course) => (
            <article className="card" key={course.id}>
              <div className="card-header">
                <div>
                  <h2>{course.title}</h2>
                  <p className="muted">{course.subject}</p>
                </div>
                <span className="badge">{course.teacher_name || 'Teacher'}</span>
              </div>
              {course.description && <p>{course.description}</p>}
              <div className="divider" />
              {course.lessons.length ? (
                <ul className="list">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <div>
                        <p className="list-title">{lesson.title}</p>
                        <p className="muted">Lesson #{lesson.id}</p>
                      </div>
                      <div className="pill-group">
                        {lesson.video_url && (
                          <a className="pill" href={lesson.video_url} target="_blank" rel="noreferrer">
                            Video
                          </a>
                        )}
                        {lesson.pdf_url && (
                          <a className="pill" href={lesson.pdf_url} target="_blank" rel="noreferrer">
                            PDF
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No lessons added for this course yet.</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="muted">No courses found. Ask a teacher to add courses.</p>
      )}
    </section>
  );
};

export default Classes;
