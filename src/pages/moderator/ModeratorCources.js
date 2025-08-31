import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModeratorNavbar from './components/ModeratorSidebar';

const ModeratorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const API = process.env.REACT_APP_API;

  // Fetch all courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/all_courses_short`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.courses);
        }
        console.log(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Toggle verify course API call
  const toggleVerifyCourse = async (id) => {
    try {
      const res = await fetch(`${API}/verify_course/${id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      if (data.success) {
        // Update the verified status in the state
        setCourses((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, isVerified: data.isVerified } : c
          )
        );
      }
    } catch (err) {
      console.error('Error verifying course:', err);
    }
  };

  // Filter courses by title or creator
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.creator?.name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Pending Courses for Verification
          </h1>
          
        </div>

        {/* Search Bar */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses by title or creator..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading courses...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Creator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
  <a
    href={`/courses/${course.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
  >
    {course.title}
  </a>
</td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {course.creator?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ₹{course.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {course.start_date || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {course.isVerified ? (
                          <span className="text-green-600 font-semibold">Yes</span>
                        ) : (
                          <span className="text-red-600 font-semibold">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleVerifyCourse(course.id)}
                          className={`p-2 rounded-full ${
                            course.isVerified
                              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                              : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                          }`}
                          title={
                            course.isVerified ? 'Unverify Course' : 'Verify Course'
                          }
                        >
                          {course.isVerified ? <FiX /> : <FiCheck />}
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeratorCourses;
