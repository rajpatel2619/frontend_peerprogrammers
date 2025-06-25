import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <FaHome />, path: "dashboard" },
    { name: "Courses", icon: <FaBook />, path: "courses" },
    { name: "Students", icon: <FaUserGraduate />, path: "students" },
    { name: "Teachers", icon: <FaChalkboardTeacher />, path: "teachers" },
    { name: "Profile", icon: <FaUser />, path: "profile" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "logout" },
  ];

  return (
    <>
      {/* Toggle Sidebar Button (only visible on small screens) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-4 z-30 md:hidden bg-blue-600 text-white p-2 rounded shadow"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black text-gray-800 dark:text-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button (mobile only) */}
        <div className="flex justify-start mt-16 md:mt-16 p-4 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 mt-4 md:mt-16">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                onNavigate(link.path);
                setIsOpen(false); // auto close on small screens
              }}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
