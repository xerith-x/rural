import { useMemo } from 'react';
import { useCourses } from '../hooks/useCourses';

const Downloads = () => {
  const { lessons, courses, loading, error } = useCourses();

  const courseMap = useMemo(
    () => new Map(courses.map((course) => [course.id, course])),
    [courses]
  );

  const downloadableLessons = useMemo(
    () => lessons.filter((lesson) => lesson.pdf_url || lesson.video_url),
    [lessons]
  );

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Downloads</p>
          <h1>Lesson resources</h1>
          <p className="page-subtitle">
            Download PDFs or watch videos shared with your classes.
          </p>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <p>Loading resources...</p>
      ) : downloadableLessons.length ? (
        <div className="card-grid">
          {downloadableLessons.map((lesson) => {
            const course = courseMap.get(lesson.course_id);
            return (
              <article className="card" key={lesson.id}>
                <div className="card-header">
                  <div>
                    <h2>{lesson.title}</h2>
                    <p className="muted">{course?.title || 'Course'}</p>
                  </div>
                  <span className="badge">Resources</span>
                </div>
                <div className="pill-group">
                  {lesson.video_url && (
                    <a className="pill" href={lesson.video_url} target="_blank" rel="noreferrer">
                      Watch Video
                    </a>
                  )}
                  {lesson.pdf_url && (
                    <a className="pill" href={lesson.pdf_url} target="_blank" rel="noreferrer">
                      Download PDF
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="muted">No downloadable resources available yet.</p>
      )}
    </section>
  );
};

export default Downloads;
