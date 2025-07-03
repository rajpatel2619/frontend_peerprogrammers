import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API = process.env.REACT_APP_API;


function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      try {
        const response = await fetch(
          `${API}/all-courses`
        );
        const data = await response.json();

        const allCourses = data.courses || [];

        // Find the course by id
        const foundCourse = allCourses.find(
          (c) => String(c.id) === String(courseId)
        );

        setCourse(foundCourse || null);
      } catch (error) {
        console.error("Failed to load course", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!course) return <p className="p-4">No course found for ID: {courseId}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={course.cover_photo || "https://via.placeholder.com/600x300"}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Mode: {course.mode}
        </span>
      </div>

      <p className="mb-2">
        <strong>Start Date:</strong> {course.start_date}
      </p>
      <p className="mb-2">
        <strong>End Date:</strong> {course.end_date}
      </p>

      {course.domains?.length > 0 && (
        <p className="mb-2">
          <strong>Domains:</strong> {course.domains.join(", ")}
        </p>
      )}

      {course.syllabus_link && (
        <p className="mb-2">
          <a
            href={course.syllabus_link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Syllabus
          </a>
        </p>
      )}

      {course.mode === "recorded" && course.lecture_link && (
        <p className="mb-2">
          <a
            href={course.lecture_link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Watch Recorded Lectures
          </a>
        </p>
      )}

      {course.mode === "live" && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">Plans:</h2>
          <ul className="space-y-2">
            {["basic_plan", "premium_plan", "ultra_plan"].map((planKey) => {
              const plan = course[planKey];
              if (plan?.price) {
                return (
                  <li
                    key={planKey}
                    className="border p-4 rounded-md shadow-sm"
                  >
                    <p className="font-bold capitalize">{planKey.replace("_", " ")}</p>
                    <p>Price: ₹{plan.price}</p>
                    <p>Seats: {plan.seats}</p>
                    {plan.whatsapp && (
                      <a
                        href={plan.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Join WhatsApp Group
                      </a>
                    )}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default CourseDetails;
