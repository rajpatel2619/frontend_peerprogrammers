import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
  Check,
  Gift,
  Bot,
  FileUser,
  Hourglass,
  FileCheck,
  Handshake,

} from "lucide-react";

// ---- Constants ----
const API = process.env.REACT_APP_API;

// ---- Helper: SVG Icons ----
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
  details: (
    <svg
      className="w-6 h-6 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
    </svg>
  ),
  module: (color = "text-blue-500") => (
    <svg className={`w-5 h-5 ${color}`} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const defaultFaqs = [
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

// ---- Reusable Details Sub-Component ----
const CourseDetailsList = ({ startDate, seats, mode }) => (
  <>
    {/* Key Details List */}
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-neutral-500 dark:text-neutral-400">
          Mode:
        </span>
        <span className="font-semibold text-neutral-800 dark:text-white">
          {mode}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-neutral-500 dark:text-neutral-400">
          Next Batch Starts:
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {startDate}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-neutral-500 dark:text-neutral-400">
          Seats Left:
        </span>
        <span className="font-semibold text-red-500 animate-pulse">
          {seats} (Hurry up!)
        </span>
      </div>
    </div>

    {/* Goodies List */}
    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-3 mt-4">
      <h3 className="text-md font-semibold text-neutral-800 dark:text-white mb-2">
        What you'll get:
      </h3>
      <div className="flex items-start gap-3">
        <FileCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Certificate of Completion
        </span>
      </div>
      <div className="flex items-start gap-3">
        <Hourglass className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Lifetime access to materials
        </span>
      </div>
      <div className="flex items-start gap-3">
        <FileUser className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Resume Building Sessions
        </span>
      </div>
      <div className="flex items-start gap-3">
        <Bot className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          AI mock interviews
        </span>
      </div>
      <div className="flex items-start gap-3">
        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Internship Opportunity
        </span>
      </div>
      <h3 className="text-md font-semibold text-neutral-800 dark:text-white mb-2">
        More Benefits:
      </h3>
      <div className="flex items-start gap-3">
        <Gift className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Goodies for top 5 performers
        </span>
      </div>
      <div className="flex items-start gap-3">
        <Handshake className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Direct referrals in MNC's
        </span>
      </div>
      
    </div>
  </>
);


// ---- Main Component ----
const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // ---- Modal states ----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formError, setFormError] = useState("");

  // ---- Load user from localStorage ----
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, []);

  // ---- Fetch Course Details ----
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/courses/${courseId}`);
        const data = await res.json();
        if (!data?.id || !data?.syllausContent)
          throw new Error("Course or syllabus not found.");
        const syllabus = JSON.parse(data.syllausContent);
        setCourse({ ...data, syllabus });
        if (syllabus.length > 0) setActiveModule(0);
      } catch (err)
      {
        setCourse(null);
        console.error("Failed to fetch course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  // ---- Fetch user-role-in-course ----
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
        setUserRole("none");
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchUserRole();
  }, [user, courseId]);

  // ---- Derived Price and Date Logic ----
  const discountedPriceInfo = useMemo(() => {
    if (!course) return { actual: 0, original: 0, percentOff: 0 };

    const actualPrice = course.price;
    const percentOff = 60 + Math.floor(Math.random() * 10); // [60-69]
    const discountDecimal = percentOff / 100;
    const originalPrice = actualPrice / (1 - discountDecimal);
    const roundedOriginalPrice = Math.round(originalPrice);

    return { 
      actual: actualPrice, 
      original: roundedOriginalPrice,
      percentOff: percentOff 
    };
  }, [course]); 

  const courseStartDate = useMemo(() => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    let startDate = new Date(); 

    if (dayOfMonth <= 15) {
      startDate.setDate(15);
    } else {
      startDate.setMonth(startDate.getMonth() + 1);
      startDate.setDate(1);
    }

    return startDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, []); 


  // ---- Toggle Curriculum Module ----
  const toggleModule = (index) =>
    setActiveModule(activeModule === index ? null : index);

  // ---- Payment Script Loader ----
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ---- Handle Order+Payment Flow ----
  const handlePayment = useCallback(
    async (orderData) => {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setFormError("Failed to load payment gateway. Please try again.");
        return;
      }

      try {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_RwT9P8i7ondJMg",
          amount: orderData.amount, 
          currency: orderData.currency,
          name: course.title,
          description: "Course Enrollment",
          order_id: orderData.order_id,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          handler: async function (response) {
            setIsModalOpen(false);

            try {
              const verifyPayload = {
                payment_id: orderData.payment_record_id, 
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                payment_method: "razorpay",
              };

              const res = await fetch(`${API}/buy/verify-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(verifyPayload),
              });

              const data = await res.json();
              console.log("Verify Payment Response:", data);

              if (res.ok) {
                setUserRole("student");
              } else {
                setFormError(data.detail || "Payment verification failed.");
              }
            } catch (verifyErr) {
              console.error("Verification Error:", verifyErr);
              setFormError("Payment verified, but registration failed.");
            }
          },
          modal: {
            ondismiss: () => setIsModalOpen(false),
          },
          theme: {
            color: "#2563eb",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        setFormError("An error occurred during payment. Please try again.");
        console.error("Payment error:", err);
      }
    },
    [course, formData, API, user]
  );

  // ---- Enrollment Form Submit ----
  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const orderBody = {
        name: formData.name,
        number: formData.phone,
        email: formData.email,
        amount: course.price, 
        course_id: course.id,
      };

      const response = await fetch(`${API}/buy/create-order-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.detail || "Failed to create order.");
        return;
      }

      console.log(data);

      await handlePayment(data); 
    } catch (error) {
      console.error("Error creating order:", error);
      setFormError("An error occurred while creating the order.");
    }
  };

  // ---- Register Button Helpers ----
  const getRegisterButtonText = () => {
    if (userRole === "student") return "Enrolled ✓";
    return "Enroll Now";
  };
  const isRegisterDisabled = () => userRole === "student";

  // ---- UPDATED Skeleton Loader ----
  const SkeletonLoader = () => (
    <div className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 animate-pulse">
      
      {/* === 1. SKELETON BANNER === */}
      <div className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-3/4 mb-4"></div>
              <div className="flex gap-2">
                  <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-full w-24"></div>
                  <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-full w-32"></div>
              </div>
          </div>
      </div>

      {/* === 2. SKELETON OVERLAP GRID === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column Skeletons */}
          <div className="lg:col-span-3 space-y-12">
            {/* Mobile-Only Skeleton Card */}
            <div className="lg:hidden bg-white dark:bg-neutral-950 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 overflow-hidden">
              <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="p-6">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/3 mb-4"></div>
                  <div className="space-y-3">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-5/6"></div>
                  </div>
              </div>
            </div>

            {/* Overview Skeleton Card */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl p-6 md:p-8 shadow-lg border border-neutral-100 dark:border-neutral-800">
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/3 mb-6"></div>
              <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-4/5"></div>
              </div>
            </div>

            {/* Curriculum Skeleton Card */}
            <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800">
              <div className="p-6">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/3 mb-6"></div>
                <div className="space-y-3">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800"></div>
                  <div className="p-6 space-y-4">
                      <div className="flex gap-3 items-baseline">
                          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/2"></div>
                          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/3"></div>
                      </div>
                      <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-3">
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-5/6"></div>
                      </div>
                  </div>
              </div>
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

  // ---- Reusable Enroll Button Component ----
  const EnrollButton = ({ className = "" }) => (
    <a
      href={`https://wa.me/918543832619?text=Hello%2C%20I'm%20interested%20in%20${course.title}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`block font-semibold text-center transition-all duration-300 transform ${className} ${
        isRegisterDisabled()
          ? "bg-neutral-800 cursor-not-allowed text-neutral-500 border border-neutral-700"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-blue-500/30"
      }`}
      onClick={(e) => {
        if (isRegisterDisabled()) e.preventDefault();
      }}
    >
      {getRegisterButtonText()}
    </a>
  );

  // ---- Main JSX ----
  return (
    <>
      <div className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        
        {/* === 1. NEW BIG TITLE BANNER (BOTTOM LAYER) === */}
        <div className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"> {/* Increased padding for banner height */}
                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                  {course.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {course.domain_tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
            </div>
        </div>

        {/* === 2. MAIN 2-COLUMN GRID (TOP LAYER, OVERLAPPING) === */}
        {/* Added relative, z-10, and negative margin (-mt-16) to pull this grid up over the banner */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-28 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content (Left Column) */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* TITLE SECTION REMOVED FROM HERE */}

              {/* Mobile-Only Details Card (with Image) */}
              <section className="lg:hidden bg-white dark:bg-neutral-950 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <img
                  src={course.cover_photo}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    Course Details
                  </h2>
                  <CourseDetailsList 
                    startDate={courseStartDate} 
                    seats={course.seats}
                    mode={"Hybrid"}
                  />
                </div>
              </section>

              {/* Course Description */}
              <section className="bg-white dark:bg-neutral-950 rounded-xl p-6 md:p-8 shadow-lg border border-neutral-100 dark:border-neutral-800">
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
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {course.syllabus && course.syllabus.length > 0 ? (
                    course.syllabus.map((module, index) => (
                      <div
                        key={index}
                        className="transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <button
                          type="button"
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
                <div className="flex items-center p-6 md:p-8">
                  <div className="mr-3 p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    {icons.faq}
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {defaultFaqs.map((faq, index) => (
                    <div key={index} className="px-6 py-5">
                      <button
                        type="button"
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
                        <ChevronDown
                          className={`w-5 h-5 text-neutral-500 dark:text-neutral-400 transform transition-transform ${
                            expandedFaq === index ? "rotate-180" : ""
                          }`}
                        />
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

            {/* Sticky Sidebar (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-4"> {/* top-24 assumes a ~6rem navbar height */}
                <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  {/* Image */}
                  <img
                    src={course.cover_photo}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6 space-y-4">
                    {/* Price with Percent */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                        ₹{discountedPriceInfo.actual}
                      </p>
                      <p className="text-xl font-medium text-neutral-500 line-through">
                        ₹{discountedPriceInfo.original}
                      </p>
                      <span className="text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400 px-2 py-0.5 rounded-md">
                        {discountedPriceInfo.percentOff}% OFF
                      </span>
                    </div>

                    {/* Enroll Button */}
                    <EnrollButton className="w-full px-8 py-3 rounded-lg text-lg" />

                    {/* Details List */}
                    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                      <CourseDetailsList 
                        startDate={courseStartDate} 
                        seats={course.seats}
                        mode={"Hybrid"} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Price with Percent */}
          <div>
             <p className="text-xl font-bold text-neutral-900 dark:text-white">
              ₹{discountedPriceInfo.actual}
            </p>
             <div className="flex items-center gap-2 mt-0.5">
                <p className="text-sm text-neutral-500 line-through">
                  ₹{discountedPriceInfo.original}
                </p>
                <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400 px-1.5 py-0.5 rounded">
                  {discountedPriceInfo.percentOff}% OFF
                </span>
              </div>
          </div>
          <EnrollButton className="flex-1 px-6 py-3 rounded-lg" />
        </div>
      </div>

      {/* Enrollment Modal (Shows ACTUAL price only) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                    Enroll in Course
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {course.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Modal Body */}
              <form onSubmit={handleEnrollmentSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="9876543210"
                  />
                </div>
                {formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}
                <div className="pt-4 flex flex-col items-center">
                  <div className="text-center mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Total Amount
                    </p>
                    {/* This correctly shows only the ACTUAL price */}
                    <p className="text-3xl font-bold text-neutral-800 dark:text-white">
                      ₹{course.price} 
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-neutral-900"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseDetails;