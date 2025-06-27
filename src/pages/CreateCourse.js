import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import CreateCourseFirstTab from "./teacher/courseComponents/CreateCourseFirstTab";
import CreateCourseSecondTab from "./teacher/courseComponents/CreateCourseSecondTab";

const API = process.env.REACT_APP_API;

function CreateCourse() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [domains, setDomains] = useState([]);
  const [category, setCategory] = useState("");
  const [mode, setMode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    const updated = [...creatorIds];
    updated[index] = value;
    setCreatorIds(updated);
  };

  const addMoreCreator = () => {
    setCreatorIds([...creatorIds, ""]);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !category ||
      !mode ||
      !startDate ||
      !endDate ||
      domains.length === 0 ||
      creatorIds.some(id => id.trim() === "")
    ) {
      alert("Please fill all fields and ensure creator IDs are valid.");
      return;
    }

    const parsedCreatorIds = creatorIds.map((id) => parseInt(id));
    if (parsedCreatorIds.some(isNaN)) {
      alert("One or more creator IDs are not valid numbers.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("mode", mode);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("creator_ids", JSON.stringify(parsedCreatorIds));
    formData.append("domains", JSON.stringify(domains));

    if (syllabusFile) {
      formData.append("syllabus", syllabusFile);
    }

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

        {step === 1 ? (
          <CreateCourseFirstTab
            title={title}
            setTitle={setTitle}
            domains={domains}
            setDomains={setDomains}
            category={category}
            setCategory={setCategory}
            mode={mode}
            setMode={setMode}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onNext={() => setStep(2)}
          />
        ) : (
          <CreateCourseSecondTab
            syllabusFile={syllabusFile}
            setSyllabusFile={setSyllabusFile}
            creatorIds={creatorIds}
            handleCreatorChange={handleCreatorChange}
            addMoreCreator={addMoreCreator}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
            category={category}
          />
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
