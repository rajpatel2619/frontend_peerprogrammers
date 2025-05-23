import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Your teacher dashboard content here */}
    </div>
  );
}
