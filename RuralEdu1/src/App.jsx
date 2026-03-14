import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import { CourseProvider } from './context/CourseProvider';
import { useAuth } from './hooks/useAuth';
import Classes from './pages/Classes';
import Dashboard from './pages/Dashboard';
import Downloads from './pages/Downloads';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">RE</div>
          <div>
            <p className="brand-title">RuralEdu</p>
            <p className="brand-subtitle">Connected learning for every village</p>
          </div>
        </div>
        <nav className="main-nav">
          {isAuthenticated && (
            <div className="nav-links">
              <NavLink to="/" end>
                Overview
              </NavLink>
              <NavLink to="/classes">Classes</NavLink>
              <NavLink to="/progress">My Progress</NavLink>
              <NavLink to="/downloads">Downloads</NavLink>
            </div>
          )}
          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <span className="user-chip">
                  {user?.name || 'Student'} · {user?.role || 'student'}
                </span>
                <button className="button secondary" type="button" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink className="button secondary" to="/login">
                  Log in
                </NavLink>
                <NavLink className="button primary" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="app-main">
        <CourseProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute>
                  <Classes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/downloads"
              element={
                <ProtectedRoute>
                  <Downloads />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
            />
          </Routes>
        </CourseProvider>
      </main>
    </div>
  );
}

export default App;
