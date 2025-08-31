import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ExternalLink, Search } from 'lucide-react';

const API = process.env.REACT_APP_API;

const UserPublicProfile = () => {
  const { userId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorRes = await fetch(`${API}/public_user/${userId}`);
        const mentorData = await mentorRes.json();
        setMentor(mentorData.user); // ✅ Extract user

        const courseRes = await fetch(`${API}/courses/created-by/${userId}`);
        const courseData = await courseRes.json();
        if (courseData.success && Array.isArray(courseData.courses)) {
          const formatted = courseData.courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description || 'No description provided.',
            type: 'course',
            category: Array.isArray(course.domains) ? course.domains.join(', ') : 'General',
            format: course.mode || 'N/A',
            size: 'N/A',
            downloads: Math.floor(Math.random() * 10000),
            image: course.cover_photo || 'https://via.placeholder.com/400',
            syllabus_link: course.syllabus_link || '',
            featured: course.is_published || false,
          }));
          setCourses(formatted);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDownload = (link) => {
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.download = '';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
    } else {
      alert("No syllabus file available for download.");
    }
  };

  const handleNavigate = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = courses.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mentor Info */}
        {mentor && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {mentor.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{mentor.username}</p>
            {mentor.social && (
              <div className="flex justify-center flex-wrap gap-4 mt-4 text-blue-600">
                {mentor.social.linkedin && (
                  <a href={mentor.social.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                )}
                {mentor.social.github && (
                  <a href={mentor.social.github} target="_blank" rel="noreferrer" className="hover:underline">
                    GitHub
                  </a>
                )}
                {mentor.social.twitter && (
                  <a href={mentor.social.twitter} target="_blank" rel="noreferrer" className="hover:underline">
                    Twitter
                  </a>
                )}
                {/* Add more if needed */}
              </div>
            )}
          </div>
        )}

        {/* Search Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Mentor's Courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Courses */}
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(resource => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => handleNavigate(resource.id)}
                >
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 bg-opacity-90 px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{resource.category}</span>
                  </div>
                  {resource.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    onClick={() => handleNavigate(resource.id)}
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{resource.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-4">
                      <span>{resource.format}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                    </div>
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownload(resource.syllabus_link)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Syllabus</span>
                    </button>
                    <button
                      onClick={() => handleNavigate(resource.id)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPublicProfile;
