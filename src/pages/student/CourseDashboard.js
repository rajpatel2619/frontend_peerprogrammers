import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';
import { FiDownload, FiLink, FiCalendar, FiUsers, FiBook, FiBell, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_API;

// Skeleton Loading Components
const OverviewSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="animate-pulse space-y-3">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);

const AnnouncementSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

const ParticipantsSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-8">
      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className="ml-4 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
      </div>
    </div>
    <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
      ))}
    </div>
  </div>
);

export default function CourseDetails() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [courseRes, announcementsRes] = await Promise.all([
          fetch(`${API}/courses_all_details/${courseId}`),
          fetch(`${API}/announcements?courseId=${courseId}`)
        ]);
        
        const courseData = await courseRes.json();
        const announcementsData = await announcementsRes.json();
        
        setCourseDetails(courseData);
        setAnnouncements(announcementsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [courseId]);

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    
    try {
      const res = await fetch(`${API}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          content: newAnnouncement,
          date: new Date().toISOString()
        })
      });
      
      const data = await res.json();
      setAnnouncements([data, ...announcements]);
      setNewAnnouncement('');
    } catch (err) {
      console.error('Error adding announcement:', err);
    }
  };

  if (!courseDetails && !loading) return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Course not found</p>
      </div>
    </div>
  );

  const {
    title,
    description,
    start_date,
    end_date,
    price,
    seats,
    lecture_link,
    chatLink,
    syllabus_link,
    syllausContent,
    students,
    instructor
  } = courseDetails || {};

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen pt-20">
        {loading ? (
          <div className="mb-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          </div>
        ) : (
          <div className="mb-6 flex justify-between items-start">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-800 dark:text-white"
              >
                {title}
              </motion.h1>
              {instructor && (
                <p className="text-gray-600 dark:text-gray-400">
                  Instructor: {instructor.name}
                </p>
              )}
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg"
            >
              <p className="font-medium">
                {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', icon: <FiInfo className="mr-2" />, label: 'Overview' },
              { id: 'resources', icon: <FiBook className="mr-2" />, label: 'Resources' },
              { id: 'announcements', icon: <FiBell className="mr-2" />, label: 'Announcements' },
              // { id: 'participants', icon: <FiUsers className="mr-2" />, label: 'Participants' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                <span className="flex items-center">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        {loading ? (
          <>
            {activeTab === 'overview' && <OverviewSkeleton />}
            {activeTab === 'announcements' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <AnnouncementSkeleton />
              </div>
            )}
            {activeTab === 'participants' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <ParticipantsSkeleton />
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Course Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                      <p className="mt-1 text-gray-800 dark:text-gray-200">{description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-200">
                          <FiCalendar className="inline mr-2" />
                          {new Date(start_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-200">
                          <FiCalendar className="inline mr-2" />
                          {new Date(end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-200">₹{price}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Seats</h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-200">{seats}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h2>
                  <div className="space-y-3">
                    {lecture_link && (
                      <motion.a 
                        whileHover={{ x: 5 }}
                        href={lecture_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <FiLink className="text-blue-500 mr-3" />
                        <span className="text-gray-800 dark:text-gray-200">Join Live Lecture</span>
                      </motion.a>
                    )}
                    {chatLink && (
                      <motion.a 
                        whileHover={{ x: 5 }}
                        href={chatLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <FiMessageSquare className="text-green-500 mr-3" />
                        <span className="text-gray-800 dark:text-gray-200">Course Chat Group</span>
                      </motion.a>
                    )}
                    {syllabus_link && (
                      <motion.a 
                        whileHover={{ x: 5 }}
                        href={syllabus_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <FiDownload className="text-purple-500 mr-3" />
                        <span className="text-gray-800 dark:text-gray-200">Download Syllabus</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Course Resources</h2>
                  
                  {syllabus_link && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Syllabus Document</h3>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          href={syllabus_link}
                          download
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <FiDownload className="mr-2" />
                          Download
                        </motion.a>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Contains all course topics, schedule, and grading information.
                      </p>
                    </div>
                  )}
                  
                  {syllausContent && (
                    <div>
                      <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Syllabus Content</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded whitespace-pre-line text-gray-800 dark:text-gray-200">
                        {syllausContent}
                      </div>
                    </div>
                  )}
                  
                  {!syllabus_link && !syllausContent && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <FiBook className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No resources available yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                {/* Announcements List */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Announcements</h2>
                    
                    {announcements.length > 0 ? (
                      <div className="space-y-4">
                        {announcements.map((announcement, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-l-4 border-blue-500 pl-4 py-2"
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-gray-800 dark:text-gray-200 font-medium">{announcement.content}</p>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(announcement.date).toLocaleString()}
                              </span>
                            </div>
                            {announcement.postedBy && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Posted by: {announcement.postedBy.name}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FiBell className="w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No announcements yet.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Participants Tab */}
            {/* {activeTab === 'participants' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Course Participants</h2>
                  
                  {instructor && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Instructor</h3>
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xl">
                          {instructor.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-800 dark:text-gray-200">{instructor.name}</p>
                          <p className="text-gray-600 dark:text-gray-400">{instructor.email}</p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Students ({students?.length || 0})</h3>
                  
                  {students?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-3 text-gray-600 dark:text-gray-300 font-medium">#</th>
                            <th className="p-3 text-gray-600 dark:text-gray-300 font-medium">Name</th>
                            <th className="p-3 text-gray-600 dark:text-gray-300 font-medium">Email</th>
                            <th className="p-3 text-gray-600 dark:text-gray-300 font-medium">Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student, index) => (
                            <motion.tr 
                              key={index}
                              whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                              className="border-t border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm mr-3">
                                    {student.name.charAt(0)}
                                  </div>
                                  {student.name}
                                </div>
                              </td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{student.email}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">
                                {student.joined_date ? new Date(student.joined_date).toLocaleDateString() : 'N/A'}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <FiUsers className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No students registered yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
}