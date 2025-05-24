// src/components/Navbar.js
import { useNavigate, useLocation } from 'react-router-dom';
import TeacherNavbar from './TeacherNavbar';
import StudentNavbar from './StudentNavbar';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check for token in localStorage or sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Determine if user is currently in student section
  const isStudent = location.pathname.includes('/student');

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  // Toggle between teacher and student dashboards
  const handleToggle = () => {
    if (isStudent) {
      navigate('/teacher-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  // If no token, show minimal nav with only Home and Login buttons
  if (!token) {
    return (
      <nav
        style={{
          padding: '10px',
          background: '#f2f2f2',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <button onClick={() => navigate('/')}>Home</button>
        </div>
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>
    );
  }

  // Render the appropriate navbar with logout and toggle passed as props
  return isStudent ? (
    <StudentNavbar onLogout={handleLogout} onSwitch={handleToggle} />
  ) : (
    <TeacherNavbar onLogout={handleLogout} onSwitch={handleToggle} />
  );
}
