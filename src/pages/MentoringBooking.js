import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronDown, Check } from 'lucide-react';

const MentoringBooking = () => {
  // Sample mentor data
  const mentors = [
    { id: 1, name: "Alex Johnson", expertise: "DSA, Competitive Programming", available: true },
    { id: 2, name: "Sarah Williams", expertise: "Web Development, React", available: true },
    { id: 3, name: "Michael Chen", expertise: "Backend, Node.js", available: false },
    { id: 4, name: "Priya Patel", expertise: "System Design, Databases", available: true },
    { id: 5, name: "David Kim", expertise: "Mobile Development, Flutter", available: true },
  ];

  // Available time slots (in 30-minute increments)
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const [formData, setFormData] = useState({
    mentor: '',
    date: '',
    time: '',
    topic: '',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMentorDropdown, setShowMentorDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const selectMentor = (mentor) => {
    setFormData(prev => ({
      ...prev,
      mentor: mentor.name
    }));
    setShowMentorDropdown(false);
  };

  const selectTime = (time) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
    setShowTimeDropdown(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Book a Mentoring Session</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Get personalized guidance from our expert mentors to accelerate your learning.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        {isSubmitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your session with {formData.mentor} has been scheduled for {formData.date} at {formData.time}.
            </p>
            <button
              onClick={() => setFormData({
                mentor: '',
                date: '',
                time: '',
                topic: '',
                description: ''
              })}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mentor Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Mentor
              </label>
              <button
                type="button"
                onClick={() => setShowMentorDropdown(!showMentorDropdown)}
                className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-left"
              >
                <span className={formData.mentor ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                  {formData.mentor || "Choose a mentor"}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMentorDropdown ? 'transform rotate-180' : ''}`} />
              </button>
              
              {showMentorDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {mentors.filter(m => m.available).map(mentor => (
                    <div
                      key={mentor.id}
                      onClick={() => selectMentor(mentor)}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{mentor.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.expertise}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Time Slot
              </label>
              <button
                type="button"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-left"
              >
                <span className={formData.time ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                  {formData.time || "Select a time slot"}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTimeDropdown ? 'transform rotate-180' : ''}`} />
              </button>
              
              {showTimeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {timeSlots.map((time, index) => (
                    <div
                      key={index}
                      onClick={() => selectTime(time)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    >
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Topic */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                placeholder="What do you want to discuss?"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Details
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                placeholder="Describe what you'd like to focus on during the session..."
              />
            </div>

            <button
              type="submit"
              disabled={!formData.mentor || !formData.date || !formData.time || !formData.topic}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Session
            </button>
          </form>
        )}
      </div>

      {/* Mentor Information Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <div key={mentor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{mentor.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${mentor.available ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {mentor.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mentor.expertise}</p>
              {mentor.available && (
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      mentor: mentor.name
                    }));
                    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Book this mentor
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentoringBooking;