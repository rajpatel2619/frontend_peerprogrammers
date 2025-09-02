// src/components/Navbar.jsx
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
  HiHome,
  HiBookOpen,
  HiAcademicCap,
  HiMail,
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine
} from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import logo from "../assets/logo_black.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
  const isStudent = location.pathname.startsWith("/student");

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const baseBtn = "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 font-medium whitespace-nowrap";
  const navBtn = baseBtn + "text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100";
  const activeNavBtn = baseBtn + " bg-gray-300/50 dark:bg-gray-500/30 text-gray-600 dark:text-gray-100";
  const profileDropdownBtn = "flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200";
  const logoutBtn = "flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-6 md:px-12 lg:px-20 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}>
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-10 w-10 transition-transform duration-300" />
          <span className="hidden md:inline text-xl dark:text-white text-gray-900 select-none font-lexend font-medium">
            Peer Programmers
          </span>
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          <button onClick={() => navigate("/")} className={isActive("/") ? activeNavBtn : navBtn}>Home</button>
          <button onClick={() => navigate("/training")} className={isActive("/training") ? activeNavBtn : navBtn}>Courses</button>
          <button onClick={() => navigate("/campus_training")} className={isActive("/campus_training") ? activeNavBtn : navBtn}>Campus Program</button>
          <button onClick={() => navigate("/resources")} className={isActive("/resources") ? activeNavBtn : navBtn}> Resources</button>
          <button onClick={() => navigate("/dsa")} className={isActive("/dsa") ? activeNavBtn : navBtn}>DSA</button>
          <button onClick={() => navigate("/mentors")} className={isActive("/mentors") ? activeNavBtn : navBtn}>Mentors</button>
          <button onClick={() => navigate("/contact")} className={isActive("/contact") ? activeNavBtn : navBtn}>Contact</button>

          {/* {!token && (
            <button onClick={() => navigate("/login")} className="ml-2 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black font-medium  rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
              Login
            </button>
          )} */}

          {token && (
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full overflow-hidden focus:outline-none transition-all duration-300 hover:ring-2 hover:ring-gray-500 px-1 py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover border-2 border-gray-500/30" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center border-2 border-gray-500/30">
                    <FiUser  size={20} className="text-gray-600 dark:text-gray-400" />
                  </div>
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || "No email"}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => { setShowDropdown(false); navigate("/student/dashboard"); }} className={profileDropdownBtn}>
                      <HiOutlineUserGroup size={18} /> Student Dashboard
                    </button>
                    <button onClick={() => { setShowDropdown(false); navigate("/teacher/dashboard"); }} className={profileDropdownBtn}>
                      <HiOutlinePresentationChartLine size={18} /> Teacher Dashboard
                    </button>
                    {user.userType === "moderator" && (
                      <button onClick={() => { setShowDropdown(false); navigate("/moderator/dsaquestion"); }} className={profileDropdownBtn}>
                        <HiOutlinePresentationChartLine size={18} /> Moderator Dashboard
                      </button>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button onClick={() => { setShowDropdown(false); navigate("/profile"); }} className={profileDropdownBtn}>
                      <HiOutlineUser size={18} /> My Profile
                    </button>
                    <button onClick={() => { setShowDropdown(false); handleLogout(); }} className={logoutBtn}>
                      <HiOutlineLogout size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <HiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className={`absolute inset-0 bg-black/50 dark:bg-black/70 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)} />
        <div className="absolute top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">Peer Programmers</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <HiX size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-1 p-2 overflow-y-auto flex-grow">
            <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }} className={isActive("/") ? activeNavBtn : navBtn}><HiHome size={18} /> Home</button>
            <button onClick={() => { navigate("/resources"); setMobileMenuOpen(false); }} className={isActive("/resources") ? activeNavBtn : navBtn}><HiBookOpen size={18} /> Resources</button>
            <button onClick={() => { navigate("/dsa"); setMobileMenuOpen(false); }} className={isActive("/dsa") ? activeNavBtn : navBtn}><HiBookOpen size={18} /> DSA</button>
            <button onClick={() => { navigate("/training"); setMobileMenuOpen(false); }} className={isActive("/training") ? activeNavBtn : navBtn}><HiAcademicCap size={18} /> Courses</button>
            <button onClick={() => { navigate("/mentors"); setMobileMenuOpen(false); }} className={isActive("/mentors") ? activeNavBtn : navBtn}><HiBookOpen size={18} /> Mentors</button>
            <button onClick={() => { navigate("/campus_training"); setMobileMenuOpen(false); }} className={isActive("/campus_training") ? activeNavBtn : navBtn}><HiBookOpen size={18} /> Campus Program</button>
            <button onClick={() => { navigate("/contact"); setMobileMenuOpen(false); }} className={isActive("/contact") ? activeNavBtn : navBtn}><HiMail size={18} /> Contact</button>

            {/* {!token && (
              <button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                Login
              </button>
            )} */}
          </div>

          {token && (
            <div className="border-t border-gray-300 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover border-2 border-blue-500/30" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border-2 border-blue-500/30">
                    <HiOutlineUserCircle size={26} className="text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.name || "Account"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || "No email"}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <button onClick={() => { navigate("/student/dashboard"); setMobileMenuOpen(false); }} className={profileDropdownBtn}>
                  <HiOutlineUserGroup size={18} /> Student Dashboard
                </button>
                <button onClick={() => { navigate("/teacher/dashboard"); setMobileMenuOpen(false); }} className={profileDropdownBtn}>
                  <HiOutlinePresentationChartLine size={18} /> Teacher Dashboard
                </button>
                {user.userType === "moderator" && (
                  <button onClick={() => { navigate("/moderator/dashboard"); setMobileMenuOpen(false); }} className={profileDropdownBtn}>
                    <HiOutlinePresentationChartLine size={18} /> Moderator Dashboard
                  </button>
                )}
                <div className="border-t border-gray-300 dark:border-gray-700 my-1"></div>
                <button onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }} className={profileDropdownBtn}>
                  <HiOutlineUser size={18} /> My Profile
                </button>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className={logoutBtn}>
                  <HiOutlineLogout size={18} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Dark Mode Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
        >
          {darkMode ? (
            <HiOutlineSun size={20} className="text-yellow-400 group-hover:text-yellow-300" />
          ) : (
            <HiOutlineMoon size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          )}
        </button>
      </div>
    </>
  );
}
