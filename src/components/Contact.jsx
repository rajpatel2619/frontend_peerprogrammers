import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send,
  MessageCircle, Users, Calendar, Clock, ExternalLink
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.REACT_APP_API}/contact_us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        inquiry_type: formData.type, // matches backend field
        subject: formData.subject,
        message: formData.message
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to send message");
    }

    // Success
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general"
    });
    setTimeout(() => setIsSubmitted(false), 3000);

  } catch (error) {
    console.error("Error submitting contact form:", error);
    alert("Something went wrong while sending your message. Please try again later.");
  }
};


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "General Inquiries",
      description: "Questions about courses or platform features",
      contact: "peerprogrammers@gmail.com",
      link: "mailto:peerprogrammers@gmail.com",
      color: "blue",
      action: "Email Us"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join our Whatsapp for peer-to-peer help",
      contact: "Join Whatsapp Community",
      link: "https://chat.whatsapp.com/JjllfudxuUnCAhGk754toQ",
      color: "purple",
      action: "Join Now",
      isExternal: true
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "1-on-1 Mentoring",
      description: "Schedule a session with our mentors",
      contact: "Book a Session",
      link: "",
      color: "green",
      action: "Schedule"
    },
    // {
    //   icon: <MapPin className="w-6 h-6" />,
    //   title: "Office Visit",
    //   description: "Visit our headquarters in Noida",
    //   contact: "Noida, India",
    //   link: "https://maps.google.com/?q=Noida",
    //   color: "blue",
    //   action: "Get Directions",
    //   isExternal: true
    // }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
      red: "bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
        Get in Touch
      </h2>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
        Have questions about our courses? Need help with your learning journey? 
        We're here to support you every step of the way.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-neutral-800">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Send us a Message</h3>
          <p className="text-neutral-600 dark:text-neutral-400">We'll get back to you within 24 hours.</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Message Sent!</h4>
            <p className="text-neutral-600 dark:text-neutral-400">Thank you for reaching out. We'll respond soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Inquiry Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200"
              >
                <option value="general">General Questions</option>
                <option value="course">Course Information</option>
                <option value="technical">Technical Support</option>
                <option value="campus_ambassdar">Apply for Campus Ambassador</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200"
                placeholder="Brief subject of your message"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 resize-vertical"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-8">
        <div className="space-y-6">
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.link}
              target={option.isExternal ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100 dark:border-neutral-800"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl transition-all duration-300 ${getColorClasses(option.color)}`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {option.title}
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      {option.action}
                      {option.isExternal && <ExternalLink className="w-3 h-3 ml-1" />}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">{option.description}</p>
                  <p className={`text-${option.color}-600 dark:text-${option.color}-400 font-medium text-sm`}>
                    {option.contact}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Other Ways to Connect</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white">Mail Support</h4>
                <a href="mailto:peerprogrammers@gmail.com" className="text-blue-600 dark:text-blue-400 text-sm">
                  peerprogrammers@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white">Working Hours</h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  24/7 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Contact;