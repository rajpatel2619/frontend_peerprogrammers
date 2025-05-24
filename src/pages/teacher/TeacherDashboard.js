import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TeachingCourses from './TeachingCourses';

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
    <div style={{ padding: '20px' }}>
      <h1>Teacher Dashboard</h1>


    </div>
  );
}
