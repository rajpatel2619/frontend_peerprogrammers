import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const LOCAL_STORAGE_KEY = "peerProgrammersCourses";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // e.g. 24 hours

const CourseTabs = () => {
  const [coursesByCategory, setCoursesByCategory] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchAndStoreCourses = async () => {
      try {
        const res = await fetch("https://backend-peerprogrammers.onrender.com/all-courses");
        const data = await res.json();
        const allCourses = data.courses || [];

        const validCourses = allCourses.filter(
          (course) => course.title && course.domains?.length > 0
        );

        const categorized = {};
        validCourses.forEach((course) => {
          course.domains.forEach((domain) => {
            if (!categorized[domain]) categorized[domain] = [];
            categorized[domain].push(course);
          });
        });

        setCoursesByCategory(categorized);
        const firstCategory = Object.keys(categorized)[0];
        setActiveTab(firstCategory);

        // Save to localStorage with timestamp
        const cache = {
          timestamp: Date.now(),
          data: categorized,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    const loadFromLocalStorage = () => {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!cached) return false;

      try {
        const parsed = JSON.parse(cached);
        const { timestamp, data } = parsed;

        // Check if cache is expired
        if (Date.now() - timestamp > CACHE_DURATION_MS) {
          console.log("Cache expired. Fetching fresh data.");
          return false;
        }

        setCoursesByCategory(data);
        const firstCategory = Object.keys(data)[0];
        setActiveTab(firstCategory);
        return true;
      } catch (err) {
        console.error("Failed to parse cached data:", err);
        return false;
      }
    };

    const hasCache = loadFromLocalStorage();
    if (!hasCache) {
      fetchAndStoreCourses();
    }
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  const categories = Object.keys(coursesByCategory);
  const courses = coursesByCategory[activeTab] || [];

  return (
    <div>
      {/* Sticky Tabs */}
      <div
        className="sticky top-0 bg-white dark:bg-gray-900 z-50 border-b border-gray-300 dark:border-gray-700 overflow-x-auto"
        style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex space-x-4 px-4 py-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-md font-medium focus:outline-none transition-colors ${
                activeTab === category
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {courses.slice(0, visibleCount).map((course, idx) => (
          <CourseCard key={course.id || idx} {...course} />
        ))}
      </div>

      {/* Load More */}
      {visibleCount < courses.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-6 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseTabs;
