import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const CourseCard = ({ id, title, description, image, price, mode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link to={`/courses/${id}`} className="block">
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 cursor-pointer flex flex-col h-full relative z-0 min-h-full"
        >
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/400x200?text=No+Image"}
              alt={title}
              className="rounded-md mb-3 w-full h-40 object-cover transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
            <motion.div
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-md text-white font-semibold text-sm transition-opacity overflow-hidden"
              style={{ height: "160px" }}
            >
              Hover to Explore
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-2 space-x-2">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex-grow line-clamp-2">
              {title}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-300 capitalize whitespace-nowrap">
              {mode}
            </span>
          </div>

          <p
            className={`text-gray-600 dark:text-gray-400 flex-grow text-sm mb-2 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {expanded || description.length <= 150
              ? description
              : description.slice(0, 150) + "..."}
            {description.length > 150 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpanded();
                }}
                className="text-blue-600 dark:text-blue-400 ml-1 underline text-sm"
              >
                {expanded ? "show less" : "read more"}
              </button>
            )}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 font-semibold mb-3 space-x-4">
            <span className="whitespace-nowrap">Price: ${price}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.973a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
                <span className="text-xs">4.5</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 7H7v6h6V7z" />
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm10 12H5V5h10v10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs">125k learners</span>
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <span className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 p-2 rounded-lg text-white w-full block">
              View Course Details
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
