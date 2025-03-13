import { AuthProvider } from '@/context/AuthProvider';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useSession } from './hooks/useSession';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainComponent />
      </Router>
    </AuthProvider>
  );
}

const MainComponent = () => {
  const { user, logout } = useSession();

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
              <p>Welcome to the home page.</p>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};
