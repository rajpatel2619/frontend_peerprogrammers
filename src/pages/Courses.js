import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("user");

        console.log(token)

        if (!token) throw new Error("No token found.");

        const response = await fetch(`${API}/courses/details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch course details");
        }

        const data = await response.json();
        setCourses(data.courses);
        console.log(data)
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div>
          <h2>Course Details</h2>
          {courses.length === 0 ? (
            <p>No courses found.</p>
            ) : (
            <ol>
                {courses.map((course) => (
                <li key={course.id} style={{ marginBottom: "1rem" }}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                    >
                    View Details
                    </button>
                </li>
                ))}
            </ol>
            )}

        </div>
      )}
    </div>
  );
}

export default Courses;
