import React from "react";
import { ArrowRight, Play, Sparkles, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Independence Day Special Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tri-color flag particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: 
                i % 3 === 0 ? '#FF9933' : 
                i % 3 === 1 ? '#FFFFFF' : '#138808',
              opacity: 0.6,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`
            }}
          />
        ))}
        
        {/* Sparkles */}
        <Sparkles className="absolute top-10 right-20 w-8 h-8 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-20 left-1/4 w-8 h-8 text-yellow-400 animate-pulse delay-300" />
      </div>

      {/* Background Bubbles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal-500 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left relative z-10">
            {/* Independence Day Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF9933] via-white to-[#138808] px-4 py-2 rounded-full mb-6 shadow-md">
              <Flag className="w-5 h-5 text-[#FF9933] mr-2" />
              <span className="text-sm font-bold text-gray-800">Celebrating 79th Independence Day</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Programming
              </span>
              <br />
              Through Peer Learning
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Join our collaborative learning platform where aspiring developers learn together, share
              knowledge, and build amazing projects. Start your coding journey today with expert-led
              courses and peer supports.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate("/training")} 
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
              <img
                loading="lazy"
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Group of developers collaborating with laptops"
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-teal-600/20"></div>

              {/* Floating Label - Top Left */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Interactive Sessions</span>
                </div>
              </div>
              
              {/* Independence Day Special Tag */}
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:rotate-0 transition-transform duration-300">
                <span className="text-xs font-bold text-gray-800">Special Independence Day Offers!</span>
              </div>
            </div>

            {/* Decorative Bubbles */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float-slow { animation: float-slow 8s infinite ease-in-out; }
        .animate-float-medium { animation: float-medium 6s infinite ease-in-out; }
        .animate-float-fast { animation: float-fast 4s infinite ease-in-out; }
      `}</style>
    </section>
  );
};

export default Hero;