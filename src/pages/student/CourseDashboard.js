import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';

const API = process.env.REACT_APP_API;

export default function CourseDetails() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API}/courses_all_details/${courseId}`);
        const data = await res.json();
        setCourseDetails(data);
      } catch (err) {
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [courseId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!courseDetails) return <p className="p-4 text-red-600">Course not found</p>;

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
  } = courseDetails;

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h1>

        {/* Stylish Tabs */}
        <div className="mb-6">
          <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {['overview', 'resources', 'participants'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 capitalize text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-2">
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₹{price}</p>
            <p><strong>Seats:</strong> {seats}</p>
            {lecture_link && (
              <p><strong>Lecture Link:</strong> <a href={lecture_link} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{lecture_link}</a></p>
            )}
            {chatLink && (
              <p><strong>Chat Link:</strong> <a href={chatLink} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{chatLink}</a></p>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            {syllabus_link ? (
              <a
                href={syllabus_link}
                download
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              >
                📄 Download Syllabus
              </a>
            ) : (
              <p>No syllabus available.</p>
            )}
            {syllausContent && (
              <div>
                <h2 className="text-xl font-semibold mt-4 mb-2">Syllabus Content</h2>
                <p className="bg-white dark:bg-gray-800 p-3 rounded shadow">{syllausContent}</p>
              </div>
            )}
          </div>
        )}

        {/* Participants Tab */}
        {activeTab === 'participants' && (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
            {students?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-3">Sr No.</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i} className="border-t dark:border-gray-600">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-3 text-gray-600">No students registered yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
