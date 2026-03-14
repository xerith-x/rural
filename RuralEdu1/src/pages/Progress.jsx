import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCourses } from '../hooks/useCourses';
import { useStudentProgress } from '../hooks/useStudentProgress';

const Progress = () => {
  const { user, token } = useAuth();
  const isStudent = user?.role === 'student';
  const { lessons, courses } = useCourses();
  const { progress, loading, error } = useStudentProgress({
    studentId: user?.id,
    token,
    enabled: isStudent,
  });

  const lessonMap = useMemo(
    () => new Map(lessons.map((lesson) => [lesson.id, lesson])),
    [lessons]
  );

  const courseMap = useMemo(
    () => new Map(courses.map((course) => [course.id, course])),
    [courses]
  );

  if (!isStudent) {
    return (
      <section className="page">
        <div className="page-header">
          <div>
            <p className="eyebrow">My Progress</p>
            <h1>Progress tracking is for students</h1>
            <p className="page-subtitle">
              Teachers can view progress data from the backend dashboard.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">My Progress</p>
          <h1>Lesson completion</h1>
          <p className="page-subtitle">
            See quiz scores and completion status for every lesson.
          </p>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <p>Loading progress...</p>
      ) : progress.length ? (
        <div className="card-grid">
          {progress.map((item) => {
            const lesson = lessonMap.get(item.lesson_id);
            const course = courseMap.get(item.course_id);
            return (
              <article className="card" key={item.id}>
                <div className="card-header">
                  <div>
                    <h2>{lesson?.title || `Lesson #${item.lesson_id}`}</h2>
                    <p className="muted">{course?.title || 'Course not found'}</p>
                  </div>
                  <span className={`badge ${item.status === 'completed' ? 'success' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <p className="muted">Score</p>
                <h2>{item.score ?? 0}%</h2>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="muted">No progress yet. Complete a quiz to see it here.</p>
      )}
    </section>
  );
};

export default Progress;
