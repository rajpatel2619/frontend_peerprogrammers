import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const news = [
  {
    title: "Google DeepMind Opens 100+ AI Roles Globally",
    description: "The tech giant is expanding its AI research and applied science teams.",
  },
  {
    title: "OpenAI Hiring for Prompt Engineers, Researchers",
    description: "Join the team behind ChatGPT and shape the future of AI.",
  },
  {
    title: "AI Startups Raise Record Funding in 2025",
    description: "Investors are doubling down on LLM, robotics, and healthcare AI solutions.",
  },
];

const CTASection = () => {
  return (
    <section className="bg-gray-50 dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left - Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            The Future Is AI<br />
            Are You Ready?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Discover career opportunities in AI, ML, and Prompt Engineering.
            Equip yourself with the right skills to join the revolution.
          </p>
          <Link to="/temp_courses">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
              Explore Courses
            </button>
          </Link>
        </motion.div>

        {/* Right - News Feed (Text Only) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
