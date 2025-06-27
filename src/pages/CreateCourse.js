import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import CreateCourseFirstTab from "./teacher/courseComponents/CreateCourseFirstTab";
import CreateCourseSecondTab from "./teacher/courseComponents/CreateCourseSecondTab";

const API = process.env.REACT_APP_API;

function CreateCourse() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Individual");
  const [mode, setMode] = useState("online_live");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domains, setDomains] = useState([]);

  const [syllabusFile, setSyllabusFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  const [creatorIds, setCreatorIds] = useState([]);

  // Organisation-specific fields
  const [orgName, setOrgName] = useState("");
  const [pocName, setPocName] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [pocContact, setPocContact] = useState("");

  // Mode-specific fields
  const [dailyMeetingLink, setDailyMeetingLink] = useState("");
  const [lectureLink, setLectureLink] = useState("");
  const [venueAddress, setVenueAddress] = useState("");

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
      !price ||
      domains.length === 0 ||
      creatorIds.some((id) => id.trim() === "")
    ) {
      alert("Please fill all required fields and ensure creator IDs are valid.");
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
    formData.append("price", price);
    formData.append("creator_ids", JSON.stringify(parsedCreatorIds));
    formData.append("domains", JSON.stringify(domains));
    formData.append("description", description);
    formData.append("whatsapp_link", whatsappLink);

    if (syllabusFile) {
      formData.append("syllabus", syllabusFile);
    }

    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    }

    // Organisation-specific fields
    if (category === "Organisation") {
      formData.append("org_name", orgName);
      formData.append("poc_name", pocName);
      formData.append("poc_email", pocEmail);
      formData.append("poc_contact", pocContact);
    }

    // Mode-specific fields
    if (mode === "online_live") {
      formData.append("daily_meeting_link", dailyMeetingLink);
    } else if (mode === "online_recorded") {
      formData.append("lecture_link", lectureLink);
    } else if (mode === "offline") {
      formData.append("venue_address", venueAddress);
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
            category={category}
            setCategory={setCategory}
            mode={mode}
            setMode={setMode}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            price={price}
            setPrice={setPrice}
            onNext={() => setStep(2)}
          />
        ) : (
          <CreateCourseSecondTab
            syllabusFile={syllabusFile}
            setSyllabusFile={setSyllabusFile}
            coverPhoto={coverPhoto}
            setCoverPhoto={setCoverPhoto}
            description={description}
            setDescription={setDescription}
            whatsappLink={whatsappLink}
            setWhatsappLink={setWhatsappLink}
            creatorIds={creatorIds}
            handleCreatorChange={handleCreatorChange}
            addMoreCreator={addMoreCreator}
            setCreatorIds={setCreatorIds}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
            category={category}
            domains={domains}
            setDomains={setDomains}
            // Organisation-specific
            orgName={orgName}
            setOrgName={setOrgName}
            pocName={pocName}
            setPocName={setPocName}
            pocEmail={pocEmail}
            setPocEmail={setPocEmail}
            pocContact={pocContact}
            setPocContact={setPocContact}
            // Mode-specific
            mode={mode}
            dailyMeetingLink={dailyMeetingLink}
            setDailyMeetingLink={setDailyMeetingLink}
            lectureLink={lectureLink}
            setLectureLink={setLectureLink}
            venueAddress={venueAddress}
            setVenueAddress={setVenueAddress}
          />
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
