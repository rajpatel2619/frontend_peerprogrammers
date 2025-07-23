// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Clock, Users, Star, ArrowRight, Filter, ChevronDown } from 'lucide-react';

// const Training = () => {
//   const navigate = useNavigate();
//   const [selectedFilter, setSelectedFilter] = React.useState('All Levels');
//   const [selectedCourseFilter, setSelectedCourseFilter] = React.useState('All Courses');
//   const [isFilterOpen, setIsFilterOpen] = React.useState(false);
//   const [isCourseFilterOpen, setIsCourseFilterOpen] = React.useState(false);

//   const courses = [
//     {
//       id: 'react-fundamentals',
//       title: 'React Fundamentals',
//       description: 'Master the basics of React including components, hooks, and state management. Perfect for beginners starting their React journey.',
//       duration: '8 weeks',
//       students: 234,
//       rating: 4.8,
//       image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Beginner',
//       price: 'Free',
//       instructor: 'Sarah Johnson',
//       category: 'Frontend'
//     },
//     {
//       id: 'javascript-advanced',
//       title: 'Advanced JavaScript',
//       description: 'Deep dive into advanced JavaScript concepts including async programming, closures, and ES6+ features.',
//       duration: '10 weeks',
//       students: 189,
//       rating: 4.9,
//       image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Advanced',
//       price: '$99',
//       instructor: 'Mike Chen',
//       category: 'Programming'
//     },
//     {
//       id: 'fullstack-development',
//       title: 'Full-Stack Development',
//       description: 'Complete web development course covering frontend, backend, databases, and deployment strategies.',
//       duration: '16 weeks',
//       students: 156,
//       rating: 4.7,
//       image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Intermediate',
//       price: '$199',
//       instructor: 'Alex Rodriguez',
//       category: 'Full-Stack'
//     },
//     {
//       id: 'python-data-science',
//       title: 'Python for Data Science',
//       description: 'Learn Python programming with focus on data analysis, visualization, and machine learning fundamentals.',
//       duration: '12 weeks',
//       students: 298,
//       rating: 4.6,
//       image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Beginner',
//       price: '$149',
//       instructor: 'Dr. Emily Watson',
//       category: 'Data Science'
//     },
//     {
//       id: 'mobile-app-development',
//       title: 'Mobile App Development',
//       description: 'Build native mobile applications using React Native. Learn to deploy apps to both iOS and Android.',
//       duration: '14 weeks',
//       students: 167,
//       rating: 4.8,
//       image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Intermediate',
//       price: '$179',
//       instructor: 'David Kim',
//       category: 'Mobile'
//     },
//     {
//       id: 'devops-essentials',
//       title: 'DevOps Essentials',
//       description: 'Learn modern DevOps practices including CI/CD, containerization, and cloud deployment strategies.',
//       duration: '10 weeks',
//       students: 203,
//       rating: 4.7,
//       image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
//       level: 'Advanced',
//       price: '$159',
//       instructor: 'Lisa Thompson',
//       category: 'DevOps'
//     }
//   ];

//   const filterOptions = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
//   const courseFilterOptions = ['All Courses', 'Frontend', 'Programming', 'Full-Stack', 'Data Science', 'Mobile', 'DevOps'];

//   const filteredCourses = courses.filter(course => {
//     const levelMatch = selectedFilter === 'All Levels' || course.level === selectedFilter;
//     const courseMatch = selectedCourseFilter === 'All Courses' || course.category === selectedCourseFilter;
//     return levelMatch && courseMatch;
//   });

//   const handleViewCourse = (courseId: string) => {
//     navigate(`/course/${courseId}`);
//   };

//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case 'Beginner': return 'bg-green-100 text-green-800';
//       case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
//       case 'Advanced': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'Frontend': return 'bg-blue-100 text-blue-800';
//       case 'Programming': return 'bg-purple-100 text-purple-800';
//       case 'Full-Stack': return 'bg-indigo-100 text-indigo-800';
//       case 'Data Science': return 'bg-pink-100 text-pink-800';
//       case 'Mobile': return 'bg-cyan-100 text-cyan-800';
//       case 'DevOps': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   return (
//     <section id="training" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Featured Training Courses
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Choose from our carefully curated selection of programming courses, 
//             designed to take you from beginner to expert level.
//           </p>
          
