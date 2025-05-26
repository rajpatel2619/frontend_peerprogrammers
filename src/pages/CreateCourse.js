import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API;

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("");
  const [creatorIds, setCreatorIds] = useState([""]);
  const [createdBy, setCreatedBy] = useState("Unknown");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setCreatedBy(userObj?.name || "Unknown");
      setToken(userObj?.token || "");
    }
  }, []);

  const handleCreatorChange = (index, value) => {
    const updatedIds = [...creatorIds];
    updatedIds[index] = value;
    setCreatorIds(updatedIds);
  };

  const addMoreCreator = () => {
    setCreatorIds([...creatorIds, ""]);
  };

  const handleSubmit = async () => {
    if (!title || !description || !mode || creatorIds.some(id => id.trim() === "")) {
      alert("Please fill in all fields and ensure all Creator IDs are provided.");
      return;
    }

    let parsedCreatorIds;
    try {
      parsedCreatorIds = creatorIds.map((id) => {
        const parsed = parseInt(id);
        if (isNaN(parsed)) throw new Error(`Invalid creator ID: "${id}"`);
        return parsed;
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    const payload = {
      title,
      description,
      mode,
      creator_ids: parsedCreatorIds
    };


    try {
      fetch(`${API}/courses`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(errorText => {
        throw new Error(errorText || "Failed to create course");
      });
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Navigate to fill-course-detail and pass data as state
    navigate("/fill-course-detail", { state: { course: data.course } });
  })
  .catch(error => {
    console.error("Error:", error.message);
    // Optional: show error to user
  });

    } catch (error) {
      console.error("Error creating course:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <div>
        <h1>Create Course</h1>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            rows={4}
          />
        </div>

        {/* Mode */}
        <div>
          <label>Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">Select course mode</option>
            <option value="Live">Live</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Recorded">Recorded</option>
          </select>
        </div>

        {/* Creator IDs */}
        <div>
          <label>Creator IDs</label>
          <div>
            {creatorIds.map((id, index) => (
              <input
                key={index}
                value={id}
                onChange={(e) => handleCreatorChange(index, e.target.value)}
                placeholder={`Enter creator ID #${index + 1}`}
              />
            ))}
          </div>
          <button onClick={addMoreCreator} type="button">
            + Add More
          </button>
        </div>

        

        {/* Submit Button */}
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
