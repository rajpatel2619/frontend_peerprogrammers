import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';
import { FiBook, FiCalendar, FiClock, FiAward, FiBarChart2, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_API;

// Skeleton Loading Components
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="animate-pulse flex items-center">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CourseCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="animate-pulse p-6">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentCourses, setRecentCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API calls with timeout
        setTimeout(() => {
          setStats({
            enrolledCourses: 5,
            completedCourses: 2,
            ongoingCourses: 3
          });
          setRecentCourses([
            {
              id: 1,
              title: "Advanced React Patterns",
              startDate: "2023-05-15"
            },
            {
              id: 2,
              title: "Node.js Fundamentals",
              startDate: "2023-06-01"
            },
            {
              id: 3,
              title: "UI/UX Design Principles",
              startDate: "2023-06-10"
            }
          ]);
          setNotifications([
            { id: 1, message: "New assignment posted in Advanced React", time: "2 hours ago" },
            { id: 2, message: "Node.js class rescheduled to Friday", time: "1 day ago" }
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      
      <div className="flex-1 p-6 md:p-8 mt-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
          >
            Dashboard Overview
          </motion.h1>
          <div className="relative">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FiBell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <FiBook className="text-blue-600 dark:text-blue-300 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.enrolledCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                  <FiAward className="text-green-600 dark:text-green-300 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.completedCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <FiBarChart2 className="text-purple-600 dark:text-purple-300 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.ongoingCourses}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Courses */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Recent Courses</h2>
        {loading ? (
          <CourseCardSkeleton />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {recentCourses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <FiCalendar className="inline mr-2" />
                    Started on {new Date(course.startDate).toLocaleDateString()}
                  </p>
                  
                 
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => navigate(`/student/courses/d/${course.id}`)}
                      className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Notifications */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Notifications</h2>
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-8"
          >
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <motion.li 
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No new notifications</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}