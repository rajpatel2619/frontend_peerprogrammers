import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Bubbles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Programming
              </span>
              <br />
              Through Peer Learning
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Join our collaborative learning platform where aspiring developers learn together, share
              knowledge, and build amazing projects. Start your coding journey today with expert-led
              courses and peer supports.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={()=> navigate("/training")} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              {/* <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button> */}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                loading="lazy"
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Group of developers collaborating with laptops"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-teal-600/20"></div>

              {/* Floating Label - Top Left */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Intractive Sessions</span>
                </div>
              </div>
            </div>

            {/* Decorative Bubbles */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
