import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./components/StudentSidebar";

const mockData = {
  userName: "Jane Doe",
  currentEnrollments: [
    { title: "Web Development Basics", progress: 55 },
    { title: "Introduction to AI", progress: 80 },
  ],
  upcomingDeadlines: [
    { title: "Quiz 2: Web Development", dueDate: "July 17" },
    { title: "AI Project Proposal", dueDate: "July 20" },
  ],
  recentActivity: [
    'You completed "HTML Basics" module.',
    "New announcement: Live Q&A on July 18.",
  ],
  performanceOverview: {
    "Web Development Basics": 92,
    "Introduction to AI": 87,
    overallProgress: 70,
  },
  certificates: [{ title: "HTML Foundations Certificate", link: "#" }],
  recommendedCourses: [
    {
      title: "JavaScript Essentials",
      description:
        "Learn the fundamentals of JavaScript, the most popular programming language for web development.",
      image: "/man.png",
      link: "#",
    },
    {
      title: "Machine Learning Basics",
      description:
        "Introduction to machine learning concepts and techniques for beginners.",
      image: "/raj.png",
      link: "#",
    },
  ],
  resources: [
    { title: "Discussion Forum", link: "#" },
    { title: "Help Center", link: "#" },
  ],
  messages: [
    "Instructor: Feedback on your last quiz.",
    "Classmate: Study group on Friday?",
  ],
};

export default function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <StudentSidebar onLogout={handleLogout} />
      <main className="flex-grow p-8">
        <section className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            Welcome, {mockData.userName}{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Start your learning journey!
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Current Enrollments
              </h2>
              {mockData.currentEnrollments.map((course, idx) => (
                <div
                  key={idx}
                  className="mb-4 bg-gray-100 dark:bg-gray-700 p-4 rounded"
                >
                  <h3 className="font-bold dark:text-white">{course.title}</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mt-1">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Progress: {course.progress}%{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 ml-2"
                    >
                      Continue
                    </a>
                  </p>
                </div>
              ))}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Upcoming Deadlines
              </h2>
              {mockData.upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="mb-2 bg-gray-100 dark:bg-gray-700 rounded p-3 flex items-center space-x-3"
                >
                  <span className="dark:text-white">{item.title}</span>
                  <span className="bg-yellow-400 dark:bg-green-700 text-blue-900 dark:text-white text-xs px-4 py-2 rounded-full whitespace-nowrap font-semibold">
                    Due: {item.dueDate}
                  </span>
                </div>
              ))}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Recent Activity &amp; Announcements
              </h2>
              {mockData.recentActivity.map((activity, idx) => (
                <p
                  key={idx}
                  className="mb-2 bg-gray-100 dark:bg-gray-700 p-2 rounded dark:text-gray-300"
                >
                  {activity}
                </p>
              ))}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Performance Overview
              </h2>
              {Object.entries(mockData.performanceOverview).map(
                ([course, value]) => {
                  if (course === "overallProgress") return null;
                  return (
                    <p key={course} className="text-black dark:text-gray-300">
                      {course}: <span className="font-bold">{value}%</span>{" "}
                      (Quizzes avg.)
                    </p>
                  );
                }
              )}
              <p className="text-black dark:text-gray-300">
                Overall Progress:{" "}
                <span className="font-bold">
                  {mockData.performanceOverview.overallProgress}%
                </span>
              </p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Certificates &amp; Achievements
              </h2>
              {mockData.certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center border border-gray-200 dark:border-gray-700 rounded px-4 py-3 mb-2 ${
                    cert.title === "HTML Foundations Certificate"
                      ? "bg-gray-100 dark:bg-gray-700 p-2 rounded"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <span className="text-base font-normal dark:text-gray-300">
                    {cert.title}
                  </span>
                  <a
                    href={cert.link}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    View
                  </a>
                </div>
              ))}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Recommended Courses
              </h2>
              {mockData.recommendedCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="mb-4 flex items-start space-x-4 bg-gray-50 dark:bg-gray-700 p-3 rounded"
                >
                  <img
                    src={process.env.PUBLIC_URL + course.image}
                    alt={course.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {course.description}
                    </p>
                    <a
                      href={course.link}
                      className="mt-2 inline-block bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Explore
                    </a>
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Resources &amp; Support
              </h2>
              {mockData.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.link}
                  className="block mb-2 text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 rounded px-3 py-1"
                >
                  {resource.title}
                </a>
              ))}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 dark:text-white">
                Messages
              </h2>
              {mockData.messages.map((msg, idx) => (
                <p
                  key={idx}
                  className="border-l-4 border-blue-500 pl-4 mb-3 bg-gray-100 dark:bg-gray-700 p-3 rounded dark:text-gray-300"
                >
                  {msg}
                </p>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
