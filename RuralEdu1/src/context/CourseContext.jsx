import { useCallback, useEffect, useMemo, useState } from 'react';
import CourseContext from './courseContext';
import { fetchCourses, fetchLessons } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const CourseProvider = ({ children }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [lessonsByCourse, setLessonsByCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const courseList = await fetchCourses();
      setCourses(courseList);

      const lessonEntries = await Promise.all(
        courseList.map(async (course) => {
          const lessons = await fetchLessons(course.id);
          return [course.id, lessons];
        })
      );

      setLessonsByCourse(Object.fromEntries(lessonEntries));
    } catch (err) {
      setError(err?.message || 'Unable to load courses.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      setLessonsByCourse({});
      setError('');
      setLoading(false);
      return;
    }

    loadCourses();
  }, [user, loadCourses]);

  const lessons = useMemo(
    () => Object.values(lessonsByCourse).flat(),
    [lessonsByCourse]
  );

  const value = useMemo(
    () => ({
      courses,
      lessonsByCourse,
      lessons,
      loading,
      error,
      refresh: loadCourses,
    }),
    [courses, lessonsByCourse, lessons, loading, error, loadCourses]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
