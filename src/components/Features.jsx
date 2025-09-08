import React, { useState, useEffect } from 'react';
import { Users, Code, Zap, Award, MessageCircle, Globe, Users2, Target, BarChart3, Shield, X, ArrowRight, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Features = () => {
  // --- STATE MANAGEMENT ---
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [formData, setFormData] = useState({
    name: '',
    poc_name: '',
    poc_contact_number: '',
    poc_email: '',
    address: '',
    expected_participants: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  // --- EFFECTS ---
  // Effect for handling dark mode
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

  // --- HANDLERS ---
  // Handlers for opening and closing the modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form state after the closing animation (300ms)
    setTimeout(() => {
      setSubmitStatus({ success: false, message: '' });
      setFormData({
        name: '', poc_name: '', poc_contact_number: '', poc_email: '',
        address: '', expected_participants: '', message: ''
      });
    }, 300);
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const API = process.env.REACT_APP_API || 'http://localhost:8000';
      await axios.post(`${API}/organizations/create`, data);
      setSubmitStatus({ success: true, message: 'Thank you! Your request has been submitted successfully. We will get back to you soon.' });
      setTimeout(() => {
        handleCloseModal(); // Close modal on success
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'An error occurred. Please try again.';
      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DATA ---
  const features = [
    { icon: <Users className="w-8 h-8" />, title: "Peer-to-Peer Learning", description: "Learn collaboratively with fellow developers through group projects, code reviews, and study sessions.", color: "blue" },
    { icon: <Code className="w-8 h-8" />, title: "Hands-On Projects", description: "Build real-world applications and contribute to open-source projects while learning programming concepts.", color: "teal" },
    { icon: <Zap className="w-8 h-8" />, title: "Interactive Coding", description: "Practice coding with our interactive and structured portal.", color: "purple" },
    { icon: <Award className="w-8 h-8" />, title: "Skill Certification", description: "Earn recognized certificates and badges as you complete courses and demonstrate your programming skills.", color: "orange" },
    { icon: <MessageCircle className="w-8 h-8" />, title: "24/7 Community Support", description: "Get help anytime from our active community of developers, mentors, and industry professionals.", color: "green" },
    { icon: <Globe className="w-8 h-8" />, title: "Global Network", description: "Connect with developers worldwide, join meetups, and build lasting professional relationships.", color: "pink" }
  ];

  const orgFeatures = [
    { icon: <Target className="w-6 h-6" />, text: "Customized curriculum for your business needs" },
    { icon: <Users2 className="w-6 h-6" />, text: "Team-based learning environment" },
    { icon: <BarChart3 className="w-6 h-6" />, text: "Progress tracking & performance analytics" },
    { icon: <Shield className="w-6 h-6" />, text: "Enterprise-grade security & privacy" }
  ];

  // --- HELPERS ---
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

  // --- RENDER FUNCTIONS ---
  // Renders the inquiry form modal
  const renderInquiryModal = () => {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-70" onClick={handleCloseModal}></div>
        <div className="relative flex w-full max-w-6xl h-[90vh] max-h-[800px] mx-auto" onClick={(e) => e.stopPropagation()}>
          {/* Left Pane (Banner) */}
          <div className={`w-2/5 bg-black rounded-l-2xl p-12 flex-col justify-center text-white transform transition-transform duration-500 ease-out hidden md:flex ${isModalOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Unlock Your Team's Potential.</h2>
            <p className="mt-4 text-lg text-gray-300">Provide your details, and we'll design a custom training plan that aligns with your organization's goals.</p>
            <div className="mt-10 space-y-4 border-t border-gray-700 pt-6">
              {orgFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 text-gray-300">
                  <div className="flex-shrink-0 bg-gray-700 p-2 rounded-full text-white">{feature.icon}</div>
                  <span className="pt-1">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Right Pane (Form) */}
          <div className={`w-full md:w-3/5 bg-white dark:bg-neutral-900 rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-2xl p-8 overflow-y-auto relative transform transition-transform duration-500 ease-out ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Partnership & Training Inquiry</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please fill out the form, and we'll contact you to discuss a customized plan.</p>
            {submitStatus.message ? (
              <div className={`text-center p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                {submitStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" id="name" placeholder="Organization/College Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" name="poc_name" id="poc_name" placeholder="Point of Contact Name" value={formData.poc_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                  <input type="email" name="poc_email" id="poc_email" placeholder="POC Email" value={formData.poc_email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="tel" name="poc_contact_number" id="poc_contact_number" placeholder="POC Contact Number" value={formData.poc_contact_number} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                  <input type="number" name="expected_participants" id="expected_participants" placeholder="Expected Participants (Optional)" value={formData.expected_participants} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
                <textarea name="address" id="address" placeholder="Organization/College Address" value={formData.address} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-none"></textarea>
                <textarea name="message" id="message" placeholder="Message (Optional)" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-none"></textarea>
                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- MAIN COMPONENT RENDER ---
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Peer Programmers?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Experience a revolutionary approach to learning programming through collaboration, practical projects, and continuous peer support.</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white dark:bg-neutral-700/25 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className={`inline-flex p-3 rounded-xl mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Coding Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Join thousands of developers who have transformed their careers through our peer learning platform.</p>
            <button onClick={() => navigate("/training")} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Explore Courses</button>
          </div>
        </div>

        {/* College Partner Banner */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white border border-gray-700 rounded-2xl mt-20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20">
          <div className="max-w-4xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Empower Your Students for the Future.</h2>
            <p className="mt-4 text-xl text-gray-300 leading-relaxed">Partner with us to bring industry-leading workshops and career-focused training directly to your campus.</p>

            <div className="mt-8 gap-4 flex flex-col sm:flex-row justify-center">
              <button onClick={handleOpenModal} className="group inline-flex items-center justify-center px-8 py-4 overflow-hidden text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-blue-500/30 relative">
                <span className="relative z-10">Become a Campus Partner</span>
                <School className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </button>

              <a href="/campus_training" className="group inline-flex items-center justify-center px-8 py-4 overflow-hidden text-base font-medium rounded-md text-black bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-blue-500/30 relative">
                <span className="relative z-10">Learn more</span>
              </a>

            </div>
            
          </div>
        </div>


        {/* Organization Training Banner (Simplified) */}
        <div className="mt-20 bg-black rounded-2xl p-8 sm:p-12 text-center text-white border border-gray-800">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Unlock Your Team&apos;s Potential.
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            If you are an organization seeking custom training, contact us to design a plan for your team.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors"
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Render the single, unified modal for inquiries */}
      {renderInquiryModal()}
    </section>
  );
};

export default Features;