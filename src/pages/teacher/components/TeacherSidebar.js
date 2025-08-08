import React, { useState } from "react";
import {
  FiHome,
  FiBook,
  FiPlusCircle,
  FiChevronDown,
  FiChevronUp,
  FiChevronRight,
  FiChevronLeft
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TeacherSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateSubmenu, setShowCreateSubmenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-20 left-0 z-50 bg-blue-600 text-white p-3 rounded-r-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <FiChevronRight className="text-xl" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-all duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <FiChevronLeft className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => handleNavigate("/teacher/dashboard")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiHome className="text-blue-500 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
          </button>

          {/* My Courses */}
          <button
            onClick={() => handleNavigate("/teacher/courses")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiBook className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">My Courses</span>
          </button>

          {/* Create New Course */}
          <div className="space-y-1">
            <button
              onClick={() => setShowCreateSubmenu((prev) => !prev)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FiPlusCircle className="text-orange-400" />
                <span className="text-gray-700 dark:text-gray-300">Create Course</span>
              </div>
              {showCreateSubmenu ? (
                <FiChevronUp className="text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-400" />
              )}
            </button>

            {showCreateSubmenu && (
              <button
                onClick={() => handleNavigate("/teacher/courses/new/individual")}
                className="w-full text-left pl-12 pr-4 py-2 text-md rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                For Individuals
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TeacherSidebar;