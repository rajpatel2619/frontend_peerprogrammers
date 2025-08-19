


import React, { useState, useEffect } from 'react';
import { Users, Code, Zap, Award, MessageCircle, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Peer-to-Peer Learning",
      description: "Learn collaboratively with fellow developers through group projects, code reviews, and study sessions.",
      color: "blue"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Hands-On Projects",
      description: "Build real-world applications and contribute to open-source projects while learning programming concepts.",
      color: "teal"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Interactive Coding",
      description: "Practice coding with our interactive and structured portal.",
      color: "purple"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Skill Certification",
      description: "Earn recognized certificates and badges as you complete courses and demonstrate your programming skills.",
      color: "orange"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Community Support",
      description: "Get help anytime from our active community of developers, mentors, and industry professionals.",
      color: "green"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with developers worldwide, join meetups, and build lasting professional relationships.",
      color: "pink"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      teal: "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
      green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
      pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Peer Programmers?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience a revolutionary approach to learning programming through collaboration, 
            practical projects, and continuous peer support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-neutral-700/25 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 transition-colors">
                  Learn More →
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Coding Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers through our peer learning platform.
            </p>
            <button onClick={()=>navigate("/training")} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle Button */}
        {/* <div className="fixed bottom-4 right-4 bg-blue-600 dark:bg-gray-800 p-4 rounded-full shadow-lg cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          <span className="text-white text-xl">{darkMode ? "🌙" : "☀️"}</span>
        </div> */}
      </div>
    </section>
  );
};

export default Features;
