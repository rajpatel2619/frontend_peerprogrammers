import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
  FaExchangeAlt,
  FaHome,
  FaSignInAlt,
} from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isStudent = location.pathname.startsWith('/student');

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const toggleRole = () => {
    navigate(isStudent ? '/teacher/dashboard' : '/student/dashboard');
  };

  const baseBtn =
    'flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 font-medium whitespace-nowrap';

  const iconTextBtn =
    baseBtn +
    ' text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900';

  const profileDropdownBtn =
    'flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400';

  return (
    <nav className="bg-white dark:bg-black border-b border-blue-400/30 flex items-center justify-between px-4 py-3 shadow-md">
      {/* Left: Logo and Title */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Logo" className="h-8 w-16" />
        <span className="font-semibold text-xl dark:text-white text-gray-900 select-none">
          {token ? (isStudent ? 'Student' : 'Teacher') : ''}
        </span>
      </div>

      {/* Right: Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {!token ? (
          <>
            <button
              onClick={() => navigate('/')}
              className={iconTextBtn}
              aria-label="Home"
            >
              <FaHome size={18} /> Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className={iconTextBtn}
              aria-label="Login"
            >
              <FaSignInAlt size={18} /> Login
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleRole}
              className={iconTextBtn}
              aria-label="Switch Role"
              title={`Switch to ${isStudent ? 'Teacher' : 'Student'}`}
            >
              <FaExchangeAlt size={18} />
              Switch to {isStudent ? 'Teacher' : 'Student'}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full overflow-hidden focus:outline-none ring-2 ring-blue-500 px-1 py-1 text-blue-600 dark:text-blue-400 font-medium"
                aria-haspopup="true"
                aria-expanded={showDropdown}
              >
                <FaUserCircle size={26} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/profile');
                    }}
                    className={profileDropdownBtn}
                  >
                    <FaUser /> Profile
                  </button>
                  <button onClick={handleLogout} className={profileDropdownBtn}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={iconTextBtn}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={iconTextBtn}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-blue-600 dark:text-blue-400 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-black rounded-md shadow-lg p-3 flex flex-col gap-2 md:hidden z-50">
          {!token ? (
            <>
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className={iconTextBtn}
              >
                <FaHome size={18} /> Home
              </button>
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className={iconTextBtn}
              >
                <FaSignInAlt size={18} /> Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  toggleRole();
                  setMobileMenuOpen(false);
                }}
                className={iconTextBtn}
              >
                <FaExchangeAlt size={18} /> Switch to {isStudent ? 'Teacher' : 'Student'}
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className={iconTextBtn}
              >
                <FaUserCircle size={18} /> Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className={iconTextBtn}
              >
                <FaSignOutAlt size={18} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
