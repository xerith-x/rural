const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  });

  return parseResponse(response);
};

export const loginUser = async ({ email, password }) =>
  request('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

export const registerUser = async ({ name, email, password, role, school }) =>
  request('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role, school }),
  });

export const fetchCourses = async () => request('/courses');

export const fetchLessons = async (courseId) => request(`/lessons/${courseId}`);

export const fetchStudentProgress = async (studentId, token) =>
  request(`/progress/${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
