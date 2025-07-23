import React from 'react';
import { X, Award, BookOpen, Users, Star, Calendar, MapPin, Mail, Linkedin, Github } from 'lucide-react';

const InstructorModal = ({ isOpen, onClose, instructor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{instructor.name}</h2>
              <p className="text-xl text-blue-100 mb-3">{instructor.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {instructor.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {instructor.experience} Experience
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-300 fill-current" />
                  {instructor.rating} Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{instructor.coursesCount}</div>
              <div className="text-blue-600 dark:text-blue-300">Courses Created</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {instructor.studentsCount.toLocaleString()}
              </div>
              <div className="text-green-600 dark:text-green-300">Students Taught</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{instructor.rating}</div>
              <div className="text-purple-600 dark:text-purple-300">Average Rating</div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{instructor.bio}</p>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
            <ul className="space-y-2">
              {instructor.education.map((edu, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <ul className="space-y-2">
              {instructor.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <Award className="h-4 w-4 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${instructor.email}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
              {instructor.linkedin && (
                <a
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              )}
              {instructor.github && (
                <a
                  href={instructor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorModal;
