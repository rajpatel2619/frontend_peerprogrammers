import React, { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Code, FileText, Star } from 'lucide-react';

const StudentTab = ({ course }) => {
  const [completedLessons, setCompletedLessons] = useState([1, 2]);

  const lessons = [
    { id: 1, title: 'Introduction to React', duration: '15 min', type: 'video' },
    { id: 2, title: 'Setting up Your Environment', duration: '20 min', type: 'video' },
    { id: 3, title: 'Your First Component', duration: '25 min', type: 'video' },
    { id: 4, title: 'Props and State', duration: '30 min', type: 'video' },
    { id: 5, title: 'Event Handling', duration: '22 min', type: 'video' },
    { id: 6, title: 'Conditional Rendering', duration: '18 min', type: 'video' },
  ];

  const assignments = [
    { id: 1, title: 'Build a Todo App', dueDate: '2025-01-25', status: 'pending', points: 100 },
    { id: 2, title: 'React Component Library', dueDate: '2025-02-01', status: 'submitted', points: 150 },
    { id: 3, title: 'Final Project', dueDate: '2025-02-15', status: 'upcoming', points: 200 },
  ];

  const toggleLesson = (lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="space-y-8">
      {/* Course Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Course Progress</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{completedLessons.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Lessons Completed</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              Course Rating
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
          Course Lessons
        </h3>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                completedLessons.includes(lesson.id)
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
              onClick={() => toggleLesson(lesson.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {completedLessons.includes(lesson.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Play className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  {completedLessons.includes(lesson.id) ? 'Review' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Code className="h-5 w-5 mr-2 text-purple-600" />
          Assignments & Projects
        </h3>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Due: {assignment.dueDate}</span>
                <span>{assignment.points} points</span>
              </div>
              <div className="mt-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  {assignment.status === 'submitted' ? 'View Submission' : 'Start Assignment'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Problems */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-green-600" />
          Practice Problems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Component Props Exercise', difficulty: 'Easy', completed: true },
            { title: 'State Management Challenge', difficulty: 'Medium', completed: true },
            { title: 'Event Handling Quiz', difficulty: 'Easy', completed: false },
            { title: 'Conditional Rendering Tasks', difficulty: 'Medium', completed: false },
          ].map((problem, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{problem.title}</h4>
                {problem.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {problem.difficulty}
                </span>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
                  {problem.completed ? 'Review' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTab;
