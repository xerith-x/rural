import { useCallback, useEffect, useState } from 'react';
import { fetchStudentProgress } from '../services/api';

export const useStudentProgress = ({ studentId, token, enabled = true }) => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProgress = useCallback(async () => {
    if (!studentId || !token) {
      setProgress([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchStudentProgress(studentId, token);
      setProgress(data);
    } catch (err) {
      setError(err?.message || 'Unable to load progress.');
    } finally {
      setLoading(false);
    }
  }, [studentId, token]);

  useEffect(() => {
    if (!enabled) {
      setProgress([]);
      setError('');
      setLoading(false);
      return;
    }

    loadProgress();
  }, [enabled, loadProgress]);

  return { progress, loading, error, refresh: loadProgress };
};
