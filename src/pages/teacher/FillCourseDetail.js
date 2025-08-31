import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API;

function FillCourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [formData, setFormData] = useState({
    syllabus_summary: "",
    syllabus_path: "",
    venue: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    duration_in_hours: "",
    title: course?.title || "",
    description: course?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/courses/${course.id}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        let data = await response.json();
        console.log("Course details updated successfully:", data);
        navigate("/courses");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.detail);
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  if (!course) {
    return (
      <div>
        <h1>No Course Data</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "60vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #eee", padding: 24 }}>
        <h2>Course Info</h2>
        <div><strong>Title:</strong> {course.title}</div>
        <div><strong>Description:</strong> {course.description}</div>
        <div><strong>Mode:</strong> {course.mode}</div>
        <div><strong>Creator IDs:</strong> {Array.isArray(course.creator_ids) ? course.creator_ids.join(", ") : course.creator_ids}</div>
      </div>

      <div style={{ width: "70%", padding: 24 }}>
        <h2>Fill Course Details</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label>Syllabus Summary</label>
          <input
            type="text"
            name="syllabus_summary"
            placeholder="Syllabus Summary"
            value={formData.syllabus_summary}
            onChange={handleChange}
            required
          />
          <label>Syllabus Path (URL)</label>
          <input
            type="text"
            name="syllabus_path"
            placeholder="Syllabus Path (URL)"
            value={formData.syllabus_path}
            onChange={handleChange}
            required
          />
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
          <label>Duration in Hours</label>
          <input
            type="number"
            name="duration_in_hours"
            placeholder="Duration in Hours"
            value={formData.duration_in_hours}
            onChange={handleChange}
            required
          />
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FillCourseDetail;
