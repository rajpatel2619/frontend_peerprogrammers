import React, { useState } from "react";
import {
  FaBook,
  FaHome,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", icon: <FaHome />, path: "/student/dashboard" },
    { name: "Courses", icon: <FaBook />, path: "/student/courses" },
  ];

  return (
    <div className="relative">
      {/* Arrow Button peeking from left */}
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

      {/* Sidebar Panel */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-black text-gray-800 dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button (Arrow Left) */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 text-2xl"
          >
            <FaAngleLeft />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default StudentSidebar;
