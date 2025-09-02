import React, { useState, useEffect, useCallback } from "react";
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
  FiImage,
  FiFile,
  FiPlus,
  FiEdit,
  FiTrash2
} from "react-icons/fi";

const API = process.env.REACT_APP_API;

// A helper component for a better loading experience
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-4 text-gray-700 dark:text-gray-300">Loading Course Data...</p>
  </div>
);

// A helper component for displaying errors
const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-gray-900">
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative text-center">
      <strong className="font-bold block">An error occurred!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);


/**
 * Custom hook to encapsulate all logic for the Create/Edit Course Page.
 * This separates the component's logic from its presentation, making both easier to manage.
 */
const useCreateCoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditMode = !!courseId;

  // States
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
  const [modules, setModules] = useState([]);

  // Control states for loading and error handling
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch initial data (users, domains, and course details for edit mode)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!userId) {
        setError("User not authenticated.");
        setPageLoading(false);
        return;
      }
      
      setPageLoading(true);
      setError(null);

      try {
        // Use Promise.all to fetch non-dependent data concurrently. This is more efficient.
        const [usersResponse, domainsResponse] = await Promise.all([
          fetch(`${API}/all_users`),
          fetch(`${API}/all-domain-tags`),
        ]);

        if (!usersResponse.ok) throw new Error("Failed to fetch co-mentors.");
        if (!domainsResponse.ok) throw new Error("Failed to fetch domains.");

        const usersData = await usersResponse.json();
        const domainsData = await domainsResponse.json();

        const mentorOpts = usersData.users.map((u) => ({ value: u.id, label: u.name || u.username }));
        const domainOpts = domainsData.tags.map((tag) => ({ value: tag.id, label: tag.name }));
        
        setCoMentorOptions(mentorOpts);
        setDomainOptions(domainOpts);

        // If in edit mode, fetch the specific course data
        if (isEditMode) {
          const courseResponse = await fetch(`${API}/course-detail/${userId}/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!courseResponse.ok) throw new Error("Failed to fetch course details.");
          
          const courseData = await courseResponse.json();
          if (!courseData.success) throw new Error(courseData.detail || "Could not load course.");

          // *** ATOMIC UPDATE ***
          // This is the core fix for the race condition. We only populate the form
          // *after* all required data (course details, user options, domain options) is available.
          populateFormWithCourseData(courseData.course, mentorOpts, domainOpts);
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError(err.message);
      } finally {
        setPageLoading(false);
      }
    };

    loadInitialData();
  }, [courseId, userId, token, isEditMode]); // Dependencies for re-fetching if these change

  // Helper function to populate the form state from fetched course data
  const populateFormWithCourseData = (data, allMentors, allDomains) => {
    setTitle(data.title || "");
    setDescription(data.description || "");
    setStartDate(data.start_date?.split('T')[0] || "");
    setEndDate(data.end_date?.split('T')[0] || "");
    setMode(data.mode || "recorded");
    setLectureLink(data.lecture_link || "");
    setBasicSeats(data.seats || "");
    setBasicWhatsapp(data.chatLink || "");
    setPrice(data.price || "");
    
    if (data.co_mentors) {
      const coMentorIds = data.co_mentors.split(",").map(id => parseInt(id, 10));
      setSelectedCoMentors(allMentors.filter(opt => coMentorIds.includes(opt.value)));
    }
    
    if (data.domain_ids) {
      const domainIds = data.domain_ids.map(id => parseInt(id, 10));
      setSelectedDomains(allDomains.filter(opt => domainIds.includes(opt.value)));
    }
    
    if (data.syllabus_content) {
      try {
        const parsedModules = JSON.parse(data.syllabus_content);
        setModules(Array.isArray(parsedModules) ? parsedModules : []);
      } catch (e) {
        console.error("Error parsing syllabus_content JSON:", e);
        setModules([]);
      }
    } else {
      setModules([]);
    }
  };


  // Module management functions (memoized with useCallback for stability)
  const addModule = useCallback(() => setModules(prev => [...prev, { title: "", lessons: [] }]), []);
  const removeModule = useCallback((index) => setModules(prev => prev.filter((_, i) => i !== index)), []);
  const updateModuleTitle = useCallback((index, title) => {
    setModules(prev => prev.map((mod, i) => (i === index ? { ...mod, title } : mod)));
  }, []);
  const addLesson = useCallback((moduleIndex) => {
    setModules(prev => prev.map((mod, i) => (i === moduleIndex ? { ...mod, lessons: [...mod.lessons, { title: "", resources: [] }] } : mod)));
  }, []);
  const removeLesson = useCallback((moduleIndex, lessonIndex) => {
    setModules(prev => prev.map((mod, i) => (i === moduleIndex ? { ...mod, lessons: mod.lessons.filter((_, li) => li !== lessonIndex) } : mod)));
  }, []);
  const updateLessonTitle = useCallback((moduleIndex, lessonIndex, title) => {
    setModules(prev => prev.map((mod, i) => {
      if (i !== moduleIndex) return mod;
      const updatedLessons = mod.lessons.map((lesson, li) => (li === lessonIndex ? { ...lesson, title } : lesson));
      return { ...mod, lessons: updatedLessons };
    }));
  }, []);


  // Form submission handler
  const handleSubmit = async () => {
    if (!userId) return alert("User not logged in.");
    if (!title || !description || !startDate || !endDate || !price) {
      return alert("Please fill all required fields marked with *");
    }

    setIsSubmitting(true);

    const creatorIds = selectedCoMentors.map((c) => c.value);
    const domainIds = selectedDomains.map((d) => d.value);

    const url = isEditMode ? `${API}/update-course/${userId}/${courseId}` : `${API}/create-course`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const formData = new FormData();

      if (isEditMode) {
        // For PUT, backend expects a JSON payload and files separately
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
          syllabus_content: JSON.stringify(modules),
        };
        formData.append("payload", JSON.stringify(payload));
      } else {
        // For POST, backend expects flat form data
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("mode", mode);
        formData.append("start_date", startDate || "");
        formData.append("end_date", endDate || "");
        formData.append("description", description || "");
        formData.append("lecture_link", lectureLink || "");
        formData.append("price", price || 0);
        formData.append("seats", parseInt(basicSeats) || 0);
        formData.append("chat_link", basicWhatsapp || "");
        formData.append("co_mentor_ids", creatorIds.join(","));
        formData.append("creator_ids", [userId, ...creatorIds].filter((v, i, a) => a.indexOf(v) === i).join(","));
        formData.append("domain_ids", domainIds.join(","));
        formData.append("syllabus_content", JSON.stringify(modules));
        // These fields seem to be create-only based on the original code
        formData.append("is_published", true);
        formData.append("is_extra_registration", false);
      }
      
      if (coverPhoto) formData.append("cover_photo", coverPhoto);
      if (syllabusFile) formData.append("syllabus_file", syllabusFile);

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State values
    title, description, startDate, endDate, mode, selectedCoMentors, coMentorOptions, selectedDomains, domainOptions, lectureLink, price, basicSeats, basicWhatsapp, modules,
    // State setters
    setTitle, setDescription, setStartDate, setEndDate, setMode, setSelectedCoMentors, setSelectedDomains, setLectureLink, setCoverPhoto, setSyllabusFile, setPrice, setBasicSeats, setBasicWhatsapp,
    // Module handlers
    addModule, removeModule, updateModuleTitle, addLesson, removeLesson, updateLessonTitle,
    // Control states
    pageLoading, isSubmitting, error, isEditMode,
    // Main action
    handleSubmit,
  };
};

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const {
    title, description, startDate, endDate, mode, selectedCoMentors, coMentorOptions, selectedDomains, domainOptions, lectureLink, price, basicSeats, basicWhatsapp, modules,
    setTitle, setDescription, setStartDate, setEndDate, setMode, setSelectedCoMentors, setSelectedDomains, setLectureLink, setCoverPhoto, setSyllabusFile, setPrice, setBasicSeats, setBasicWhatsapp,
    addModule, removeModule, updateModuleTitle, addLesson, removeLesson, updateLessonTitle,
    pageLoading, isSubmitting, error, isEditMode,
    handleSubmit
  } = useCreateCoursePage();

  // Custom styles for react-select to match the Tailwind theme
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--select-bg)',
      borderColor: 'var(--select-border)',
      minHeight: '46px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--select-border-hover)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--select-menu-bg)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--select-option-selected-bg)' : state.isFocused ? 'var(--select-option-hover-bg)' : 'transparent',
      color: 'var(--select-option-color)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--select-multi-bg)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--select-multi-label-color)',
    }),
  };

  if (pageLoading) return <PageLoader />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      {/* CSS Variables for react-select theming */}
      <style>{`
        :root {
          --select-bg: #FFFFFF;
          --select-border: #D1D5DB;
          --select-border-hover: #3B82F6;
          --select-menu-bg: #FFFFFF;
          --select-option-selected-bg: #3B82F6;
          --select-option-hover-bg: #EFF6FF;
          --select-option-color: #111827;
          --select-multi-bg: #DBEAFE;
          --select-multi-label-color: #1E40AF;
        }
        .dark {
          --select-bg: #374151;
          --select-border: #4B5563;
          --select-border-hover: #3B82F6;
          --select-menu-bg: #374151;
          --select-option-selected-bg: #2563EB;
          --select-option-hover-bg: #4B5563;
          --select-option-color: #F9FAFB;
          --select-multi-bg: #1E3A8A;
          --select-multi-label-color: #BFDBFE;
        }
      `}</style>

      <TeacherSidebar onNavigate={(path) => navigate(path)} />
      <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          {isEditMode ? (
            <><FiEdit className="text-purple-500" size={24} /> Edit Course</>
          ) : (
            <><FiPlus className="text-blue-500" size={24} /> Create New Course</>
          )}
        </h1>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              <FiBook className="text-blue-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Title*</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Advanced Web Development" required/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Mode*</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select mode</option>
                  <option value="recorded">Recorded</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description*</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Describe what students will learn in this course" required/>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
               <FiCalendar className="text-orange-500" size={20} />
               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Schedule</h2>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date*</label>
                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date*</label>
                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
               </div>
             </div>
          </div>
          
          {/* Course Structure */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FiFileText className="text-green-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Structure</h2>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lecture Link</label>
                        <input type="text" value={lectureLink} onChange={(e) => setLectureLink(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://meet.google.com/..."/>
                    </div>
                    <div className="flex items-end">
                        <button type="button" onClick={addModule} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"><FiPlus size={16} /> Add Module</button>
                    </div>
                </div>
                <div className="space-y-6">
                    {modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-xs border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-gray-800 dark:text-white">Module {moduleIndex + 1}</h3>
                                <button type="button" onClick={() => removeModule(moduleIndex)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1" title="Remove module"><FiTrash2 size={16} /></button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Module Title</label>
                                <input type="text" value={module.title} onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={`Module ${moduleIndex + 1} title`}/>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lessons</h4>
                                    <button type="button" onClick={() => addLesson(moduleIndex)} className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"><FiPlus size={14} /> Add Lesson</button>
                                </div>
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                        <input type="text" value={lesson.title} onChange={(e) => updateLessonTitle(moduleIndex, lessonIndex, e.target.value)} className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder={`Lesson ${lessonIndex + 1} title`}/>
                                        <button type="button" onClick={() => removeLesson(moduleIndex, lessonIndex)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"><FiTrash2 size={14} /></button>
                                    </div>
                                ))}
                                {module.lessons.length === 0 && <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">No lessons added yet</div>}
                            </div>
                        </div>
                    ))}
                    {modules.length === 0 && <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"><p className="text-gray-500 dark:text-gray-400">No modules added yet. Click "Add Module" to get started.</p></div>}
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resources</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Photo</label>
                      <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40"/>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Syllabus (PDF)</label>
                      <input type="file" accept="application/pdf" onChange={(e) => setSyllabusFile(e.target.files[0])} className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40"/>
                  </div>
              </div>
          </div>
          
          {/* Pricing & Enrollment */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <FiDollarSign className="text-emerald-500" size={20} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pricing & Enrollment</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (₹)*</label>
                      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="2999" required/>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Seats</label>
                      <input type="number" value={basicSeats} onChange={(e) => setBasicSeats(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Leave empty for unlimited"/>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WhatsApp Link</label>
                      <input type="text" value={basicWhatsapp} onChange={(e) => setBasicWhatsapp(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://chat.whatsapp.com/..."/>
                  </div>
              </div>
          </div>
          
          {/* Team & Categories */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <FiUsers className="text-indigo-500" size={20} />
                  <FiTag className="text-blue-400 -ml-1" size={20} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team & Categories</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Co-Mentors</label>
                      <Select isMulti options={coMentorOptions} value={selectedCoMentors} onChange={setSelectedCoMentors} styles={selectStyles} placeholder="Select co-mentors..."/>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domains</label>
                      <Select isMulti options={domainOptions} value={selectedDomains} onChange={setSelectedDomains} styles={selectStyles} placeholder="Select domains..."/>
                  </div>
              </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                <><FiEdit size={18} /> Update Course</>
              ) : (
                <><FiPlus size={18} /> Create Course</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}