import React from "react";
import TeacherSidebar from "./components/TeacherSidebar";
import { FiUsers, FiBook, FiBarChart2, FiMessageSquare, FiCalendar, FiAward } from "react-icons/fi";

const TeacherDashboardLayout = () => {
  // Sample data - replace with your actual API calls
  const courses = [
    { id: 1, title: "Advanced React", enrolled: 42, completionRate: 78, revenue: 4200 },
    { id: 2, title: "Node.js Fundamentals", enrolled: 28, completionRate: 65, revenue: 2800 },
    { id: 3, title: "UI/UX Design", enrolled: 35, completionRate: 82, revenue: 3500 },
  ];

  const recentStudents = [
    { id: 1, name: "Alex Johnson", course: "Advanced React", joined: "2 days ago" },
    { id: 2, name: "Sam Wilson", course: "Node.js Fundamentals", joined: "5 days ago" },
    { id: 3, name: "Taylor Smith", course: "UI/UX Design", joined: "1 week ago" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Grade Module 3 assignments", due: "Tomorrow", course: "Advanced React" },
    { id: 2, title: "Prepare live Q&A session", due: "In 3 days", course: "UI/UX Design" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <TeacherSidebar onNavigate={(path) => console.log("Navigate to:", path)} />
      
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FiUsers className="text-blue-500" size={24} />}
            title="Total Students"
            value="105"
            change="+12% this month"
            trend="up"
          />
          <StatCard 
            icon={<FiBook className="text-green-500" size={24} />}
            title="Active Courses"
            value={courses.length}
            change="2 new this quarter"
          />
          <StatCard 
            icon={<FiBarChart2 className="text-purple-500" size={24} />}
            title="Avg. Completion"
            value="78%"
            change="+5% from last month"
            trend="up"
          />
          <StatCard 
            icon={<FiAward className="text-yellow-500" size={24} />}
            title="Student Rating"
            value="4.8/5"
            change="92% positive"
          />
        </div>

        {/* Courses Section */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Enrolled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {course.enrolled} students
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 mr-2">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500" 
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                          {course.completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ₹{course.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Students */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Students
            </h2>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
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
              <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center">
                View all students
              </button>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upcoming Tasks
            </h2>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.course} · Due {task.due}
                  </p>
                </div>
              ))}
              <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center">
                View all tasks
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
                <FiMessageSquare className="text-blue-500 mb-2" size={20} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Messages</span>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex flex-col items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/30 transition">
                <FiCalendar className="text-green-500 mb-2" size={20} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule</span>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex flex-col items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
                <FiBook className="text-purple-500 mb-2" size={20} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">New Course</span>
              </button>
              <button className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex flex-col items-center justify-center hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition">
                <FiBarChart2 className="text-yellow-500 mb-2" size={20} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, change, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
          <p className={`text-xs mt-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;