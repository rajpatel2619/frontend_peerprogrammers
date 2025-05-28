import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { HiSearch } from "react-icons/hi";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const domains = [
  "Web Development", "Data Science", "Mobile Apps", "Cloud Computing", "AI/ML", "Cyber Security",
  "Game Development", "Blockchain", "AR/VR", "Internet of Things", "DevOps", "UI/UX Design",
  "Software Testing", "Robotics"
];
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      {/* Starry background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay,
          }}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: "9999px",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 0,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Master Programming <span className="font-bold">Together</span> 
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12 font-thin">
            Join our peer-learning community and accelerate your tech career
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-4 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-400 transition-colors">
            <HiSearch className="text-gray-400 mr-3 text-xl" />
            <input
              type="text"
              placeholder="Search courses, topics, or mentors..."
              className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </motion.div>

        {/* Domain Boxes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain + Math.random()}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 dark:bg-black opacity-70 hover:opacity-100 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-300 dark:hover:border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer hover:shadow-md transition-all w-fit hover:bg-gray-200 dark:hover:bg-gray-900"
            >
              <div className="flex flex-col items-center">
                <span className="text-md font-light text-gray-800 dark:text-gray-300 text-center">
                  {domain}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
