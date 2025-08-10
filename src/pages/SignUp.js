import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;

export default function SignUp() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  // const [accountType, setAccountType] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/student-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }

    // if (!accountType) {
    //   setError("Please select an account type.");
    //   return;
    // }

    try {
      const response = await fetch(`${API}/temp-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          phone_number,
          password,
          repassword,
          // accountType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }

      sessionStorage.setItem("tempUserEmail", data.user.email);
      sessionStorage.setItem("tempUserId", data.userId);

      navigate('/otp-verification');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-white dark:bg-gray-900">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Our Community</h1>
          <p className="mt-4 text-blue-800 dark:text-gray-300">Start your learning journey today!</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Sign Up</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">First Name</label>
              <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Last Name</label>
              <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
              <input type="tel" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+91XXXXXXXXXX" required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Re-enter Password</label>
              <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Prefered Account</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              >
                <option >select preferred account</option>
                <option value="student">Student</option>
                <option value="teacher">Mentor</option>
              </select>
            </div> */}

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow">Sign Up</button>
          </form>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
