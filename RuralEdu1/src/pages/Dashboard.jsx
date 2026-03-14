import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCourses } from '../hooks/useCourses';
import { useStudentProgress } from '../hooks/useStudentProgress';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { courses, lessons, loading, error } = useCourses();
  const isStudent = user?.role === 'student';
  const { progress } = useStudentProgress({
    studentId: user?.id,
    token,
    enabled: isStudent,
  });

  const summary = useMemo(() => {
    const completed = progress.filter((item) => item.status === 'completed');
    return {
      courseCount: courses.length,
      lessonCount: lessons.length,
      completedCount: completed.length,
      latestLessons: lessons.slice(0, 4),
    };
  }, [courses.length, lessons, progress]);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back, {user?.name || 'Learner'}</h1>
          <p className="page-subtitle">
            Track classes, progress, and resources connected with your account.
          </p>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total classes</p>
          <h2>{summary.courseCount}</h2>
        </div>
        <div className="stat-card">
          <p>Total lessons</p>
          <h2>{summary.lessonCount}</h2>
        </div>
        <div className="stat-card">
          <p>Completed lessons</p>
          <h2>{summary.completedCount}</h2>
        </div>
      </div>

      <div className="content-grid">
        <div className="card">
          <h2>Latest lessons</h2>
          {loading ? (
            <p>Loading lessons...</p>
          ) : summary.latestLessons.length ? (
            <ul className="list">
              {summary.latestLessons.map((lesson) => (
                <li key={lesson.id}>
                  <div>
                    <p className="list-title">{lesson.title}</p>
                    <p className="muted">Course #{lesson.course_id}</p>
                  </div>
                  <span className="badge">Lesson</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No lessons available yet.</p>
          )}
        </div>
        <div className="card">
          <h2>Account overview</h2>
          <div className="stack">
            <div>
              <p className="label">Role</p>
              <p className="value">{user?.role || 'student'}</p>
            </div>
            <div>
              <p className="label">School</p>
              <p className="value">{user?.school || 'Not set'}</p>
            </div>
            <div>
              <p className="label">Access</p>
              <p className="value">
                {isStudent
                  ? 'Student access to progress tracking.'
                  : 'Teacher access to course creation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
