import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const API = process.env.REACT_APP_API;

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("recorded");
  const [selectedCoMentors, setSelectedCoMentors] = useState([]);
  const [coMentorOptions, setCoMentorOptions] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [domainOptions, setDomainOptions] = useState([]);
  const [lectureLink, setLectureLink] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [price, setPrice] = useState("");
  const [basicSeats, setBasicSeats] = useState("");
  const [basicWhatsapp, setBasicWhatsapp] = useState("");
  const [courseData, setCourseData] = useState(null);

  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Load user options
  useEffect(() => {
    fetch(`${API}/all_users`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.users.map((user) => ({
          value: user.id,
          label: user.name || user.username,
        }));
        setCoMentorOptions(options);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  // Load domain options
  useEffect(() => {
    fetch(`${API}/all-domain-tags`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setDomainOptions(options);
      })
      .catch((err) => console.error("Failed to fetch domains:", err));
  }, []);

  useEffect(() => {
    // Only fetch course detail in edit mode
    if (!courseId || !userId) return;
  
    fetch(`${API}/course-detail/${userId}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          setCourseData(data.course);
        } else {
          console.error("Failed to load course:", data.detail);
        }
      })
      .catch((err) => console.error("Failed to fetch course detail:", err));
  }, [courseId, userId]);
  


  // Apply course data after options are available
  useEffect(() => {
    if (!courseData || coMentorOptions.length === 0 || domainOptions.length === 0) return;

    setTitle(courseData.title || "");
    setDescription(courseData.description || "");
    setStartDate(courseData.start_date || "");
    setEndDate(courseData.end_date || "");
    setMode(courseData.mode || "recorded");
    setLectureLink(courseData.lecture_link || "");
    setBasicSeats(courseData.seats || "");
    setBasicWhatsapp(courseData.chatLink || "");
    setPrice(courseData.price || "");

    if (courseData.co_mentors) {
      const coMentorIds = courseData.co_mentors.split(",").map((id) => parseInt(id));
      setSelectedCoMentors(
        coMentorOptions.filter((opt) => coMentorIds.includes(opt.value))
      );
    }

    if (courseData.domains) {
      setSelectedDomains(
        domainOptions.filter((opt) => courseData.domain_ids.includes(opt.value))
      );
    }
  }, [courseData, coMentorOptions, domainOptions]);

  const handleSubmit = async () => {
    if (!userId) return alert("User not logged in");
  
    const creatorIds = selectedCoMentors.map((c) => c.value);
    const domainIds = selectedDomains.map((d) => d.value);
  
    const isEditMode = !!courseId;
  
    const url = isEditMode
      ? `${API}/update-course/${userId}/${courseId}`
      : `${API}/create-course`;
    const method = isEditMode ? "PUT" : "POST";
  
    try {
      let response;
  
      if (isEditMode) {
        // --- UPDATE Mode ---
        const payload = {
          userId,
          title,
          mode,
          start_date: startDate || null,
          end_date: endDate || null,
          description: description || "",
          lecture_link: lectureLink || null,
          price: parseFloat(price) || 0,
          seats: parseInt(basicSeats) || 0,
          chatLink: basicWhatsapp || "",
          co_mentors: creatorIds.filter((id) => id !== userId).join(","),
          creator_ids: creatorIds,
          domain_ids: domainIds,
          syllabus_link: "", // optionally update or keep as is
          syllausContent: "",
        };
  
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        if (coverPhoto) formData.append("cover_photo", coverPhoto);
        if (syllabusFile) formData.append("syllabus_file", syllabusFile);
  
        response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        // --- CREATE Mode ---
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("mode", mode);
        formData.append("start_date", startDate || "");
        formData.append("end_date", endDate || "");
        formData.append("description", description || "");
        formData.append("lecture_link", lectureLink || "");
        formData.append("syllabus_content", "");
        formData.append("price", price || 0);
        formData.append("is_published", true);
        formData.append("is_extra_registration", false);
        formData.append("seats", parseInt(basicSeats) || 0);
        formData.append("chat_link", basicWhatsapp);
        formData.append("co_mentor_ids", creatorIds.join(","));
        formData.append("creator_ids", creatorIds.join(","));
        formData.append("domain_ids", domainIds.join(","));
        formData.append("cover_photo", coverPhoto);
        formData.append("syllabus_file", syllabusFile);
  
        response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit course.");
      }
  
      const result = await response.json();
      console.log("Success:", result);
      navigate("/teacher/courses");
    } catch (err) {
      console.error("Submit error:", err.message);
      alert("Error: " + err.message);
    }
  };
  
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">{courseId ? "Edit" : "Create"} Course</h1>

      <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-2 p-2 border rounded" />

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-2 p-2 border rounded" />

      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />

      <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full mb-2 p-2 border rounded">
        <option value="recorded">Recorded</option>
        <option value="live">Live</option>
      </select>

      <input type="text" placeholder="Lecture Link" value={lectureLink} onChange={(e) => setLectureLink(e.target.value)} className="w-full mb-2 p-2 border rounded" />

      <label className="block mb-1 font-medium">Cover Photo:</label>
      <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} className="w-full mb-2" />

      <label className="block mb-1 font-medium">Syllabus File (PDF):</label>
      <input type="file" accept="application/pdf" onChange={(e) => setSyllabusFile(e.target.files[0])} className="w-full mb-2" />

      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input type="number" placeholder="Seats" value={basicSeats} onChange={(e) => setBasicSeats(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="WhatsApp Link" value={basicWhatsapp} onChange={(e) => setBasicWhatsapp(e.target.value)} className="w-full mb-2 p-2 border rounded" />

      <label className="block mb-1 font-medium">Select Co-Mentors:</label>
      <Select isMulti options={coMentorOptions} value={selectedCoMentors} onChange={setSelectedCoMentors} className="mb-4" />

      <label className="block mb-1 font-medium">Select Domains:</label>
      <Select isMulti options={domainOptions} value={selectedDomains} onChange={setSelectedDomains} className="mb-4" />

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {courseId ? "Update" : "Submit"} Course
      </button>
    </div>
  );
}
