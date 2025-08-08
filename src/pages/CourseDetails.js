import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API;

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Colorful icons for different sections
  const icons = {
    overview: (
      <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    curriculum: (
      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    faq: (
      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    instructor: (
      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    details: (
      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    resources: (
      <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    module: (color = "text-blue-500") => (
      <svg className={`w-5 h-5 ${color}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
    ),
    lesson: (color = "text-green-500") => (
      <svg className={`w-4 h-4 ${color}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
    )
  };

  // Sample FAQ data - replace with your actual data
  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer: "Basic programming knowledge is recommended but not required. We'll cover everything you need to know from the ground up.",
      icon: icons.module("text-purple-500")
    },
    {
      question: "How long will I have access to the course materials?",
      answer: "You'll have lifetime access to all course materials, including future updates.",
      icon: icons.module("text-blue-500")
    },
    {
      question: "Will I receive a certificate upon completion?",
      answer: "Yes, you'll receive a verifiable certificate of completion after finishing all modules and assignments.",
      icon: icons.module("text-green-500")
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`${API}/courses/${courseId}`);
        const data = await res.json();
        if (!data?.id) throw new Error("Course not found.");
        setCourse(data);
        if (data.modules && data.modules.length > 0) {
          setActiveModule(data.modules[0]);
        }
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id || !courseId) return;
      try {
        const query = new URLSearchParams({
          user_id: String(user.id),
          course_id: String(courseId),
        }).toString();
        const res = await fetch(`${API}/registrations/role-in-course?${query}`);
        const data = await res.json();
        setUserRole(data.role || "none");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchUserRole();
  }, [user, courseId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (userRole !== "none") return;

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    try {
      const query = new URLSearchParams({
        user_id: user.id,
        course_id: courseId,
        amount: course.price,
      }).toString();

      const res = await fetch(`${API}/registrations/create-order?${query}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Order creation failed");

      const options = {
        key: "rzp_test_RwT9P8i7ondJMg",
        amount: data.amount,
        currency: data.currency,
        name: course.title,
        description: "Course Enrollment",
        order_id: data.order_id,
        handler: async function (response) {
          const verifyQuery = new URLSearchParams({
            user_id: user.id,
            course_id: courseId,
            transaction_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            fee: course.price,
            email: user.email || "",
            contact: user.phone || "",
            payment_method: "razorpay",
          }).toString();

          const verifyRes = await fetch(
            `${API}/registrations/verify?${verifyQuery}`,
            {
              method: "POST",
            }
          );
          const verifyData = await verifyRes.json();
          setUserRole("student");
        },
        prefill: {
          name: user.name || "Student",
          email: user.email || "student@example.com",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err.message || err);
    }
  };

  const getRegisterButtonText = () => {
    if (!user) return "Login to Register";
    if (userRole === "creator") return "You're the Creator";
    if (userRole === "mentor") return "You're a Mentor";
    if (userRole === "student") return "Enrolled ✓";
    return "Enroll Now";
  };

  const isRegisterDisabled = () => {
    return !user || userRole !== "none";
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full">
      {/* Cover Photo Skeleton */}
      <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="h-12 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse w-full"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="p-6 h-48 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (!course)
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        Course not found
      </div>
    );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={course.cover_photo}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {course.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {course.domain_tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <button
                  disabled={isRegisterDisabled()}
                  onClick={handleRegister}
                  className={`px-8 py-3 rounded-xl font-medium text-lg transition-all duration-300 transform ${
                    isRegisterDisabled()
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {getRegisterButtonText()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Course Description */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="mr-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  {icons.overview}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Overview
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {course.description}
              </p>
            </section>

            {/* Curriculum / Modules */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="flex items-center p-8 pb-0">
                <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  {icons.curriculum}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Curriculum
                </h2>
              </div>
              <div className="p-8 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {course.modules?.map((module, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveModule(module)}
                      className={`p-6 rounded-lg cursor-pointer transition ${
                        activeModule === module
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800"
                          : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                            activeModule === module
                              ? "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 text-blue-600 dark:text-blue-300"
                              : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          <span className="font-medium">{index + 1}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {module}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {activeModule && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {activeModule}
                    </h3>
                    <div className="space-y-4">
                      {/* Sample lesson content - replace with your actual data */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 dark:text-white">
                            Introduction to {activeModule}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Video · 15 min
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 dark:text-white">
                            {activeModule} Core Concepts
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Video · 22 min
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 dark:text-white">
                            {activeModule} Practical Exercise
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Assignment · 45 min
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="flex items-center p-8">
                <div className="mr-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  {icons.faq}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6">
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="flex justify-between items-center w-full text-left"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          {faq.icon}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="mt-4 ml-9 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Instructors */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  {icons.instructor}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Instructors
                </h2>
              </div>
              <div className="space-y-4">
                {course.mentors?.length > 0 ? (
                  course.mentors.map((mentor, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 overflow-hidden">
                        {mentor.avatar ? (
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-yellow-500">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          to={`/profiles/t/${mentor.user_id}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {mentor.name || `Mentor ${mentor.user_id}`}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {mentor.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No instructors listed
                  </p>
                )}
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  {icons.details}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Course Details
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mode
                  </h3>
                  <p className="text-gray-900 dark:text-white">{course.mode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {course.start_date} to {course.end_date}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Seats Available
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {course.seats}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Price
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                    ₹{course.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  {icons.resources}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resources
                </h2>
              </div>
              <div className="space-y-3">
                {course.syllabus_link && (
                  <a
                    href={course.syllabus_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:underline group"
                  >
                    <div className="mr-2 p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition">
                      <svg
                        className="w-5 h-5 text-blue-500 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                    Download Syllabus
                  </a>
                )}
                {course.chatLink && (
                  <a
                    href={course.chatLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-green-600 dark:text-green-400 hover:underline group"
                  >
                    <div className="mr-2 p-1 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition">
                      <svg
                        className="w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"></path>
                      </svg>
                    </div>
                    Join Course Group
                  </a>
                )}
                {course.lectureLink && (
                  <a
                    href={course.lectureLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-red-600 dark:text-red-400 hover:underline group"
                  >
                    <div className="mr-2 p-1 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition">
                      <svg
                        className="w-5 h-5 text-red-500 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    Join Live Lectures
                  </a>
                )}
              </div>
            </div>
            
            {/* Register Button */}
            <div className="sticky top-6">
              <button
                disabled={isRegisterDisabled()}
                onClick={handleRegister}
                className={`w-full px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 transform ${
                  isRegisterDisabled()
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                <div className="flex items-center justify-center">
                  {!isRegisterDisabled() && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  )}
                  {getRegisterButtonText()}
                </div>
                {!isRegisterDisabled() && (
                  <div className="text-sm font-normal mt-1 opacity-80">
                    Start learning today!
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;