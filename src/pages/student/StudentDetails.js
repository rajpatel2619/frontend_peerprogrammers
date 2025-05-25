import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

export default function StudentDetails() {
  const { studentId } = useParams(); // 1. Get studentId from URL
  const navigate = useNavigate();    // 2. For redirecting to 404

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${studentId}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error('Error fetching student:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) return <p>Loading student data...</p>;
  if (notFound) return <PageNotFound />;

  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
    </div>
  );
}
