import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import courseData from "./courseData";

const CourseTabs = () => {
  const categories = Object.keys(courseData);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [visibleCount, setVisibleCount] = useState(6);

  const courses = courseData[activeTab] || [];

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Reset visibleCount when activeTab changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  return (
    <div>
      {/* Sticky scrollable tabs */}
      <div
        className="sticky top-0 bg-white dark:bg-gray-900 z-50 border-b border-gray-300 dark:border-gray-700 overflow-x-auto"
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
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

      {/* Add padding-top to prevent content jumping under sticky tabs */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {courses.slice(0, visibleCount).map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </div>

      {/* Load More button */}
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
