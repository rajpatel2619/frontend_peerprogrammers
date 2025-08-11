import React, { useState } from 'react';
import { FiCheck, FiX, FiEye, FiSearch, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ModeratorNavbar from './components/ModeratorSidebar';

const ModeratorCourses = () => {
  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'John Doe',
      category: 'Web Development',
      students: 1250,
      price: 49.99,
      rating: 4.7,
      verified: true,
      description: 'Learn React from scratch with this comprehensive course covering all the fundamentals.',
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      instructor: 'Jane Smith',
      category: 'Programming',
      students: 890,
      price: 59.99,
      rating: 4.8,
      verified: false,
      description: 'Master advanced JavaScript concepts and design patterns for better code organization.',
      createdAt: '2023-03-22'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Alex Johnson',
      category: 'Data Science',
      students: 2100,
      price: 79.99,
      rating: 4.9,
      verified: true,
      description: 'Complete guide to using Python for data analysis and visualization.',
      createdAt: '2023-02-10'
    },
    {
      id: 4,
      title: 'UX/UI Design Fundamentals',
      instructor: 'Sarah Williams',
      category: 'Design',
      students: 750,
      price: 39.99,
      rating: 4.5,
      verified: false,
      description: 'Learn the principles of user experience and interface design.',
      createdAt: '2023-04-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'verified', 'unverified'

  // Filter courses based on search term and verification status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'verified' && course.verified) || 
                         (filter === 'unverified' && !course.verified);
    
    return matchesSearch && matchesFilter;
  });

  // Toggle course verification status
  const toggleVerification = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, verified: !course.verified } : course
    ));
  };

  // View course details
  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Course Management</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
             Welcome
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses by title, instructor or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-lg ${filter === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilter('unverified')}
                className={`px-4 py-2 rounded-lg ${filter === 'unverified' ? 'bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
              >
                Unverified
              </button>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
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
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">${course.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{course.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${course.verified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {course.verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleVerification(course.id)}
                          className={`p-2 rounded-full ${course.verified ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800' : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'}`}
                          title={course.verified ? 'Unverify Course' : 'Verify Course'}
                        >
                          {course.verified ? <FiX /> : <FiCheck />}
                        </button>
                        <button
                          onClick={() => viewCourseDetails(course)}
                          className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No courses found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Course Details Modal */}
        {showModal && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{selectedCourse.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created on: {selectedCourse.createdAt}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Instructor</h3>
                    <p className="text-gray-900 dark:text-white">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h3>
                    <p className="text-gray-900 dark:text-white">{selectedCourse.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Students Enrolled</h3>
                    <p className="text-gray-900 dark:text-white">{selectedCourse.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Price</h3>
                    <p className="text-gray-900 dark:text-white">${selectedCourse.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rating</h3>
                    <p className="text-gray-900 dark:text-white">{selectedCourse.rating}/5.0</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Verification Status</h3>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedCourse.verified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {selectedCourse.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
                  <p className="text-gray-900 dark:text-white">{selectedCourse.description}</p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => toggleVerification(selectedCourse.id)}
                    className={`px-4 py-2 rounded-lg ${selectedCourse.verified ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                  >
                    {selectedCourse.verified ? 'Unverify Course' : 'Verify Course'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorCourses;