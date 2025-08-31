import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  title,
  description,
  image,
  // this 
  
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link to={`/courses/${id}`} className="block">
        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 cursor-pointer flex flex-col h-full"
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
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-md text-white font-semibold text-sm transition-opacity"
            >
              Hover to Explore
            </motion.div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 flex-grow text-sm mb-2 line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {/* {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
              </span>
            ))} */}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
            {/* <span>📅 {duration}</span> */}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
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
