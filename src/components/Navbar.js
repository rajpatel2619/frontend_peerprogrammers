import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineSwitchHorizontal,
  HiMenu,
  HiX,
} from "react-icons/hi";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isStudent = location.pathname.startsWith("/student");

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const toggleRole = () => {
    navigate(isStudent ? "/teacher/dashboard" : "/student/dashboard");
  };

  const baseBtn = "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 font-medium whitespace-nowrap";
  const iconTextBtn = baseBtn + " text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900";
  const profileDropdownBtn = "flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-blue-400/30 px-6 md:px-20 py-3 shadow-md flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="hidden md:inline font-extrabold text-xl dark:text-white text-gray-900 select-none">
            Peer Programmers
          </span>
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <button onClick={() => navigate("/")} className={iconTextBtn}>Home</button>
          <button onClick={() => navigate("/temp_courses")} className={iconTextBtn}>Courses</button>
          <button onClick={() => navigate("/resources")} className={iconTextBtn}>Resources</button>

          {token && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full overflow-hidden focus:outline-none ring-2 ring-blue-500 px-1 py-1 text-blue-600 dark:text-blue-400 font-medium"
              >
                <HiOutlineUserCircle size={26} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <button onClick={() => { setShowDropdown(false); navigate("/profile"); }} className={profileDropdownBtn}>
                    <HiOutlineUser /> Profile
                  </button>
                  <button onClick={toggleRole} className={profileDropdownBtn}>
                    <HiOutlineSwitchHorizontal size={18} />
                    Switch to {isStudent ? "Teacher" : "Student"}
                  </button>
                  <button onClick={handleLogout} className={profileDropdownBtn}>
                    <HiOutlineLogout /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-blue-600 dark:text-blue-400 focus:outline-none"
          >
            <HiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700 dark:text-white">
            <HiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }} className={iconTextBtn}>
            Home
          </button>
          <button onClick={() => { navigate("/temp_courses"); setMobileMenuOpen(false); }} className={iconTextBtn}>
            Courses
          </button>
          <button onClick={() => { navigate("/resources"); setMobileMenuOpen(false); }} className={iconTextBtn}>
            Resources
          </button>

          {token && (
            <>
              <button onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }} className={iconTextBtn}>
                <HiOutlineUser /> Profile
              </button>
              <button onClick={() => { toggleRole(); setMobileMenuOpen(false); }} className={iconTextBtn}>
                <HiOutlineSwitchHorizontal size={18} /> Switch to {isStudent ? "Teacher" : "Student"}
              </button>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className={iconTextBtn}>
                <HiOutlineLogout /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Floating Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg"
        >
          {darkMode ? (
            <>
              <HiOutlineSun size={20} /> Light
            </>
          ) : (
            <>
              <HiOutlineMoon size={20} /> Dark
            </>
          )}
        </button>
      </div>
    </>
  );
}
