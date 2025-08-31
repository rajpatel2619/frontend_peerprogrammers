import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
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
  const [modules, setModules] = useState([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);

  const toggleModule = (index) => {
    setActiveModule(activeModule === index ? null : index);
  };

  // Colorful icons for different sections
  const icons = {
    overview: (
      <svg
        className="w-6 h-6 text-purple-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    curriculum: (
      <svg
        className="w-6 h-6 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    faq: (
      <svg
        className="w-6 h-6 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    instructor: (
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    details: (
      <svg
        className="w-6 h-6 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    resources: (
      <svg
        className="w-6 h-6 text-indigo-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
      </svg>
    ),
    module: (color = "text-blue-500") => (
      <svg
        className={`w-5 h-5 ${color}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    lesson: (color = "text-green-500") => (
      <svg
        className={`w-4 h-4 ${color}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  // Sample FAQ data - replace with your actual data
  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer:
        "Basic programming knowledge is recommended but not required. We'll cover everything you need to know from the ground up.",
      icon: icons.module("text-purple-500"),
    },
    {
      question: "How long will I have access to the course materials?",
      answer:
        "You'll have lifetime access to all course materials, including future updates.",
      icon: icons.module("text-blue-500"),
    },
    {
      question: "Will I receive a certificate upon completion?",
      answer:
        "Yes, you'll receive a verifiable certificate of completion after finishing all modules and assignments.",
      icon: icons.module("text-green-500"),
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log(storedUser);
  }, []);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`${API}/courses/${courseId}`);
        const data = await res.json();
        console.log(data);
        console.log(data.syllausContent);
        if (!data?.id) throw new Error("Course not found.");

        if (!data?.syllausContent) throw new Error("Syllabus not found.");

        const syllabus = JSON.parse(data.syllausContent);

        console.log(syllabus);

        setCourse({ ...data, syllabus });
        if (syllabus.length > 0) {
          setActiveModule(syllabus[0]);
        }
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // ✅ Fetch user role in this course
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id || !courseId) return;
      try {
        const res = await fetch(
          `${API}/registrations/role-in-course/?user_id=${user.id}&course_id=${courseId}`
        );
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
    <div className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Cover Photo Skeleton */}
      <div className="w-full h-96 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content Skeleton */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Overview Skeleton */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl p-8 shadow-lg border border-neutral-100 dark:border-neutral-800 animate-pulse">
              <div className="flex items-center mb-6">
                <div className="mr-3 w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
              </div>
            </div>

            {/* Curriculum Skeleton */}
            <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-pulse">
              <div className="flex items-center p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="mr-3 w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full mr-4"></div>
                        <div className="h-6 w-56 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                      </div>
                      <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Skeleton */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg overflow-hidden border border-neutral-100 dark:border-neutral-800 animate-pulse">
              <div className="flex items-center p-8">
                <div className="mr-3 w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 w-6 h-6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                        <div className="h-6 w-64 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                      </div>
                      <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Course Details Skeleton */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl p-6 shadow-lg border border-neutral-100 dark:border-neutral-800 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="mr-3 w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div className="h-7 w-36 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>

              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded mb-2"></div>
                    <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Register Button Skeleton */}
            <div className="sticky top-6">
              <div className="w-full h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse"></div>
            </div>
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
    <div className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={course.cover_photo}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end pb-12">
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
                      className="px-3 py-1 bg-black/40 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/10"
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
                      ? "bg-neutral-800 cursor-not-allowed text-neutral-500 border border-neutral-700"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-blue-500/30"
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
            <section className="bg-white dark:bg-neutral-950 rounded-xl p-8 shadow-lg border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center mb-6">
                <div className="mr-3 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  {icons.overview}
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Course Overview
                </h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {course.description}
              </p>
            </section>

            {/* Curriculum / Modules */}
            <section className="bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              {/* Header */}
              <div className="flex items-center p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="mr-3 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <BookOpen
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Curriculum
                </h2>
              </div>

              {/* Modules */}
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {course.syllabus && course.syllabus.length > 0 ? (
                  course.syllabus.map((module, index) => (
                    <div
                      key={index}
                      className="transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    >
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(index)}
                        className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                      >
                        <div className="flex items-center">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold mr-4">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                            {module.title}
                          </h3>
                        </div>
                        {activeModule === index ? (
                          <ChevronUp className="text-neutral-500 dark:text-neutral-400" />
                        ) : (
                          <ChevronDown className="text-neutral-500 dark:text-neutral-400" />
                        )}
                      </button>

                      {/* Lessons Dropdown with Animation */}
                      <AnimatePresence>
                        {activeModule === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-10 pb-4 space-y-2"
                          >
                            {module.lessons.length > 0 ? (
                              module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center gap-3 py-2 text-neutral-700 dark:text-neutral-300"
                                >
                                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                                  {lesson.title}
                                </div>
                              ))
                            ) : (
                              <p className="text-neutral-500 dark:text-neutral-400">
                                No lessons available.
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <p className="p-6 text-neutral-500 dark:text-neutral-400">
                    No curriculum data available.
                  </p>
                )}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center p-8">
                <div className="mr-3 p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  {icons.faq}
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6">
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="flex justify-between items-center w-full text-left"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">{faq.icon}</div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <svg
                        className={`w-5 h-5 text-neutral-500 dark:text-neutral-400 transform transition-transform ${
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
                      <div className="mt-4 ml-9 text-neutral-600 dark:text-neutral-300">
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
            {/* Course Details */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl p-6 shadow-lg border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                  {icons.details}
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Course Details
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Mode
                  </h3>
                  <p className="text-neutral-900 dark:text-white">
                    {course.mode}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Duration
                  </h3>
                  <p className="text-neutral-900 dark:text-white">
                    {course.start_date} to {course.end_date}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Seats Available
                  </h3>
                  <p className="text-neutral-900 dark:text-white">
                    {course.seats}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Price
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                    ₹{course.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="sticky top-6">
              <button
                disabled={isRegisterDisabled()}
                onClick={handleRegister}
                className={`w-full px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 transform ${
                  isRegisterDisabled()
                    ? "bg-neutral-800 cursor-not-allowed text-neutral-500 border border-neutral-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-blue-500/30"
                }`}
              >
                <div className="flex items-center justify-center">
                  {!isRegisterDisabled() && (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
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
