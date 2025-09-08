import React, { useState, useEffect } from "react";
import { Download, ExternalLink, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API;

const Training = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/all_courses`);
        const data = await res.json();
        console.log(data);
        if (data.success && Array.isArray(data.courses)) {
          const formatted = data.courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description || "No description provided.",
            type: "course",
            category: Array.isArray(course.domains)
              ? course.domains.join(", ")
              : "General",
            format: course.mode || "N/A",
            size: "N/A",
            downloads: Math.floor(Math.random() * 10000),
            image: course.cover_photo || "https://via.placeholder.com/400",
            syllabus_link: course.syllabus_link || "",
            featured: course.is_published || false,
          }));
          setResources(formatted);
        } else {
          console.error("Invalid course data", data);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (link) => {
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.download = "";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    } else {
      alert("No syllabus file available for download.");
    }
  };

  const handleNavigate = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <section className="py-6 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Courses 
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Access our comprehensive collection of courses.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-black rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Filtered Resources */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 p-4 rounded shadow animate-pulse"
              >
                <div className="h-40 bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div
                  className="relative h-48 overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200 dark:bg-zinc-700"
                  onClick={() => handleNavigate(resource.id)}
                >
                  {resource.image ? (
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg p-4 text-center">
                      {resource.title}
                    </div>
                  )}

                  {resource.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3
                    onClick={() => handleNavigate(resource.id)}
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 transition-colors cursor-pointer overflow-hidden break-words"
                    style={{ height: "3.5rem" }} // adjust height as needed
                  >
                    {resource.title}
                  </h3>

                  {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{resource.description}</p> */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-4">
                      <span>{resource.format}</span>
                      {/* <span>{resource.size}</span> */}
                    </div>
                    {/* <span>{resource.downloads.toLocaleString()} downloads</span> */}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleNavigate(resource.id)}
                      className="flex-1 text-white bg-black dark:text-black dark:bg-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Explore Course</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => handleDownload(resource.syllabus_link)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Training;
