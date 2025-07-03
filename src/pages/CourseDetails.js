import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const API = process.env.REACT_APP_API; // e.g. Vite/CRA env

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/all-courses`);
        const data = await res.json();
        const allCourses = data.courses || [];
        const selected = allCourses.find(
          (c) => String(c.id) === String(courseId)
        );
        setCourse(selected);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courseId]);

  if (loading) return <div className="text-gray-900 dark:text-white p-10">Loading...</div>;
  if (!course) return <div className="text-gray-900 dark:text-white p-10">Course not found.</div>;

  // Instructors as array
  let instructors = [];
  if (Array.isArray(course.creator_ids)) {
    instructors = course.creator_ids;
  } else if (course.creator_ids) {
    instructors = [course.creator_ids];
  }

  // Plans
  const plans = ["basic_plan", "premium_plan", "ultra_plan"]
    .map((planKey) => ({
      name: planKey.replace("_", " "),
      ...course[planKey],
    }))
    .filter((p) => p.price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900 dark:text-white space-y-10">
      {/* TITLE + DESCRIPTION */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl space-y-3 border border-gray-200 dark:border-neutral-700">
        <div className="flex flex-wrap gap-2 mb-2">
          {course.domains?.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white"
            >
              {typeof tag === "object" ? tag.name : tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-gray-600 dark:text-neutral-300">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* SIDEBAR */}
        <div className="order-1 lg:order-2 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* Instructor Box */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-3">
              Instructor{instructors.length > 1 ? "s" : ""}
            </h2>

            {instructors.length > 0 ? (
              instructors.map((inst, index) => (
                <div key={index} className="flex items-start gap-4 mb-6">
                  {inst.avatar && (
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{inst.name}</h3>
                    <p className="text-gray-600 dark:text-neutral-400 mt-1">{inst.bio}</p>
                    <div className="flex gap-4 mt-2">
                      {inst.linkedin && (
                        <a
                          href={inst.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          <FaLinkedin size={16} /> LinkedIn
                        </a>
                      )}
                      {inst.portfolio && (
                        <a
                          href={inst.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          <FaGlobe size={16} /> Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-neutral-400">
                No instructor details available.
              </p>
            )}
          </div>

          {/* Course Details Box */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold mb-2">Course Details:</h3>
            <ul className="text-sm text-gray-600 dark:text-neutral-300 space-y-1">
              <li>
                📅 Start:{" "}
                <span className="text-gray-900 dark:text-white">
                  {course.start_date || "TBA"}
                </span>
              </li>
              <li>
                ⏰ End:{" "}
                <span className="text-gray-900 dark:text-white">
                  {course.end_date || "TBA"}
                </span>
              </li>
              <li>
                🖥️ Mode:{" "}
                <span className="text-gray-900 dark:text-white">{course.mode}</span>
              </li>
              {course.syllabus_link && (
                <li>
                  <a
                    href={course.syllabus_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Syllabus
                  </a>
                </li>
              )}
              {course.mode === "recorded" && course.lecture_link && (
                <li>
                  <a
                    href={course.lecture_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200"
                  >
                    Enroll Now
                  </a>
                </li>
              )}
            </ul>

            {plans.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mt-4">Plans:</h3>
                <ul className="space-y-3">
                  {plans.map((plan, i) => (
                    <li
                      key={i}
                      className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-md border border-gray-200 dark:border-neutral-700"
                    >
                      <p className="text-lg font-bold capitalize text-gray-900 dark:text-white">
                        {plan.name}
                      </p>
                      <p className="text-gray-600 dark:text-neutral-300">
                        Price:{" "}
                        <span className="text-gray-900 dark:text-white">
                          ₹{plan.price}
                        </span>
                      </p>
                      <p className="text-gray-600 dark:text-neutral-300">
                        Seats:{" "}
                        <span className="text-gray-900 dark:text-white">
                          {plan.seats}
                        </span>
                      </p>
                      {plan.whatsapp && (
                        <a
                          href={plan.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          Join WhatsApp Group
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-3">Course Overview</h2>
            <p className="text-gray-600 dark:text-neutral-300">{course.description}</p>
          </div>

          {course.whatYouWillLearn?.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
              <h2 className="text-2xl font-semibold mb-3">
                What You Will Learn
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-neutral-300 space-y-1">
                {course.whatYouWillLearn.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {course.content?.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
              <h2 className="text-2xl font-semibold mb-3">Course Content</h2>
              <div className="space-y-3">
                {course.content.map((section, i) => (
                  <details
                    key={i}
                    className="bg-gray-100 dark:bg-neutral-800 rounded-md px-4 py-3 border border-gray-200 dark:border-neutral-700"
                  >
                    <summary className="font-medium text-lg cursor-pointer text-gray-900 dark:text-white">
                      {section.title}
                    </summary>
                    <ul className="list-disc list-inside text-gray-600 dark:text-neutral-400 mt-2 pl-4">
                      {section.topics.map((topic, j) => (
                        <li key={j}>{topic}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-neutral-300 space-y-1">
              <li>Basic computer skills and internet access</li>
              <li>Willingness to learn and solve real-world problems</li>
              <li>Curiosity and consistency — that's all you really need!</li>
              <li>Stable internet connection for accessing course content</li>
              <li>
                Basic familiarity with using the terminal/command line (helpful
                but not required)
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <details className="bg-gray-100 dark:bg-neutral-800 rounded-md px-4 py-3 border border-gray-200 dark:border-neutral-700">
                <summary className="font-medium text-lg cursor-pointer text-gray-900 dark:text-white">
                  Is this course beginner-friendly?
                </summary>
                <p className="text-gray-600 dark:text-neutral-400 mt-2 pl-1">
                  Yes, this course is designed for beginners and those looking
                  to build solid fundamentals.
                </p>
              </details>
              <details className="bg-gray-100 dark:bg-neutral-800 rounded-md px-4 py-3 border border-gray-200 dark:border-neutral-700">
                <summary className="font-medium text-lg cursor-pointer text-gray-900 dark:text-white">
                  Will I receive a certificate?
                </summary>
                <p className="text-gray-600 dark:text-neutral-400 mt-2 pl-1">
                  Yes, you will receive a certificate of completion after the
                  course.
                </p>
              </details>
              <details className="bg-gray-100 dark:bg-neutral-800 rounded-md px-4 py-3 border border-gray-200 dark:border-neutral-700">
                <summary className="font-medium text-lg cursor-pointer text-gray-900 dark:text-white">
                  What is the refund policy?
                </summary>
                <p className="text-gray-600 dark:text-neutral-400 mt-2 pl-1">
                  We offer a 100% money-back guarantee if you are not satisfied
                  before the course ends.
                </p>
              </details>
            </div>
          </div>

          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline block"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>

      {/* Mobile Sticky Buy Button */}
      {plans[0] && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 px-6 py-4 border-t border-gray-200 dark:border-neutral-700 lg:hidden z-50">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              ₹{plans[0].price}
            </div>
            {plans[0].whatsapp && (
              <a
                href={plans[0].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition duration-200"
              >
                Register Now
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
