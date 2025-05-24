// src/pages/MyProfile.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>My Profile</h1>
      <p>This is your profile page.</p>
    </div>
  );
}
