import React, { useEffect, useState } from "react";
import TeacherSidebar from "./components/TeacherSidebar";

import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiBook,
  FiBarChart2,
  FiMessageSquare,
  FiCalendar,
  FiAward
} from "react-icons/fi";


const API = process.env.REACT_APP_API;

// Pass userId as a prop to this component
const TeacherDashboardLayout = () => {

  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);

  // Hardcoded/placeholder data — RED BORDER!
  const recentStudents = [
    { id: 1, name: "Alex Johnson", course: "Advanced React", joined: "2 days ago" },
    { id: 2, name: "Sam Wilson", course: "Node.js Fundamentals", joined: "5 days ago" },
    { id: 3, name: "Taylor Smith", course: "UI/UX Design", joined: "1 week ago" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Grade Module 3 assignments", due: "Tomorrow", course: "Advanced React" },
    { id: 2, title: "Prepare live Q&A session", due: "In 3 days", course: "UI/UX Design" },
  ];

  useEffect(() => {
    if(!userId){
      navigate('/login');
      return;
    }
    // Fetch dashboard summary data
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/dashboard/summary/${userId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success) setSummary(data.data);
        else throw new Error("API did not return success");
      } catch (err) {
        setError(`Summary: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch teacher's courses
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/courses/created-by/${userId}`);
        if (!res.ok) throw new Error(`HTTP error! Courses status: ${res.status}`);
        const data = await res.json();
        if (data.success) setCourses(data.courses);
        else setCourses([]);
      } catch (err) {
        setError(`Courses: ${err.message}`);
      }
    };

    fetchSummary();
    fetchCourses();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600 dark:text-gray-300">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <TeacherSidebar onNavigate={path => console.log("Navigate to:", path)} />

      <div className="flex-1 p-6 mt-10 md:p-10 w-full overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Teacher Dashboard
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Cards (live from API) */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<FiUsers className="text-blue-500" size={24} />}
              title="Total Students"
              value={summary.total_students}
              change={`${summary.student_growth_percent} this month`}
              trend={parseInt(summary.student_growth_percent) >= 0 ? "up" : "down"}
            />
            <StatCard
              icon={<FiBook className="text-green-500" size={24} />}
              title="Active Courses"
              value={summary.active_courses}
              change={`${summary.new_courses_this_quarter} new this quarter`}
            />
            <StatCard
              icon={<FiBarChart2 className="text-purple-500" size={24} />}
              title="Avg. Completion"
              value={summary.avg_completion_percent}
              change="vs last month"
              trend="up"
            />
            <StatCard
              icon={<FiAward className="text-yellow-500" size={24} />}
              title="Student Rating"
              value={summary.student_rating}
              change={`${summary.percent_positive_rating} positive`}
            />
          </div>
        )}

        {/* Courses Table (live from API) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Courses
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Seats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Current Status</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
  <a
    href={`/courses/${course.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline dark:text-blue-400"
  >
    {course.title}
  </a>
</td>

                      <td className="px-6 py-4 whitespace-nowrap">{course.mode}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{course.seats ?? "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{course.price ? `₹${course.price}` : "Free"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.is_published ? "Published" : "Unpublished"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 dark:text-blue-400 mr-3">View</button>
                        <button className="text-gray-600 dark:text-gray-400">Edit</button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Students (hardcoded, RED BORDER) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6" style={{ border: "2px solid #f87171" }}> {/* Red 400 Tailwind shade */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Students <span className="text-xs text-red-400">(Hardcoded)</span>
            </h2>
            <div className="space-y-4">
              {recentStudents.map(student => (
                <div key={student.id} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {student.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {student.course} · {student.joined}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks (hardcoded, RED BORDER) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6" style={{ border: "2px solid #f87171" }}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upcoming Tasks <span className="text-xs text-red-400">(Hardcoded)</span>
            </h2>
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div key={task.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.course} · Due {task.due}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions (not hardcoded, no border) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex flex-col items-center">
                <FiMessageSquare className="text-blue-500 mb-2" size={20} />
                Messages
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex flex-col items-center">
                <FiCalendar className="text-green-500 mb-2" size={20} />
                Schedule
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex flex-col items-center">
                <FiBook className="text-purple-500 mb-2" size={20} />
                New Course
              </button>
              <button className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex flex-col items-center">
                <FiBarChart2 className="text-yellow-500 mb-2" size={20} />
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// StatCard (unchanged)
const StatCard = ({ icon, title, value, change, trend }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        {change &&
          <p className={`text-xs mt-2 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {change}
          </p>
        }
      </div>
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">{icon}</div>
    </div>
  </div>
);

export default TeacherDashboardLayout;
