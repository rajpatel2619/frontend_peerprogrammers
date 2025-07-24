// import React, { useState } from 'react';
// import {
//   Mail, Phone, MapPin, Send,
//   MessageCircle, Users, Calendar, Clock
// } from 'lucide-react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     type: 'general'
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const contactOptions = [
//     {
//       icon: <MessageCircle className="w-6 h-6" />,
//       title: "General Inquiries",
//       description: "Questions about courses or platform features",
//       contact: "hello@peerprogrammers.com",
//       color: "blue"
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       title: "Community Support",
//       description: "Join our Discord for peer-to-peer help",
//       contact: "Join Discord Community",
//       color: "purple"
//     },
//     {
//       icon: <Calendar className="w-6 h-6" />,
//       title: "1-on-1 Mentoring",
//       description: "Schedule a session with our mentors",
//       contact: "Book a Session",
//       color: "green"
//     }
//   ];

//   const getColorClasses = (color) => {
//     const colors = {
//       blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
//       purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
//       green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white"
//     };
//     return colors[color] || colors.blue;
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//             Get in Touch
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Have questions about our courses? Need help with your learning journey? 
//             We're here to support you every step of the way.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
//               <p className="text-gray-600">We'll get back to you within 24 hours.</p>
//             </div>

//             {isSubmitted ? (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Send className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
//                 <p className="text-gray-600">Thank you for reaching out. We'll respond soon.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Your full name"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//                     Inquiry Type
//                   </label>
//                   <select
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   >
//                     <option value="general">General Questions</option>
//                     <option value="course">Course Information</option>
//                     <option value="technical">Technical Support</option>
//                     <option value="partnership">Partnership</option>
//                     <option value="feedback">Feedback</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Brief subject of your message"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
//                     placeholder="Tell us how we can help you..."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
//                 >
//                   <Send className="w-5 h-5" />
//                   <span>Send Message</span>
//                 </button>
//               </form>
//             )}
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               {contactOptions.map((option, index) => (
//                 <div
//                   key={index}
//                   className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
//                 >
//                   <div className="flex items-start space-x-4">
//                     <div className={`p-3 rounded-xl transition-all duration-300 ${getColorClasses(option.color)}`}>
//                       {option.icon}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
//                         {option.title}
//                       </h4>
//                       <p className="text-gray-600 text-sm mb-2">{option.description}</p>
//                       <p className="text-blue-600 font-medium text-sm">{option.contact}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
//               <h4 className="text-xl font-bold mb-6">Direct Contact</h4>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <Mail className="w-5 h-5 text-blue-200" />
//                   <span>support@peerprogrammers.com</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Phone className="w-5 h-5 text-blue-200" />
//                   <span>+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="w-5 h-5 text-blue-200" />
//                   <span>San Francisco, CA</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Clock className="w-5 h-5 text-blue-200" />
//                   <span>Mon-Fri: 9AM - 6PM PST</span>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <h4 className="font-semibold text-gray-900 mb-4">Join Our Community</h4>
//               <div className="grid grid-cols-2 gap-4 text-center">
//                 <div>
//                   <div className="text-2xl font-bold text-blue-600">50K+</div>
//                   <div className="text-sm text-gray-600">Students</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-teal-600">24/7</div>
//                   <div className="text-sm text-gray-600">Support</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-purple-600">500+</div>
//                   <div className="text-sm text-gray-600">Mentors</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-green-600">95%</div>
//                   <div className="text-sm text-gray-600">Satisfaction</div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send,
  MessageCircle, Users, Calendar, Clock
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
      contact: "hello@peerprogrammers.com",
      color: "blue"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join our Discord for peer-to-peer help",
      contact: "Join Discord Community",
      color: "purple"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "1-on-1 Mentoring",
      description: "Schedule a session with our mentors",
      contact: "Book a Session",
      color: "green"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our courses? Need help with your learning journey? 
            We're here to support you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h3>
              <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. We'll respond soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="general">General Questions</option>
                    <option value="course">Course Information</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
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
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${getColorClasses(option.color)}`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{option.description}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{option.contact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark Mode Toggle Button */}
            {/* <div className="fixed bottom-4 right-4 bg-blue-600 dark:bg-gray-800 p-4 rounded-full shadow-lg cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
              <span className="text-white text-xl">{darkMode ? "🌙" : "☀️"}</span>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
