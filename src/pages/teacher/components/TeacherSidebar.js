import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiBook,
  FiPlusCircle,
  FiChevronDown,
  FiChevronUp,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiAward
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const TeacherNavbar = () => {
  const [showCreateSubmenu, setShowCreateSubmenu] = useState(false);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const navItems = [
    {
      path: "/teacher/dashboard",
      icon: <FiHome className="text-lg" />,
      label: "Dashboard",
      color: "text-blue-500"
    },
    {
      path: "/teacher/courses",
      icon: <FiBook className="text-lg" />,
      label: "My Courses",
      color: "text-green-500"
    },
    {
      path: "/teacher/courses/new/individual",
      icon: <FiPlusCircle className="text-orange-500 text-lg" />,
      label: "Create",
      color: "text-green-500"
    },
    // {
    //   path: "/teacher/students",
    //   icon: <FiUsers className="text-lg" />,
    //   label: "Students",
    //   color: "text-purple-500"
    // },
    // {
    //   path: "/teacher/schedule",
    //   icon: <FiCalendar className="text-lg" />,
    //   label: "Schedule",
    //   color: "text-yellow-500"
    // },
    // {
    //   path: "/teacher/messages",
    //   icon: <FiMessageSquare className="text-lg" />,
    //   label: "Messages",
    //   color: "text-pink-500"
    // }
  ];

  const createMenuItems = [
    {
      path: "/teacher/courses/new/individual",
      label: "For Individuals"
    },
    // {
    //   path: "/teacher/courses/new/group",
    //   label: "For Groups"
    // },
    // {
    //   path: "/teacher/courses/new/workshop",
    //   label: "Workshop"
    // }
  ];

  return (
    <div className="fixed top-13 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-self-center h-16">
      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-4 min-w-max">
          {navItems.map((item) => {
            // Calculate approximate width based on text length
            const textWidth = `min-w-[${item.label.length * 8 + 40}px]`;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${textWidth} ${
                  activePath === item.path
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className={item.color}>{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default TeacherNavbar;