import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  BookOpen,
  Users,
  Calendar,
  Award,
  Settings,
} from 'lucide-react';

import StudentTab from '../components/StudentTab';
import TeacherTab from '../components/TeacherTab';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('student');

  const courseData = {
    'react-fundamentals': {
      title: 'React Fundamentals',
      description: 'Master the basics of React including components, hooks, and state management.',
      instructor: 'Sarah Johnson',
      duration: '8 weeks',
      students: 234,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'javascript-advanced': {
      title: 'Advanced JavaScript',
      description: 'Deep dive into advanced JavaScript concepts including async programming, closures, and ES6+ features.',
      instructor: 'Mike Chen',
      duration: '10 weeks',
      students: 189,
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'fullstack-development': {
      title: 'Full-Stack Development',
      description: 'Complete web development course covering frontend, backend, databases, and deployment.',
      instructor: 'Alex Rodriguez',
      duration: '16 weeks',
      students: 156,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'python-data-science': {
      title: 'Python for Data Science',
      description: 'Learn Python programming with focus on data analysis, visualization, and machine learning fundamentals.',
      instructor: 'Dr. Emily Watson',
      duration: '12 weeks',
      students: 298,
      image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'mobile-app-development': {
      title: 'Mobile App Development',
      description: 'Build native mobile applications using React Native. Learn to deploy apps to both iOS and Android.',
      instructor: 'David Kim',
      duration: '14 weeks',
      students: 167,
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'devops-essentials': {
      title: 'DevOps Essentials',
      description: 'Learn modern DevOps practices including CI/CD, containerization, and cloud deployment strategies.',
      instructor: 'Lisa Thompson',
      duration: '10 weeks',
      students: 203,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  };

  const course = courseData[courseId] || courseData['react-fundamentals'];

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {course.students} Students
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Instructor: {course.instructor}
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg shadow-xl w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <button className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-full hover:bg-opacity-30 transition-all">
                  <Play className="h-8 w-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('student')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'student'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Student View
              </div>
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'teacher'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Teacher View
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'student' ? (
          <StudentTab course={course} />
        ) : (
          <TeacherTab course={course} />
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
