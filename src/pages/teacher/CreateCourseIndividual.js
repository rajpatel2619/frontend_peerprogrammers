import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Sidebar from "./components/TeacherSidebar";

const API = process.env.REACT_APP_API;

export default function CreateCourseIndividual() {
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("live");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domains, setDomains] = useState([]);
  const [domainOptions, setDomainOptions] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [dailyMeetingLink, setDailyMeetingLink] = useState("");
  const [lectureLink, setLectureLink] = useState("");

  const [basicSeats, setBasicSeats] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicWhatsapp, setBasicWhatsapp] = useState("");
  const [premiumSeats, setPremiumSeats] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [premiumWhatsapp, setPremiumWhatsapp] = useState("");
  const [ultraSeats, setUltraSeats] = useState("");
  const [ultraPrice, setUltraPrice] = useState("");
  const [ultraWhatsapp, setUltraWhatsapp] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [selectedCoMentors, setSelectedCoMentors] = useState([]);

  const navigate = useNavigate();

  // Fetch course if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const token = localStorage.getItem("token") || sessionStorage.getItem("user");
      fetch(`${API}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title || "");
          setMode(data.mode || "live");
          setStartDate(data.start_date || "");
          setEndDate(data.end_date || "");
          setDomains(data.domains || []);
          setDescription(data.description || "");
          setSyllabusFile(data.syllabusFile || "");
          setCoverPhoto(data.coverPhoto || "");

          if (data.mode === "recorded") {
            setPrice(data.price || "");
            setLectureLink(data.lecture_link || "");
          } else {
            setDailyMeetingLink(data.daily_meeting_link || "");
            setBasicSeats(data.basic_plan?.seats || "");
            setBasicPrice(data.basic_plan?.price || "");
            setBasicWhatsapp(data.basic_plan?.whatsapp || "");
            setPremiumSeats(data.premium_plan?.seats || "");
            setPremiumPrice(data.premium_plan?.price || "");
            setPremiumWhatsapp(data.premium_plan?.whatsapp || "");
            setUltraSeats(data.ultra_plan?.seats || "");
            setUltraPrice(data.ultra_plan?.price || "");
            setUltraWhatsapp(data.ultra_plan?.whatsapp || "");
          }

          // Load co-mentors from creator_ids
          if (data.creator_ids?.length && allUsers.length) {
            const matched = allUsers.filter((u) =>
              data.creator_ids.includes(u.value)
            );
            setSelectedCoMentors(matched);
          }
        })
        .catch((err) => console.error("Failed to fetch course:", err));
    }
  }, [courseId, allUsers]);

  // Fetch domain options
  useEffect(() => {
    fetch(`${API}/all-domain-tags`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const formattedOptions = data.tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setDomainOptions(formattedOptions);
      })
      .catch((err) => console.error("Error loading domains", err));
  }, []);

  // Fetch all users for co-mentor options
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("user");

    fetch(`${API}/all_users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const formatted = data.users.map((user) => ({
          value: user.id,
          label: user.name + " (" + user.email + ")",
        }));
        setAllUsers(formatted);
      })
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  const handleDomainSelect = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setDomains(selectedValues);
  };

  const handleSubmit = async () => {
    const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    const userId = user?.id;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const parsedCreatorIds = selectedCoMentors.map((c) => c.value);

    const courseDetails = {
      userId,
      title,
      mode,
      start_date: startDate,
      end_date: endDate,
      domains,
      creator_ids: parsedCreatorIds,
      description,
      syllabusFile,
      coverPhoto,
      ...(mode === "recorded"
        ? { price, lecture_link: lectureLink }
        : {
          daily_meeting_link: dailyMeetingLink,
          basic_plan: {
            seats: basicSeats,
            price: basicPrice,
            whatsapp: basicWhatsapp,
          },
          premium_plan: {
            seats: premiumSeats,
            price: premiumPrice,
            whatsapp: premiumWhatsapp,
          },
          ultra_plan: {
            seats: ultraSeats,
            price: ultraPrice,
            whatsapp: ultraWhatsapp,
          },
        }),
    };

    console.log(courseDetails)

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const url = isEditMode
        ? `${API}/update-course/${userId}/${courseId}`
        : `${API}/create-course`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseDetails),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save course");
      }

      const result = await res.json();
      console.log("Success:", result);
      navigate("/teacher/courses");
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onNavigate={(path) => navigate(path)} />
      <div className="flex-1 p-10 w-full space-y-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Course" : "Create New Course - For Individuals"}
        </h1>

        <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Course Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              placeholder="Enter course title"
            />
          </div>

          {/* Mode */}
          <div>
            <label className="block mb-1 font-medium">Mode</label>
            <select
              disabled={isEditMode}
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700"
            >
              <option value="live">Live</option>
              <option value="recorded">Recorded</option>
            </select>
          </div>

          {/* Pricing Section */}
          {mode === "recorded" ? (
            <>
              <div>
                <label className="block mb-1 font-medium">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Lecture Link</label>
                <input
                  type="url"
                  value={lectureLink}
                  onChange={(e) => setLectureLink(e.target.value)}
                  className="w-full px-4 py-2 rounded border dark:bg-gray-700"
                />
              </div>
            </>
          ) : (
            <>
              {/* Live Plan Details */}
              <div>
                <label className="block mb-2 font-bold text-lg">Pricing Details</label>
                <div className="space-y-4 border rounded p-4 dark:border-gray-700">
                  {/* Basic */}
                  <div>
                    <label className="block mb-1 font-medium">Basic Plan</label>
                    <div className="flex gap-4 mb-2">
                      <input type="number" value={basicSeats} onChange={(e) => setBasicSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={basicPrice} onChange={(e) => setBasicPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={basicWhatsapp} onChange={(e) => setBasicWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>

                  {/* Premium */}
                  <div>
                    <label className="block mb-1 font-medium">Premium Plan</label>
                    <div className="flex gap-4 mb-2">
                      <input type="number" value={premiumSeats} onChange={(e) => setPremiumSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={premiumWhatsapp} onChange={(e) => setPremiumWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>

                  {/* Ultra */}
                  <div>
                    <label className="block mb-1 font-medium">Ultra Premium Plan</label>
                    <div className="flex gap-4">
                      <input type="number" value={ultraSeats} onChange={(e) => setUltraSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={ultraPrice} onChange={(e) => setUltraPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={ultraWhatsapp} onChange={(e) => setUltraWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Daily Meeting Link</label>
                <input type="url" value={dailyMeetingLink} onChange={(e) => setDailyMeetingLink(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
              </div>
            </>
          )}

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
            </div>
          </div>

          {/* Domains */}
          <div>
            <label className="block mb-1 font-medium">Domains</label>
            <Select
              isMulti
              value={domainOptions.filter((option) => domains.includes(option.value))}
              onChange={(selectedOptions) => {
                const values = selectedOptions.map((option) => option.value);
                setDomains(values);
              }}
              options={domainOptions}
              placeholder="Search and select domains"
              className="text-black"
            />
          </div>


          {/* Files */}
          <div>
            <label className="block mb-1 font-medium">Upload Syllabus PDF</label>
            <input type="file" accept="application/pdf" onChange={(e) => setSyllabusFile(e.target.files[0])} className="w-full dark:bg-gray-700" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Upload Cover Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} className="w-full dark:bg-gray-700" />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Course Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Enter course description" className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
          </div>

          {/* Co-Mentors */}
          <div>
            <label className="block mb-1 font-medium">Add Co-Mentors (Searchable)</label>
            <Select
              isMulti
              value={selectedCoMentors}
              onChange={setSelectedCoMentors}
              options={allUsers}
              placeholder="Search and select co-mentors"
              className="text-black"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              {isEditMode ? "Update Course" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
