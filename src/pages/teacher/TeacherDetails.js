import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

export default function TeacherDetails() {
  const { teacherId } = useParams(); // 1. Get teacherId from URL

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/teachers/${teacherId}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setTeacher(data);
      } catch (err) {
        console.error('Error fetching teacher:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  if (loading) return <p>Loading teacher data...</p>;
  if (notFound) return <PageNotFound />;

  return (
    <div>
      <h1>Teacher Details</h1>
      <p><strong>ID:</strong> {teacher.id}</p>
      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
    </div>
  );
}
