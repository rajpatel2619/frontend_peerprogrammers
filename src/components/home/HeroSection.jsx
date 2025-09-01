import React from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-black dark:via-slate-950 dark:to-black overflow-hidden">
      {/* Background Bubbles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal-500 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-20">
        <div className="items-center flex justify-center">
          {/* Left Content */}
          <div className="text-center relative z-10 items-center flex flex-col gap-6">
            <h1 className="text-4xl lg:text-8xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight font-funnel">
              Master{" "}
              <span className="">
                Programming
              </span>
              <br />
              Through <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Peer</span> Learning
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl font-lexend font-extralight">
              Join our collaborative learning platform where aspiring developers learn together, share
              knowledge, and build amazing projects. Start your coding journey today with expert-led
              courses and peer supports.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/training")}
                className="relative overflow-hidden bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning Today
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
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