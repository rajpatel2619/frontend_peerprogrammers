import React, { useState } from "react";
import {
  FaBook,
  FaHome,
  FaAngleRight,
  FaAngleLeft,
  FaChevronDown,
  FaChevronUp,
  FaPlusCircle,
} from "react-icons/fa";
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
          className="fixed top-20 left-0 z-50 bg-blue-600 text-white p-2 rounded-r-full shadow transform -translate-x-1/4"
        >
          <FaAngleRight className="text-xl" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-black text-gray-800 dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 text-2xl"
          >
            <FaAngleLeft />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => handleNavigate("/teacher/dashboard")}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
          >
            <FaHome />
            Teacher Dashboard
          </button>

          {/* My Courses */}
          <button
            onClick={() => handleNavigate("/teacher/courses")}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
          >
            <FaBook />
            My Courses
          </button>

          {/* Create New Course with submenu */}
          <div>
            <button
              onClick={() => setShowCreateSubmenu((prev) => !prev)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
            >
              <div className="flex items-center gap-3">
                <FaPlusCircle />
                Create New Course
              </div>
              {showCreateSubmenu ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showCreateSubmenu && (
              <div className="ml-10 mt-2 space-y-2">
                <button
                  onClick={() => handleNavigate("/teacher/courses/new/individual")}
                  className="block w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:underline"
                >
                  For Individuals
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TeacherSidebar;
