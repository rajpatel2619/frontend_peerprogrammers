import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';

const API = process.env.REACT_APP_API;

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      navigate('/login');
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/registered_courses/${user.id}`);
        const data = await res.json();
        console.log(data);
        setCourses(data || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Enrolled Courses</h1>
          
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 mb-4 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No courses found.</p>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id} className="border-t dark:border-gray-600">
                    <td className="p-3">{course.id}</td>
                    <td className="p-3">{course.title}</td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/student/courses/d/${course.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
