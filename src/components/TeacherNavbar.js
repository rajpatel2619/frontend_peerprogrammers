// src/components/TeacherNavbar.js
import { useNavigate } from 'react-router-dom';

export default function TeacherNavbar({ onLogout, onSwitch }) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        padding: '10px',
        background: '#e0f7fa', // light cyan background for teacher
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/teacher-dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/teacher/teaching-courses')}>Courses</button> {/* Added Courses */}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onSwitch}>Switch to Student</button>
        <button onClick={() => navigate('/profile')}>My Profile</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
