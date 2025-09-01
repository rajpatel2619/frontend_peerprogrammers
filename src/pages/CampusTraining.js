import React, { useState, useEffect } from 'react';
import { 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaBriefcase, 
  FaUsers, 
  FaGraduationCap, 
  FaCheck, 
  FaArrowRight,
  FaTimes,
  FaUniversity,
  FaRocket,
  FaLightbulb,
  FaCode
} from 'react-icons/fa';

const CampusTrainingProgram = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check if dark mode is enabled globally (you can replace this with your global state logic)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    
    // Listen for dark mode changes if you have a global toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}>
      
      {/* Hero Section */}
      <section className={`relative py-20 text-white overflow-hidden ${darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-blue-800 to-purple-700'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-900/30 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-900/30 to-transparent"></div>
          
          {/* Animated elements */}
          <div className="absolute top-10 left-1/4 w-20 h-20 rounded-full bg-blue-400/10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-purple-400/10 animate-pulse-medium"></div>
          <div className="absolute top-1/2 left-20 w-12 h-12 rounded-full bg-white/5 animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-down">
            Campus Training <span className="text-blue-300">Program</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100 animate-fade-in-up">
            Empower your students with industry-relevant coding skills and prepare them for successful tech careers
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
            <a
              href={`https://wa.me/918543832619?text=Hello%2C%20I'm%20interested%20in%20campus%20program`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center space-x-2 group"
            >
              <span>Contact Us</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Why Choose Our Program?</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We provide end-to-end technical training solutions to bridge the gap between academia and industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:shadow-purple-900/20' : 'bg-gradient-to-b from-blue-50 to-white border border-blue-100'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-indigo-900/30' : 'bg-blue-100'}`}>
                <FaLaptopCode className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Industry-Relevant Curriculum</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Our curriculum is designed by industry experts to match current market demands and technologies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:shadow-purple-900/20' : 'bg-gradient-to-b from-blue-50 to-white border border-blue-100'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-indigo-900/30' : 'bg-blue-100'}`}>
                <FaChalkboardTeacher className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Expert Instructors</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Learn from professionals with extensive experience in top tech companies and teaching.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:shadow-purple-900/20' : 'bg-gradient-to-b from-blue-50 to-white border border-blue-100'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-indigo-900/30' : 'bg-blue-100'}`}>
                <FaBriefcase className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Placement Assistance</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Get dedicated support for placements with our extensive network of hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Comprehensive Training Program</h2>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our campus training program is designed to enhance the technical capabilities of students through a structured learning path that covers fundamental to advanced concepts.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-indigo-700 group-hover:bg-indigo-600' : 'bg-blue-100 group-hover:bg-blue-200'} transition-colors`}>
                    <FaCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Data Structures & Algorithms</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Master the fundamentals of problem-solving and efficient coding</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-indigo-700 group-hover:bg-indigo-600' : 'bg-blue-100 group-hover:bg-blue-200'} transition-colors`}>
                    <FaCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Web Development</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Full-stack development with modern frameworks and technologies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-indigo-700 group-hover:bg-indigo-600' : 'bg-blue-100 group-hover:bg-blue-200'} transition-colors`}>
                    <FaCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Interview Preparation</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Mock interviews, coding tests, and problem-solving sessions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-indigo-700 group-hover:bg-indigo-600' : 'bg-blue-100 group-hover:bg-blue-200'} transition-colors`}>
                    <FaCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Experience</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Hands-on projects to build a strong portfolio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className={`rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-700 ${darkMode ? 'bg-gradient-to-br from-indigo-700 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Campus Training" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 rounded-2xl mt-20 transition-opacity duration-300 mx-4 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-800' : 'bg-gradient-to-br from-gray-900 to-black border border-gray-800'}`}>
        <div className="max-w-4xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <FaLightbulb className="h-12 w-12 text-yellow-400 mx-auto animate-pulse" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Empower Your Students for the Future.
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Partner with us to bring industry-leading workshops and career-focused training directly to your campus.
          </p>
          <div className="mt-8">
            <a
              href={`https://wa.me/918543832619?text=Hello%2C%20I'm%20interested%20in%20campus%20program`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
            >
              Become a Campus Partner
              <FaGraduationCap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className={`rounded-2xl p-8 max-w-md w-full relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button 
                onClick={handleCloseModal}
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <FaUniversity className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className={`text-2xl font-bold mt-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Request Information</h3>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fill out the form below and our team will contact you shortly.</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'}`} 
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input 
                  type="email" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'}`} 
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Institution</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'}`} 
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulse-medium 3s ease-in-out infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CampusTrainingProgram;