//           {/* Filter Dropdowns */}
//           <div className="flex justify-center mt-8 space-x-4">
//             {/* Course Category Filter */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsCourseFilterOpen(!isCourseFilterOpen)}
//                 className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
//               >
//                 <Filter className="h-4 w-4" />
//                 <span>{selectedCourseFilter}</span>
//                 <ChevronDown className={`h-4 w-4 transition-transform ${isCourseFilterOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isCourseFilterOpen && (
//                 <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
//                   {courseFilterOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setSelectedCourseFilter(option);
//                         setIsCourseFilterOpen(false);
//                       }}
//                       className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
//                         selectedCourseFilter === option 
//                           ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
//                           : 'text-gray-700 dark:text-gray-300'
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Level Filter */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
//               >
//                 <Filter className="h-4 w-4" />
//                 <span>{selectedFilter}</span>
//                 <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isFilterOpen && (
//                 <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
//                   {filterOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setSelectedFilter(option);
//                         setIsFilterOpen(false);
//                       }}
//                       className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
//                         selectedFilter === option 
//                           ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
//                           : 'text-gray-700 dark:text-gray-300'
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredCourses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 left-4 space-y-2">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
//                     {course.level}
//                   </span>
//                   <div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
//                       {course.category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     {course.price}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                   {course.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
//                   {course.description}
//                 </p>

//                 <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1" />
//                     {course.duration}
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-1" />
//                     {course.students} students
//                   </div>
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
//                     {course.rating}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleViewCourse(course.id)}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
//                 >
//                   View Course
//                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Training;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, ArrowRight, Filter, ChevronDown, Search, X } from 'lucide-react';

const Training = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = React.useState('All Levels');
  const [selectedCourseFilter, setSelectedCourseFilter] = React.useState('All Courses');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isCourseFilterOpen, setIsCourseFilterOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

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
      instructor: 'Sarah Johnson',
      category: 'Frontend'
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
      instructor: 'Mike Chen',
      category: 'Programming'
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
      instructor: 'Alex Rodriguez',
      category: 'Full-Stack'
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
      instructor: 'Dr. Emily Watson',
      category: 'Data Science'
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
      instructor: 'David Kim',
      category: 'Mobile'
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
      instructor: 'Lisa Thompson',
      category: 'DevOps'
    }
  ];

  const filterOptions = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const courseFilterOptions = ['All Courses', 'Frontend', 'Programming', 'Full-Stack', 'Data Science', 'Mobile', 'DevOps'];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedFilter === 'All Levels' || course.level === selectedFilter;
    const courseMatch = selectedCourseFilter === 'All Courses' || course.category === selectedCourseFilter;
    const searchMatch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return levelMatch && courseMatch && searchMatch;
  });

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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Frontend': return 'bg-blue-100 text-blue-800';
      case 'Programming': return 'bg-purple-100 text-purple-800';
      case 'Full-Stack': return 'bg-indigo-100 text-indigo-800';
      case 'Data Science': return 'bg-pink-100 text-pink-800';
      case 'Mobile': return 'bg-cyan-100 text-cyan-800';
      case 'DevOps': return 'bg-orange-100 text-orange-800';
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose from our carefully curated selection of programming courses, 
            designed to take you from beginner to expert level.
          </p>
          
          {/* Search Bar and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-evenly gap-4 mb-6 max-w-6xl mx-auto">
            {/* Search Bar - Center */}
            <div className="flex-1 flex justify-center md:justify-center">
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses, instructors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Filter Dropdowns - Right Side */}
            <div className="flex justify-center md:justify-end space-x-4">
            {/* Course Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsCourseFilterOpen(!isCourseFilterOpen)}
                className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
              >
                <Filter className="h-4 w-4" />
                <span>{selectedCourseFilter}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCourseFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCourseFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  {courseFilterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCourseFilter(option);
                        setIsCourseFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedCourseFilter === option 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Level Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
              >
                <Filter className="h-4 w-4" />
                <span>{selectedFilter}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedFilter === option 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 max-w-6xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Showing {filteredCourses.length} of {courses.length} courses
              {searchQuery && (
                <span className="ml-1">
                  for "<span className="font-semibold text-gray-900 dark:text-white">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
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
                  <div className="absolute top-4 left-4 space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                    </div>
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
        ) : (
          /* No Results Message */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchQuery 
                  ? `No courses match your search for "${searchQuery}". Try adjusting your search terms or filters.`
                  : 'No courses match your current filters. Try adjusting your filter selections.'
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('All Levels');
                  setSelectedCourseFilter('All Courses');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Training;