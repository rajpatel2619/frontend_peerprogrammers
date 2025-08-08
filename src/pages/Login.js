import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const REACT_APP_API = process.env.REACT_APP_API;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false); // Still there if you want to show the checkbox
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/student/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${REACT_APP_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid email or password');
      }

      // ✅ Always save in both storages
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('token', data.access_token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      navigate('/student/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-white dark:bg-black">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6 text-center">
          Login
        </h2>

        {error && (
          <div
            role="alert"
            className="mb-6 p-4 border border-red-400 bg-red-100 text-red-700 rounded"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              placeholder="Enter your password"
            />
          </label>

          <label className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="form-checkbox rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            Remember Me
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm space-y-2">
          <Link
            to="/forgot-password"
            className="block text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </Link>
          <div>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400 font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
