import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from './components/TeacherSidebar';

const API = 'https://backend-peerprogrammers.onrender.com';

export default function TeachingCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(''); // "published" or "unpublished"
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    let user;
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error('Invalid user data in storage');
      navigate('/login');
      return;
    }
    const userId = user.id;
    console.log('User ID:', userId);
    console.log('token:', token);
    console.log('API:', `${API}/courses/by-user/${userId}`);
    fetch(`${API}/courses/by-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          const sorted = [...data.courses].sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          );
          setCourses(sorted);
          setFilteredCourses(sorted);
        } else {
          console.error('API Error:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    const filtered = courses.filter(course => {
      const titleMatch = (course.title?.toLowerCase() || '').includes(search.toLowerCase());

      const isPublished = course.id % 2 === 0;
      const filterMatch =
        filter === 'published' ? isPublished :
        filter === 'unpublished' ? !isPublished : true;

      return titleMatch && filterMatch;
    });

    setFilteredCourses(filtered);
  }, [search, filter, courses]);

  const handleEdit = (courseId) => {
    navigate(`/teacher/courses/edit/individual/${courseId}`);
  };

  const handleView = (courseId) => {
    window.open(`/courses/${courseId}`, '_blank');
  };
  const handlePublish = (courseId, isPublished) => {
    alert(`Toggle ${isPublished ? 'Unpublish' : 'Publish'} for course ${courseId}`);
    // TODO: Connect actual API for publish/unpublish
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '-' : date.toISOString().split('T')[0];
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <TeacherSidebar onNavigate={(path) => navigate(path)} />

      <div className="flex-1 p-10 w-full">
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Courses</p>

        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-6">
          <input
            type="text"
            placeholder="Search by course title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-700 dark:text-gray-200">Loading courses...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-left">
                  <th className="px-4 py-2">Sr No</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Mode</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">End Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, idx) => {
                  const isPublished = course.id % 2 === 0;

                  return (
                    <tr key={course.id} className="border-t border-gray-300 dark:border-gray-600">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{course.title || '-'}</td>
                      <td className="px-4 py-2 capitalize">{course.mode || '-'}</td>
                      <td className="px-4 py-2">{formatDate(course.start_date)}</td>
                      <td className="px-4 py-2">{formatDate(course.end_date)}</td>
                      <td className="px-4 py-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleView(course.id)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handlePublish(course.id, isPublished)}
                          className={`${
                            isPublished
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white px-3 py-1 rounded text-sm`}
                        >
                          {isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500 dark:text-gray-300">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
