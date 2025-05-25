import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    async function fetchCourse() {
      setLoading(true);
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>No course found for ID: {courseId}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration} hours</p>
      {/* Add more course details as needed */}
    </div>
  );
}

export default CourseDetails;
