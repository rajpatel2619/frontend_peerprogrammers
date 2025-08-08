import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeacherSidebar from "./components/TeacherSidebar";
import Select from "react-select";
import { 
  FiBook, 
  FiCalendar, 
  FiFileText, 
  FiDollarSign, 
  FiUsers, 
  FiTag,
  FiLink,
  FiImage,
  FiFile,
  FiPlus,
  FiEdit,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
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
  const [moduleCount, setModuleCount] = useState(0);
  const [modules, setModules] = useState([]);

  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

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
          console.log(data);
          setCourseData(data.course);
        } else {
          console.error("Failed to load course:", data.detail);
        }
      })
      .catch((err) => console.error("Failed to fetch course detail:", err));
  }, [courseId, userId]);

  // Apply course data after options are available
  useEffect(() => {
    if (
      !courseData ||
      coMentorOptions.length === 0 ||
      domainOptions.length === 0
    )
      return;

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
      const coMentorIds = courseData.co_mentors
        .split(",")
        .map((id) => parseInt(id));
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
        formData.append("modules", JSON.stringify(modules)); // For POST mode
        // Or add `modules` to the payload object in update mode

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          {courseId ? (
            <>
              <FiEdit className="text-purple-500" size={24} />
              Edit Course
            </>
          ) : (
            <>
              
              Create New Course
            </>
          )}
        </h1>

        <form className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiBook className="text-blue-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Title*
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Advanced Web Development"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Mode*
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select mode</option>
                  <option value="recorded">Recorded</option>
                  <option value="live">Live</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description*
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what students will learn in this course"
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiCalendar className="text-orange-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Schedule
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date*
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date*
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Course Structure */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiFileText className="text-green-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Course Structure
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Modules
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={moduleCount || ""}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      setModuleCount(count);
                      setModules(
                        Array(count)
                          .fill("")
                          .map((_, i) => modules[i] || "")
                      );
                    }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of modules"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lecture Link
                  </label>
                  <input
                    type="text"
                    value={lectureLink}
                    onChange={(e) => setLectureLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((mod, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Module {index + 1} Title
                    </label>
                    <input
                      type="text"
                      value={modules[index]}
                      onChange={(e) => {
                        const updated = [...modules];
                        updated[index] = e.target.value;
                        setModules(updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Module ${index + 1} title`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <FiImage className="text-pink-500" size={20} />
                <FiFile className="text-yellow-500 -ml-2" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Photo
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverPhoto(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Syllabus (PDF)
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSyllabusFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Enrollment */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiDollarSign className="text-emerald-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pricing & Enrollment
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (₹)*
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2999"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  value={basicSeats}
                  onChange={(e) => setBasicSeats(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp Link
                </label>
                <input
                  type="text"
                  value={basicWhatsapp}
                  onChange={(e) => setBasicWhatsapp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>
            </div>
          </div>

          {/* Team & Categories */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiUsers className="text-indigo-500" size={20} />
              <FiTag className="text-blue-400 -ml-1" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Team & Categories
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Co-Mentors
                </label>
                <Select
                  isMulti
                  options={coMentorOptions}
                  value={selectedCoMentors}
                  onChange={setSelectedCoMentors}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select co-mentors..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Domains
                </label>
                <Select
                  isMulti
                  options={domainOptions}
                  value={selectedDomains}
                  onChange={setSelectedDomains}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select domains..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {courseId ? (
                <>
                  <FiEdit size={18} />
                  Update Course
                </>
              ) : (
                <>
                  <FiPlus size={18} />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

