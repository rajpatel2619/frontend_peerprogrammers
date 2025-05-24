// src/pages/TeachingCourses.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeachingCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8000/api/teacher/courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleEdit = (courseId) => {
    // navigate or open edit modal
    alert(`Edit course ${courseId}`);
  };

  const handlePublish = (courseId) => {
    // send publish request to backend
    alert(`Publish course ${courseId}`);
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <h2>Teaching Courses</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>
                  <button onClick={() => handleEdit(course.courseId)}>Edit</button>{" "}
                  <button onClick={() => handlePublish(course.courseId)}>Publish</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
