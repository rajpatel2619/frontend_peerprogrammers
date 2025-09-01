import React, { useState, useEffect } from 'react';
import { Users, Code, Zap, Award, MessageCircle, Globe, Users2, Target, BarChart3, Shield, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const Features = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitStatus({ success: false, message: '' });
    setFormData({
      name: '',
      poc_name: '',
      poc_contact_number: '',
      poc_email: '',
      address: '',
      expected_participants: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
        handleCloseModal();
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'An error occurred. Please try again.';
      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const orgFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      text: "Customized curriculum for your business needs"
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      text: "Team-based learning environment"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      text: "Progress tracking & performance analytics"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Enterprise-grade security & privacy"
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

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={handleCloseModal}>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative transform transition-all duration-300 scale-95 animate-scale-in" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Corporate Training Inquiry</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please fill out the form below, and we'll contact you to discuss a customized training plan.</p>

          {submitStatus.message ? (
            <div className={`text-center p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
              {submitStatus.message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="poc_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Point of Contact Name</label>
                  <input type="text" name="poc_name" id="poc_name" value={formData.poc_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="poc_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">POC Email</label>
                  <input type="email" name="poc_email" id="poc_email" value={formData.poc_email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="poc_contact_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">POC Contact Number</label>
                  <input type="tel" name="poc_contact_number" id="poc_contact_number" value={formData.poc_contact_number} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="expected_participants" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Number of Participants (Optional)</label>
                  <input type="number" name="expected_participants" id="expected_participants" value={formData.expected_participants} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Address</label>
                <textarea name="address" id="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-vertical"></textarea>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (Optional)</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-vertical"></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
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

        {/* Organization Training Banner */}
        <div className="bg-black dark:bg-neutral-700/25  text-white border border-gray-800 rounded-2xl mt-20">
          <div className="max-w-4xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Unlock Your Team's Potential.
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              If you are an organization seeking custom training, contact us to design a plan for your team.
            </p>
            <div className="mt-8">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors"
              >
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Coding Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers through our peer learning platform.
            </p>
            <button onClick={() => navigate("/training")} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Explore Courses
            </button>
          </div>
        </div>
      </div>
      {renderModal()}
    </section>
  );
};

export default Features;