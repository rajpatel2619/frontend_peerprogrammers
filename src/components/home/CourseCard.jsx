import { motion } from "framer-motion";

const CourseCard = ({ title, description, instructor, image, price }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 250 }}
      className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-transparent cursor-pointer flex flex-col"
    >
      <img
        src={image}
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
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
        <span>{instructor}</span>
        <span className="text-gray-900 dark:text-white">{price}</span>
      </div>
    </motion.div>
  );
};

export default CourseCard;
