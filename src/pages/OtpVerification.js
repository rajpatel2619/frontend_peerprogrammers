import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      // Add your API call here for OTP verification
      // Example:
      // const res = await fetch(`${API}/verify-otp`, { ... })

      // Dummy success redirect
      navigate('/student-dashboard');
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">OTP Verification</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white border-gray-600"
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
