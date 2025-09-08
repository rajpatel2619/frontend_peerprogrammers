import React, { useState, useEffect } from 'react';

// --- Inlined SVG Icons (no changes needed here) ---

const FaChalkboardTeacher = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 320c-13.3 0-24 10.7-24 24s10.7 24 24 24h128c13.3 0 24-10.7 24-24s-10.7-24-24-24H256zm-96-96c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm96 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-96 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM624 32H16C7.2 32 0 39.2 0 48v320c0 8.8 7.2 16 16 16h16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32h480v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32h16c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16zM48 400V80h544v320H48z"></path></svg>
);

const FaLaptopCode = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M255.03 261.03c4.69-4.69 4.69-12.28 0-16.97l-22.63-22.63c-4.69-4.69-12.28-4.69-16.97 0l-33.94 33.94-33.94-33.94c-4.69-4.69-12.28-4.69-16.97 0l-22.63 22.63c-4.69 4.69-4.69 12.28 0 16.97l33.94 33.94-33.94 33.94c-4.69 4.69-4.69 12.28 0 16.97l22.63 22.63c4.69 4.69 12.28 4.69 16.97 0l33.94-33.94 33.94 33.94c4.69 4.69 12.28 4.69 16.97 0l22.63-22.63c4.69-4.69 4.69-12.28 0-16.97l-33.94-33.94 33.94-33.94zM624 261.03l33.94 33.94c4.69 4.69 4.69 12.28 0 16.97l-22.63 22.63c-4.69 4.69-12.28 4.69-16.97 0l-33.94-33.94-33.94 33.94c-4.69 4.69-12.28 4.69-16.97 0l-22.63-22.63c-4.69-4.69-4.69-12.28 0-16.97l33.94-33.94-33.94-33.94c-4.69-4.69-4.69-12.28 0-16.97l22.63-22.63c4.69-4.69 12.28-4.69 16.97 0l33.94 33.94 33.94-33.94c4.69-4.69 12.28-4.69 16.97 0l22.63 22.63c4.69 4.69 4.69 12.28 0 16.97l-33.94 33.94zM576 480H64c-35.35 0-64-28.65-64-64V160c0-35.35 28.65-64 64-64h512c35.35 0 64 28.65 64 64v256c0 35.35-28.65 64-64 64zM64 128c-17.67 0-32 14.33-32 32v256c0 17.67 14.33 32 32 32h512c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32H64z"></path></svg>
);

const FaBriefcase = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path></svg>
);

const FaGraduationCap = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M622.34 153.2L343.4 27.2c-15.3-7.1-33.5-7.1-48.8 0L17.66 153.2c-15.6 7.2-15.6 27.2 0 34.4l41.6 19.2v94.5c0 11.2 5.5 21.6 14.8 27.4l152.4 95.2c15.3 9.6 34.9 9.6 50.2 0l152.4-95.2c9.3-5.8 14.8-16.2 14.8-27.4v-94.5l41.6-19.2c15.6-7.2 15.6-27.2 0-34.4zM320 256c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm160 32v69.3c0 16.5-18.3 28.5-33.6 21.2l-108.8-51.2-108.8 51.2c-15.3 7.3-33.6-4.7-33.6-21.2V288h284.8z"></path></svg>
);

const FaCheck = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>
);

const FaArrowRight = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
);

const FaTimes = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
);

const FaUniversity = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h24v-92a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v92h320V36a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v92h24a8 8 0 0 1 8 8zM256 192c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm0 64c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80zm0 112c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zM48 224h136.19c-14.945 25.845-24.19 56.417-24.19 88 0 31.583 9.245 62.155 24.19 88H48v-176zm304-1.81v179.62c14.945-25.845 24.19-56.417 24.19-88 0-31.583-9.245-62.155-24.19-88.19z"></path></svg>
);

const FaLightbulb = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M176 0C78.8 0 0 78.8 0 176c0 64.3 34.7 121.3 88.9 154.2 8.2 5 13.1 13.8 13.1 22.8v22.8c0 13.3 10.7 24 24 24h96c13.3 0 24-10.7 24-24v-22.8c0-9-4.9-17.8-13.1-22.8C317.3 297.3 352 240.3 352 176 352 78.8 273.2 0 176 0zm48 352c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v16zm-80-48c-48.6 0-88-39.4-88-88s39.4-88 88-88 88 39.4 88 88-39.4 88-88 88z"></path></svg>
);

