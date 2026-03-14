import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(formData);
      login(data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err?.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <p className="eyebrow">RuralEdu</p>
        <h1>Welcome back</h1>
        <p className="page-subtitle">
          Log in with your account to access courses, progress, and downloads.
        </p>
        {error && <div className="alert error">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              autoComplete="email"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Log in'}
          </button>
        </form>
        <p className="helper-text">
          Need an account? <Link to="/register">Create one</Link>.
        </p>
      </div>
    </section>
  );
};

export default Login;
