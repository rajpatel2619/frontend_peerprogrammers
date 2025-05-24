// src/components/StudentNavbar.js
import { useNavigate } from 'react-router-dom';

export default function StudentNavbar({ onLogout, onSwitch }) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        padding: '10px',
        background: '#fff3e0', // light orange background for student
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <button onClick={() => navigate('/student-dashboard')}>Dashboard</button>
      </div>

      <div>
        <button onClick={onSwitch}>Switch to Teacher</button>
        <button onClick={() => navigate('/profile')}>My Profile</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
