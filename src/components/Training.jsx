import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

const Training = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 'react-fundamentals',
      title: 'React Fundamentals',
      description: 'Master the basics of React including components, hooks, and state management. Perfect for beginners starting their React journey.',
      duration: '8 weeks',
      students: 234,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Beginner',
      price: 'Free',
      instructor: 'Sarah Johnson'
    },
    {
      id: 'javascript-advanced',
      title: 'Advanced JavaScript',
      description: 'Deep dive into advanced JavaScript concepts including async programming, closures, and ES6+ features.',
      duration: '10 weeks',
      students: 189,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Advanced',
      price: '$99',
      instructor: 'Mike Chen'
    },
    {
      id: 'fullstack-development',
      title: 'Full-Stack Development',
      description: 'Complete web development course covering frontend, backend, databases, and deployment strategies.',
      duration: '16 weeks',
      students: 156,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Intermediate',
      price: '$199',
      instructor: 'Alex Rodriguez'
    },
    {
      id: 'python-data-science',
      title: 'Python for Data Science',
      description: 'Learn Python programming with focus on data analysis, visualization, and machine learning fundamentals.',
      duration: '12 weeks',
      students: 298,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Beginner',
      price: '$149',
      instructor: 'Dr. Emily Watson'
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      description: 'Build native mobile applications using React Native. Learn to deploy apps to both iOS and Android.',
      duration: '14 weeks',
      students: 167,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Intermediate',
      price: '$179',
      instructor: 'David Kim'
    },
    {
      id: 'devops-essentials',
      title: 'DevOps Essentials',
      description: 'Learn modern DevOps practices including CI/CD, containerization, and cloud deployment strategies.',
      duration: '10 weeks',
      students: 203,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      level: 'Advanced',
      price: '$159',
      instructor: 'Lisa Thompson'
    }
  ];

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="training" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Training Courses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our carefully curated selection of programming courses, 
            designed to take you from beginner to expert level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <button
                  onClick={() => handleViewCourse(course.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
                >
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
