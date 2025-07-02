import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  title,
  description,
  image,
}) => {
  return (
    <Link to={`/courses/${id}`} className="block">
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 250 }}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-transparent cursor-pointer flex flex-col h-full"
      >
        <img
          src={image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={title}
          className="rounded-md mb-3 w-full h-32 object-cover"
          loading="lazy"
        />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow text-sm mb-2">
          {description}
        </p>
        <div className="flex justify-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          <span className="bg-blue-600 p-2 rounded-lg text-white text-center w-full">
            View Course Details
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
