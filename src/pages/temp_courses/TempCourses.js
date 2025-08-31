import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // ← Updated for React Router
import courses from "./data/courses";

export default function TempCourses() {
  const tagColors = {
    AI: "bg-blue-500",
    Frontend: "bg-purple-500",
    Backend: "bg-orange-500",
    Fullstack: "bg-teal-500",
    Advanced: "bg-pink-500",
    Beginner: "bg-indigo-500",
    Intermediate: "bg-gray-500",
    SystemDesign: "bg-yellow-500",
    Bestseller: "bg-green-500",
    New: "bg-red-500",
    Free: "bg-lime-500",
  };

  const [activeTab, setActiveTab] = useState("ongoing");
  const tabs = ["upcoming", "ongoing", "completed"];

  return (
    <div className="flex flex-col items-center pt-8 min-h-screen bg-[#1c1c22]">
      <div className="text-3xl md:text-5xl font-bold text-white text-center">
        Our Courses
      </div>

      {/* Tabs */}
      <div className="relative flex space-x-4 mt-6 border-b border-neutral-700">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-medium capitalize transition-all duration-300 ${
              activeTab === tab ? "text-white" : "text-neutral-400 hover:text-white"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: activeTab === tab ? 1.1 : 1,
            }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                className="absolute left-0 bottom-0 h-1 w-full bg-[#00ff99]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Cards */}
      <div className="w-full px-5 sm:px-7 lg:px-8 mt-8 max-w-5xl mx-auto max-h-[70vh] overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {courses[activeTab].map((course, index) => {
              const isCompleted = activeTab === "completed";
              const isUpcoming = activeTab === "upcoming";

              return (
                <div
                  key={index}
                  className={`relative w-full border border-neutral-700 rounded-xl p-5 md:p-6 shadow-md flex flex-col justify-between transition overflow-hidden
                      ${
                        isCompleted
                          ? "bg-neutral-800 opacity-60 grayscale cursor-not-allowed"
                          : isUpcoming
                          ? "bg-neutral-800"
                          : "bg-neutral-900 hover:shadow-xl"
                      }`}
                >
                  {isCompleted && (
                    <div className="absolute top-4 text-center -right-10 rotate-45 bg-green-700 text-white text-xs font-bold px-16 py-1 shadow-md z-10">
                      Completed
                    </div>
                  )}
                  {isUpcoming && (
                    <div className="absolute top-4 text-center -right-10 rotate-45 bg-blue-600 text-white text-xs font-bold px-16 py-1 shadow-md z-10">
                      Upcoming
                    </div>
                  )}

                  {/* Tags */}
                  {course.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tagColors[tag] || "bg-neutral-700 text-white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-lg md:text-xl font-semibold text-white mb-5">
                    {course.title}
                  </h3>

                  <div className="text-xs md:text-sm text-neutral-400 mb-1">
                    👨‍🏫{" "}
                    <span className="text-white">
                      {Array.isArray(course.instructor)
                        ? course.instructor.map((inst) => inst.name).join(" & ")
                        : course.instructor.name}
                    </span>
                  </div>

                  <div className="text-xs md:text-sm text-neutral-400 mb-1">
                    🧠 <span className="text-white">{course.level}</span>
                  </div>

                  <div className="text-xs md:text-sm text-neutral-400 mb-1">
                    📚 {course.lessons} Lessons
                  </div>

                  <div className="text-xs md:text-sm text-neutral-400 mb-1">
                    📅 {course.date}
                  </div>

                  <div className="text-xs md:text-sm text-neutral-400 mb-1">
                    🤑 Affiliate Program Available
                  </div>

                  <div className="text-xs md:text-sm text-neutral-400 mb-4">
                    🎥 Live Classes
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                    <div className="text-sm md:text-base">
                      {isUpcoming ? (
                        <span className="text-neutral-400 italic">Price not disclosed</span>
                      ) : isCompleted ? (
                        <>
                          <span className="text-neutral-400 line-through mr-2">
                            ₹{course.price}
                          </span>
                          <span className="text-green-400 font-semibold">
                            ₹{course.discountedPrice}
                          </span>
                        </>
                      ) : null}
                    </div>

                    {isUpcoming || isCompleted ? (
                      <button
                        className="w-full sm:w-auto px-4 py-2 rounded-md text-sm bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        disabled
                      >
                        {isUpcoming ? "Coming Soon" : "Completed"}
                      </button>
                    ) : (
                      <Link
                        to={`/temp_courses/${course.slug}`}
                        className="w-full sm:w-auto px-4 py-2 rounded-md text-sm bg-[#27272c] hover:bg-neutral-800 text-white transition text-center"
                      >
                        View Course
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
