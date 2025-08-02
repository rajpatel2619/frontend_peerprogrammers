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
      if (!user?.id || !courseId) {
        console.warn("Missing user or courseId:", { userId: user?.id, courseId });
        return;
      }
  
      try {
        const query = new URLSearchParams({
          user_id: String(user.id),
          course_id: String(courseId),
        }).toString();
  
        const url = `${API}/registrations/role-in-course?${query}`;
        console.log("🔍 Fetching role from:", url);
  
        const res = await fetch(url);
        if (!res.ok) {
          const errMsg = await res.text();
          console.error("❌ API returned error:", res.status, errMsg);
          return;
        }
  
        const data = await res.json();
        setUserRole(data.role || "none");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
  
    fetchUserRole();
  }, [user, courseId]);
  

  useEffect(() => {
    if (userRole) {
      console.log("✅ Updated role:", userRole);
    }
  }, [userRole]);
  
  

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

          const verifyRes = await fetch(`${API}/registrations/verify?${verifyQuery}`, {
            method: "POST",
          });

          const verifyData = await verifyRes.json();
          console.log("✅ Payment Verified:", verifyData);
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

  if (loading)
    return <div className="text-center py-10 text-gray-800">Loading...</div>;

  if (!course)
    return (
      <div className="text-center py-10 text-red-600">Course not found.</div>
    );

  const getRegisterButtonText = () => {
    if (!user) return "Login to Register";
    if (userRole === "creator") return "Creator";
    if (userRole === "mentor") return "Mentor";
    if (userRole === "student") return "Already Registered";
    return "Register Now";
  };

  const isRegisterDisabled = () => {
    return !user || userRole !== "none";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 pt-10 text-gray-900 dark:text-white">
      {/* Cover Photo and Title */}
      <div className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden rounded-xl mb-8">
        <img
          src={course.cover_photo}
          alt="Course Cover"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute bottom-4 left-6 text-3xl sm:text-4xl font-bold text-white drop-shadow-xl">
          {course.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-6">
          {/* Tags */}
          {course.domain_tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {course.domain_tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {course.description}
            </p>
          </div>

          {/* Syllabus */}
          {course.syllabus_link && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
              <a
                href={course.syllabus_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View / Download Syllabus
              </a>
            </div>
          )}

          {/* Chat Link */}
          {course.chatLink && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Chat Group</h2>
              <a
                href={course.chatLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Join Course Chat
              </a>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Authors</h2>
          {course.mentors?.length > 0 ? (
            course.mentors.map((mentor, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-white dark:bg-neutral-800 shadow"
              >
                <p className="font-semibold">
                  <Link
                    to={`/profiles/t/${mentor.user_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {mentor.name || `Mentor #${mentor.user_id}`}
                  </Link>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mentor.email || "Email not available"}
                </p>
              </div>
            ))
          ) : (
            <p>No mentors listed.</p>
          )}

          <div className="border-t pt-4">
            <p>
              <strong>Mode:</strong> {course.mode}
            </p>
            <p>
              <strong>Seats:</strong> {course.seats}
            </p>
            <p>
              <strong>Start:</strong> {course.start_date}
            </p>
            <p>
              <strong>End:</strong> {course.end_date}
            </p>
          </div>
        </div>
      </div>

      {/* Register Section */}
      <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl font-semibold text-gray-800 dark:text-white">
          ₹{course.price}
        </div>
        <button
          disabled={isRegisterDisabled()}
          onClick={handleRegister}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            isRegisterDisabled()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {getRegisterButtonText()}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
