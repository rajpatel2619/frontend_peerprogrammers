import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
const API = process.env.REACT_APP_API;

function CreateCourse() {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [courseType, setCourseType] = useState("");
  const [syllabusFile, setSyllabusFile] = useState(null);

  const [creatorIds, setCreatorIds] = useState([""]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
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
    if (!title || !category || !courseType || creatorIds.some(id => id.trim() === "")) {
      alert("Please fill all fields and ensure Creator IDs are valid.");
      return;
    }

    const parsedCreatorIds = creatorIds.map(id => parseInt(id));
    if (parsedCreatorIds.some(isNaN)) {
      alert("One or more creator IDs are not valid numbers.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("mode", courseType);
    formData.append("creator_ids", JSON.stringify(parsedCreatorIds));
    if (syllabusFile) formData.append("syllabus", syllabusFile);

    try {
      const res = await fetch(`${API}/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create course");
      }

      const data = await res.json();
      navigate("/fill-course-detail", { state: { course: data.course } });
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onNavigate={(path) => navigate(path)} />
      <div className="flex-1 p-10 w-full space-y-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold">Create New Course</h1>

        {/* Step 1: General Info */}
        {step === 1 && (
          <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
            <div>
              <label className="block mb-1 font-medium">Course Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Course Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              >
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Course Type</label>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              >
                <option value="">Select type</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: More Info */}
        {step === 2 && (
          <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
            <div>
              <label className="block mb-1 font-medium">Upload Syllabus PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSyllabusFile(e.target.files[0])}
                className="w-full dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Add Co-Mentors (User IDs)</label>
              {creatorIds.map((id, index) => (
                <input
                  key={index}
                  type="text"
                  value={id}
                  onChange={(e) => handleCreatorChange(index, e.target.value)}
                  placeholder={`Co-Mentor ${index + 1}`}
                  className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-700"
                />
              ))}
              <button
                onClick={addMoreCreator}
                className="text-blue-600 hover:underline text-sm mt-1"
              >
                + Add another
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