// --- Main Component ---

const CampusTrainingProgram = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setDarkMode(isDarkNow);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* Hero Section */}
      <section className={`relative py-20 text-white overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-r from-sky-600 to-sky-700'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-sky-900/10 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-sky-900/10 to-transparent"></div>
          
          <div className="absolute top-10 left-1/4 w-20 h-20 rounded-full bg-sky-500/10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-sky-500/10 animate-pulse-medium"></div>
          <div className="absolute top-1/2 left-20 w-12 h-12 rounded-full bg-sky-500/20 animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-down">
            Campus Training <span className={darkMode ? "text-sky-400" : "text-sky-200"}>Program</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-slate-200 animate-fade-in-up">
            Empower your students with industry-relevant coding skills and prepare them for successful tech careers
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
            <a
              href={`https://wa.me/918543832619?text=Hello%2C%20I'm%20interested%20in%20campus%20program`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-sky-700 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-sky-500/20 flex items-center justify-center space-x-2 group"
            >
              <span>Contact Us</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Why Choose Our Program?</h2>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              We provide end-to-end technical training solutions to bridge the gap between academia and industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border border-slate-700 hover:border-sky-500' : 'bg-slate-50 border border-slate-200 hover:border-sky-500'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
                <FaLaptopCode className={`h-8 w-8 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Industry-Relevant Curriculum</h3>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                Our curriculum is designed by industry experts to match current market demands and technologies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border border-slate-700 hover:border-sky-500' : 'bg-slate-50 border border-slate-200 hover:border-sky-500'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
                <FaChalkboardTeacher className={`h-8 w-8 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Expert Instructors</h3>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                Learn from professionals with extensive experience in top tech companies and teaching.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border border-slate-700 hover:border-sky-500' : 'bg-slate-50 border border-slate-200 hover:border-sky-500'}`}>
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
                <FaBriefcase className={`h-8 w-8 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Placement Assistance</h3>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                Get dedicated support for placements with our extensive network of hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Comprehensive Training Program</h2>
              <p className={`text-lg mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Our campus training program is designed to enhance the technical capabilities of students through a structured learning path that covers fundamental to advanced concepts.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-sky-900/50' : 'bg-sky-100'} transition-colors`}>
                    <FaCheck className={`h-5 w-5 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Data Structures & Algorithms</h3>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Master the fundamentals of problem-solving and efficient coding</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-sky-900/50' : 'bg-sky-100'} transition-colors`}>
                    <FaCheck className={`h-5 w-5 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Web Development</h3>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Full-stack development with modern frameworks and technologies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-sky-900/50' : 'bg-sky-100'} transition-colors`}>
                    <FaCheck className={`h-5 w-5 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Interview Preparation</h3>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Mock interviews, coding tests, and problem-solving sessions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${darkMode ? 'bg-sky-900/50' : 'bg-sky-100'} transition-colors`}>
                    <FaCheck className={`h-5 w-5 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Project Experience</h3>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Hands-on projects to build a strong portfolio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className={`rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-700 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Campus Training" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 rounded-2xl my-20 transition-opacity duration-300 mx-4 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} bg-gradient-to-br from-sky-600 to-sky-700`}>
        <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <FaLightbulb className="h-12 w-12 text-yellow-300 mx-auto animate-pulse" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Empower Your Students for the Future.
          </h2>
          <p className="mt-4 text-xl text-sky-100">
            Partner with us to bring industry-leading workshops and career-focused training directly to your campus.
          </p>
          <div className="mt-8">
            <a
              href={`https://wa.me/918543832619?text=Hello%2C%20I'm%20interested%20in%20campus%20program`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-sky-700 bg-white hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-sky-400/20 group"
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
          <div className={`rounded-2xl p-8 max-w-md w-full relative overflow-hidden ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button 
                onClick={handleCloseModal}
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'}`}
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-sky-100'}`}>
                <FaUniversity className={`h-6 w-6 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
              </div>
              <h3 className={`text-2xl font-bold mt-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Request Information</h3>
              <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fill out the form below and our team will contact you shortly.</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500' : 'border border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`} 
                />
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                <input 
                  type="email" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500' : 'border border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`} 
                />
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Institution</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500' : 'border border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`} 
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
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