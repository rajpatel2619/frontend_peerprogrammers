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

  // Get user info
  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

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

  // Load existing course if editing
  useEffect(() => {
    if (!courseId) return;

    fetch(`${API}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const course = data.course;
        setTitle(course.title);
        setDescription(course.description || "");
        setStartDate(course.start_date || "");
        setEndDate(course.end_date || "");
        setMode(course.mode || "recorded");
        setLectureLink(course.lecture_link || "");
        setBasicSeats(course.seats || "");
        setBasicWhatsapp(course.chatLink || "");
        setPrice(course.price || "");

        if (course.co_mentors) {
          const coMentorIds = course.co_mentors.split(",").map((id) => parseInt(id));
          setSelectedCoMentors(
            coMentorOptions.filter((opt) => coMentorIds.includes(opt.value))
          );
        }

        if (course.domains) {
          const domainIds = course.domains.map((d) => d.id);
          setSelectedDomains(
            domainOptions.filter((opt) => domainIds.includes(opt.value))
          );
        }
      })
      .catch((err) => console.error("Failed to load course:", err));
  }, [courseId, token, coMentorOptions, domainOptions]);

  const handleSubmit = async () => {
    if (!userId) return alert("User not logged in");

    const creatorIds = selectedCoMentors.map((c) => c.value);
    const domainIds = selectedDomains.map((d) => d.value);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("mode", mode);
    formData.append("start_date", startDate || "");
    formData.append("end_date", endDate || "");
    formData.append("description", description || "");
    formData.append("syllabus_content", "");
    formData.append("price", price || 0);
    formData.append("is_published", true);
    formData.append("is_extra_registration", false);
    formData.append("seats", parseInt(basicSeats));
    formData.append("chat_link", basicWhatsapp);
    formData.append("co_mentor_ids", creatorIds.join(","));
    formData.append("creator_ids", creatorIds.join(","));
    formData.append("domain_ids", domainIds.join(","));
    if (coverPhoto) formData.append("cover_photo", coverPhoto);
    if (syllabusFile) formData.append("syllabus_file", syllabusFile);

    const url = courseId ? `${API}/update-course/${courseId}` : `${API}/create-course`;
    const method = courseId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Course submission failed");
      }

      const result = await res.json();
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



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";

// const API = process.env.REACT_APP_API; // Replace with your actual API base URL

// export default function CreateCoursePage() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [mode, setMode] = useState("recorded");
//   const [selectedCoMentors, setSelectedCoMentors] = useState([]);
//   const [coMentorOptions, setCoMentorOptions] = useState([]);
//   const [selectedDomains, setSelectedDomains] = useState([]);
//   const [domainOptions, setDomainOptions] = useState([]);
//   const [lectureLink, setLectureLink] = useState("");
//   const [coverPhoto, setCoverPhoto] = useState(null);
//   const [syllabusFile, setSyllabusFile] = useState(null);
//   const [price, setPrice] = useState("");
//   const [basicSeats, setBasicSeats] = useState("");
//   const [basicWhatsapp, setBasicWhatsapp] = useState("");

//   // Fetch co-mentors from backend
//   useEffect(() => {
//     fetch(`${API}/all_users`)
//       .then((res) => res.json())
//       .then((data) => {
//         const options = data.users.map((user) => ({
//           value: user.id,
//           label: user.name || user.username,
//         }));
//         setCoMentorOptions(options);
//       })
//       .catch((err) => console.error("Failed to fetch users:", err));
//   }, []);

//   // Fetch domains from backend
//   useEffect(() => {
//     fetch(`${API}/all-domain-tags`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         const options = data.tags.map((domain) => ({
//           value: domain.id,
//           label: domain.name,
//         }));
//         setDomainOptions(options);
//       })
//       .catch((err) => console.error("Failed to fetch domains:", err));
//   }, []);

//   const handleSubmit = async () => {
//     const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
//     const user = stored ? JSON.parse(stored) : null;
//     const userId = user?.id;
  
//     if (!userId) {
//       alert("User not logged in");
//       return;
//     }
  
//     try {
//       const parsedCreatorIds = selectedCoMentors.map((c) => c.value);
//       const domainIds = selectedDomains.map((d) => d.value);
  
//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("title", title);
//       formData.append("mode", mode);
//       formData.append("start_date", startDate || "");
//       formData.append("end_date", endDate || "");
//       formData.append("description", description || "");
//       formData.append("syllabus_content", ""); // or syllabusContent if you have it
//       formData.append("price", price || 0);
//       formData.append("is_published", true);
//       formData.append("is_extra_registration", false);
//       formData.append("seats", parseInt(basicSeats));
//       formData.append("chat_link", basicWhatsapp);
//       formData.append("co_mentor_ids", parsedCreatorIds.join(","));
//       formData.append("creator_ids", parsedCreatorIds.join(","));
//       formData.append("domain_ids", domainIds.join(","));
  
//       // ✅ File fields expected by backend
//       formData.append("cover_photo", coverPhoto);
//       formData.append("syllabus_file", syllabusFile);
  
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
//       const res = await fetch(`${API}/create-course`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
  
//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || "Course creation failed");
//       }
  
//       const result = await res.json();
//       console.log("Course created:", result);
//       navigate("/teacher/courses");
//     } catch (err) {
//       console.error("Submit error:", err.message);
//       alert("Error: " + err.message);
//     }
//   };
  

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-xl font-semibold mb-4">Create Course</h1>

//       <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full mb-2 p-2 border rounded">
//         <option value="recorded">Recorded</option>
//         <option value="live">Live</option>
//       </select>

//       <input type="text" placeholder="Lecture Link (for recorded)" value={lectureLink} onChange={(e) => setLectureLink(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <label className="block mb-1 font-medium">Cover Photo (upload):</label>
//       <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} className="w-full mb-2" />

//       <label className="block mb-1 font-medium">Syllabus (PDF upload):</label>
//       <input type="file" accept="application/pdf" onChange={(e) => setSyllabusFile(e.target.files[0])} className="w-full mb-2" />

//       <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <input type="number" placeholder="Seats" value={basicSeats} onChange={(e) => setBasicSeats(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <input type="text" placeholder="WhatsApp Link" value={basicWhatsapp} onChange={(e) => setBasicWhatsapp(e.target.value)} className="w-full mb-2 p-2 border rounded" />

//       <label className="block mb-1 font-medium">Select Co-Mentors:</label>
//       <Select
//         isMulti
//         options={coMentorOptions}
//         value={selectedCoMentors}
//         onChange={setSelectedCoMentors}
//         className="mb-4"
//         placeholder="Search and select co-mentors..."
//       />

//       <label className="block mb-1 font-medium">Select Domains:</label>
//       <Select
//         isMulti
//         options={domainOptions}
//         value={selectedDomains}
//         onChange={setSelectedDomains}
//         className="mb-4"
//         placeholder="Search and select domains..."
//       />

//       <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Submit Course
//       </button>
//     </div>
//   );
// }
