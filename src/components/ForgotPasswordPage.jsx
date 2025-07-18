// import React, { useState, useEffect } from 'react';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendOtp = () => {
//     if (!email) {
//       setMessage('Please enter your email.');
//       return;
//     }

//     setOtpSent(true);
//     setMessage('OTP sent to your email.');
//   };

//   const handleVerifyOtp = () => {
//     if (!otp) {
//       setMessage('Please enter the OTP.');
//       return;
//     }

//     if (otp === '123456') {
//       setMessage('OTP verified successfully!');
//     } else {
//       setMessage('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//         <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Forgot Password</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             disabled={otpSent}
//             className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {otpSent && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OTP</label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={e => setOtp(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}

//         <button
//           onClick={otpSent ? handleVerifyOtp : handleSendOtp}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
//         >
//           {otpSent ? 'Verify OTP' : 'Send OTP'}
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-blue-600 dark:text-blue-400">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const dummyEmail = 'test@example.com';
  const dummyOtp = '123456';

  const handleSendOtp = () => {
    if (email.trim().toLowerCase() !== dummyEmail) {
      setMessage('Email not recognized. Try test@example.com.');
      return;
    }

    setOtpSent(true);
    setMessage('OTP sent to your email.');
  };

  const handleVerifyOtp = () => {
    if (otp === dummyOtp) {
      setMessage('OTP verified successfully!');
      setTimeout(() => navigate('/reset-password'), 1000);
    } else {
      setMessage('Invalid OTP. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Forgot Password</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={otpSent}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {otpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          onClick={otpSent ? handleVerifyOtp : handleSendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </button>

        {message && (
          <p className="mt-4 text-center text-blue-600 dark:text-blue-400">{message}</p>
        )}
      </div>
    </div>
  );
}
