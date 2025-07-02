import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from './components/TeacherSidebar';
const API = process.env.REACT_APP_API;

export default function TeachingCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    const userId = user.id;

    fetch(`${API}/courses/by-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.courses);
          console.log(data);
        } else {
          console.error("API Error:", data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, [navigate]);


  const handleEdit = (courseId) => {
    navigate(`/teacher/courses/update?id=${courseId}`);
  };

  const handleView = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handlePublish = (courseId) => {
    alert(`Toggle publish for course ${courseId}`);
    // TODO: Make API call here
  };

  // const filteredCourses = courses.filter(course =>
  //   course.name.toLowerCase().includes(search.toLowerCase()) &&
  //   (filter === '' || course.status === filter)
  // );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <TeacherSidebar onNavigate={(path) => navigate(path)} />

      <div className="flex-1 p-10 w-full">

        <p className="text-2xl font-bold text-gray-900 dark:text-white ">My Courses</p> <br></br>

        {/* Search + Filter Form */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-6">
          <input
            type="text"
            placeholder="Search by course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button
            onClick={() => console.log('Submit clicked')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Courses Table */}
        {loading ? (
          <p className="text-gray-700 dark:text-gray-200">Loading courses...</p>
        ) : (

          <>
            <h1>Courses feteched</h1>
            <p>"/courses/course_id" use this endpooint to fetch details about one course</p>
          </>


          // <div className="overflow-x-auto">
          //   <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          //     <thead>
          //       <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-left">
          //         <th className="px-4 py-2">ID</th>
          //         <th className="px-4 py-2">Course Name</th>
          //         <th className="px-4 py-2">Actions</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {filteredCourses.map((course) => (
          //         <tr key={course.id} className="border-t border-gray-300 dark:border-gray-600">
          //           <td className="px-4 py-2">{course.id}</td>
          //           <td className="px-4 py-2">{course.name}</td>
          //           <td className="px-4 py-2 flex flex-wrap gap-2">
          //             <button
          //               onClick={() => handleEdit(course.id)}
          //               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          //             >
          //               Edit
          //             </button>
          //             <button
          //               onClick={() => handleView(course.id)}
          //               className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          //             >
          //               View
          //             </button>
          //             <button
          //               onClick={() => handlePublish(course.id)}
          //               className={`${course.status === 'published'
          //                   ? 'bg-red-600 hover:bg-red-700'
          //                   : 'bg-green-600 hover:bg-green-700'
          //                 } text-white px-3 py-1 rounded text-sm`}
          //             >
          //               {course.status === 'published' ? 'Unpublish' : 'Publish'}
          //             </button>
          //           </td>
          //         </tr>
          //       ))}
          //       {filteredCourses.length === 0 && (
          //         <tr>
          //           <td colSpan="3" className="px-4 py-4 text-center text-gray-500 dark:text-gray-300">
          //             No courses found.
          //           </td>
          //         </tr>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
        )}
      </div>
    </div>
  );
}
