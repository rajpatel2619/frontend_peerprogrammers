// // import React, { useState } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import {
// //   ArrowLeft,
// //   Play,
// //   BookOpen,
// //   Users,
// //   Calendar,
// //   Award,
// //   Settings
// // } from 'lucide-react';

// // import StudentTab from '../components/StudentTab';
// // import TeacherTab from '../components/TeacherTab';

// // const CourseDetailPage = () => {
// //   const { courseId } = useParams();
// //   const [activeTab, setActiveTab] = useState('student');

// //   const courseData = {
// //     'react-fundamentals': {
// //       title: 'React Fundamentals',
// //       description: 'Master the basics of React including components, hooks, and state management.',
// //       instructor: 'Sarah Johnson',
// //       duration: '8 weeks',
// //       students: 234,
// //       image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     },
// //     'javascript-advanced': {
// //       title: 'Advanced JavaScript',
// //       description: 'Deep dive into advanced JavaScript concepts including async programming, closures, and ES6+ features.',
// //       instructor: 'Mike Chen',
// //       duration: '10 weeks',
// //       students: 189,
// //       image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     },
// //     'fullstack-development': {
// //       title: 'Full-Stack Development',
// //       description: 'Complete web development course covering frontend, backend, databases, and deployment.',
// //       instructor: 'Alex Rodriguez',
// //       duration: '16 weeks',
// //       students: 156,
// //       image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     },
// //     'python-data-science': {
// //       title: 'Python for Data Science',
// //       description: 'Learn Python programming with focus on data analysis, visualization, and machine learning fundamentals.',
// //       instructor: 'Dr. Emily Watson',
// //       duration: '12 weeks',
// //       students: 298,
// //       image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     },
// //     'mobile-app-development': {
// //       title: 'Mobile App Development',
// //       description: 'Build native mobile applications using React Native. Learn to deploy apps to both iOS and Android.',
// //       instructor: 'David Kim',
// //       duration: '14 weeks',
// //       students: 167,
// //       image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     },
// //     'devops-essentials': {
// //       title: 'DevOps Essentials',
// //       description: 'Learn modern DevOps practices including CI/CD, containerization, and cloud deployment strategies.',
// //       instructor: 'Lisa Thompson',
// //       duration: '10 weeks',
// //       students: 203,
// //       image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200'
// //     }
// //   };

// //   const course = courseData[courseId] || courseData['react-fundamentals'];

// //   return (
// //     <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
// //       {/* Course Header */}
// //       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //           <Link
// //             to="/"
// //             className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
// //           >
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             Back to Courses
// //           </Link>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
// //             <div>
// //               <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
// //               <p className="text-xl text-blue-100 mb-6">{course.description}</p>

// //               <div className="flex flex-wrap gap-6 text-sm">
// //                 <div className="flex items-center">
// //                   <Users className="h-4 w-4 mr-2" />
// //                   {course.students} Students
// //                 </div>
// //                 <div className="flex items-center">
// //                   <Calendar className="h-4 w-4 mr-2" />
// //                   {course.duration}
// //                 </div>
// //                 <div className="flex items-center">
// //                   <Award className="h-4 w-4 mr-2" />
// //                   Instructor: {course.instructor}
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="relative">
// //               <img
// //                 src={course.image}
// //                 alt={course.title}
// //                 className="rounded-lg shadow-xl w-full h-64 object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
// //                 <button className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-full hover:bg-opacity-30 transition-all">
// //                   <Play className="h-8 w-8 text-white" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tab Navigation */}
// //       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 transition-colors duration-300">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex space-x-8">
// //             <button
// //               onClick={() => setActiveTab('student')}
// //               className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
// //                 activeTab === 'student'
// //                   ? 'border-blue-600 text-blue-600 dark:text-blue-400'
// //                   : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
// //               }`}
// //             >
// //               <div className="flex items-center">
// //                 <BookOpen className="h-4 w-4 mr-2" />
// //                 Student View
// //               </div>
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('teacher')}
// //               className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
// //                 activeTab === 'teacher'
// //                   ? 'border-blue-600 text-blue-600 dark:text-blue-400'
// //                   : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
// //               }`}
// //             >
// //               <div className="flex items-center">
// //                 <Settings className="h-4 w-4 mr-2" />
// //                 Teacher View
// //               </div>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {activeTab === 'student' ? (
// //           <StudentTab course={course} />
// //         ) : (
// //           <TeacherTab course={course} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseDetailPage;

// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Play, Users, Clock, Star, Globe, CheckCircle, ChevronDown, ChevronRight, Award, BookOpen, Video, FileText, Download, Shield, Infinity, Calendar, DollarSign, Linkedin, Github, Mail } from 'lucide-react';
// import InstructorModal from '../components/InstructorModal';

// const CourseDetailPage = () => {
//   const { courseId } = useParams();
//   const [expandedSections, setExpandedSections] = useState({});
//   const [expandedFAQs, setExpandedFAQs] = useState({});
//   const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

//   const courseData = {
//     'react-fundamentals': {
//       title: 'Building the Modern Web: React Fundamentals Bootcamp',
//       description: 'Dive into the world of modern web development with this hands-on React bootcamp. From mastering HTML and CSS to building dynamic, responsive interfaces with JavaScript and React, you\'ll gain the skills needed to craft professional-grade websites and web apps. Whether you\'re a beginner or brushing up on the latest tech, this course covers essential tools, frameworks, and best practices to help you build fast, accessible, and visually stunning web experiences.',
//       instructor: {
//         name: 'Sarah Johnson',
//         title: 'Senior React Developer & UI/UX Specialist',
//         image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/sarahjohnson',
//         portfolio: 'https://sarahjohnson.dev'
//       },
//       duration: '8 weeks',
//       students: 234,
//       image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Beginner',
//       originalPrice: 3999,
//       currentPrice: 1999,
//       rating: 4.8,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Build responsive websites using HTML5 and CSS3',
//         'Create dynamic user interfaces with JavaScript and React',
//         'Implement modern design practices like Flexbox and CSS Grid',
//         'Use version control with Git and GitHub',
//         'Optimize web performance and accessibility',
//         'Deploy frontend projects using platforms like Vercel or Netlify'
//       ],
//       courseContent: [
//         { title: 'Introduction to Web Development', lessons: 5, duration: '2h 30m' },
//         { title: 'HTML Foundations', lessons: 8, duration: '4h 15m' },
//         { title: 'CSS Fundamentals', lessons: 12, duration: '6h 45m' },
//         { title: 'Version Control with Git', lessons: 6, duration: '3h 20m' },
//         { title: 'Modern JavaScript', lessons: 15, duration: '8h 30m' },
//         { title: 'JavaScript Deep Dive', lessons: 10, duration: '5h 45m' },
//         { title: 'React Basics', lessons: 18, duration: '9h 15m' },
//         { title: 'React Advanced Concepts', lessons: 14, duration: '7h 30m' },
//         { title: 'Routing in React', lessons: 8, duration: '4h 20m' },
//         { title: 'Styling in React', lessons: 10, duration: '5h 10m' },
//         { title: 'Animation & Interaction', lessons: 7, duration: '3h 45m' },
//         { title: 'API Integration', lessons: 9, duration: '4h 50m' },
//         { title: 'Testing & Debugging', lessons: 6, duration: '3h 15m' },
//         { title: 'Deploying & Optimizing Apps', lessons: 5, duration: '2h 40m' }
//       ],
//       requirements: [
//         'Basic computer skills and internet access',
//         'Willingness to learn and solve real-world problems',
//         'Curiosity and consistency — that\'s all you really need!',
//         'Stable internet connection for accessing course content',
//         'Basic familiarity with using the terminal/command line (helpful but not required)'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 50', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Beginner', color: 'text-green-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '60+ hours of live classes', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Live Classes', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'How this course is different from others?',
//           answer: 'This course focuses on hands-on learning with real-world projects. You\'ll build actual applications while learning, not just follow along with tutorials. Our curriculum is updated regularly to reflect current industry standards and best practices.'
//         },
//         {
//           question: 'Will I receive a certificate?',
//           answer: 'Yes! Upon successful completion of the course and all assignments, you\'ll receive a certificate of completion that you can add to your LinkedIn profile and resume.'
//         },
//         {
//           question: 'What others benefits I will get?',
//           answer: 'Beyond the core curriculum, you\'ll get access to our exclusive community, career guidance, portfolio review sessions, and lifetime access to course updates and new content.'
//         },
//         {
//           question: 'What does it mean by 100% money-back guarantee?',
//           answer: 'If you\'re not satisfied with the course within the first 30 days, we\'ll provide a full refund, no questions asked. We\'re confident in the quality of our content and teaching methodology.'
//         },
//         {
//           question: 'What is affiliate program and how it works?',
//           answer: 'Our affiliate program allows you to earn commissions by referring students to our courses. You\'ll receive a unique referral link and earn up to 30% commission for each successful enrollment.'
//         },
//         {
//           question: 'Is this course beginner-friendly?',
//           answer: 'Absolutely! This course is designed for complete beginners. We start with the basics and gradually build up to more advanced concepts. No prior programming experience is required.'
//         },
//         {
//           question: 'Do we get community access to resolve our queries?',
//           answer: 'Yes! You\'ll get access to our private Discord community where you can ask questions, share projects, network with other students, and get help from instructors and teaching assistants.'
//         },
//         {
//           question: 'What will be the batch size?',
//           answer: 'We keep our batch sizes small (maximum 25 students) to ensure personalized attention and better interaction between students and instructors during live sessions.'
//         }
//       ]
//     },
//     'javascript-advanced': {
//       title: 'Advanced JavaScript Mastery: From Fundamentals to Expert',
//       description: 'Master advanced JavaScript concepts and become a proficient developer. This comprehensive course covers closures, async programming, design patterns, and modern ES6+ features. Perfect for developers looking to level up their JavaScript skills.',
//       instructor: {
//         name: 'Mike Chen',
//         title: 'JavaScript Architect & Performance Expert',
//         image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/mikechen',
//         portfolio: 'https://mikechen.dev'
//       },
//       duration: '10 weeks',
//       students: 189,
//       image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Advanced',
//       originalPrice: 4999,
//       currentPrice: 2499,
//       rating: 4.9,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Master closures, scope, and the JavaScript execution context',
//         'Understand asynchronous programming with Promises and async/await',
//         'Implement advanced design patterns and architectural concepts',
//         'Optimize JavaScript performance and memory management',
//         'Work with modern ES6+ features and syntax',
//         'Build scalable applications with proper error handling'
//       ],
//       courseContent: [
//         { title: 'JavaScript Engine Deep Dive', lessons: 8, duration: '4h 20m' },
//         { title: 'Advanced Functions & Closures', lessons: 10, duration: '5h 30m' },
//         { title: 'Asynchronous JavaScript Mastery', lessons: 12, duration: '6h 45m' },
//         { title: 'Object-Oriented Programming', lessons: 9, duration: '4h 50m' },
//         { title: 'Functional Programming Concepts', lessons: 11, duration: '5h 40m' },
//         { title: 'Design Patterns in JavaScript', lessons: 14, duration: '7h 15m' },
//         { title: 'Error Handling & Debugging', lessons: 7, duration: '3h 30m' },
//         { title: 'Performance Optimization', lessons: 8, duration: '4h 10m' },
//         { title: 'Modern JavaScript Features', lessons: 13, duration: '6h 25m' },
//         { title: 'Testing Advanced Applications', lessons: 6, duration: '3h 20m' }
//       ],
//       requirements: [
//         'Solid understanding of JavaScript fundamentals',
//         'Experience with basic programming concepts',
//         'Familiarity with HTML and CSS',
//         'At least 1-2 years of programming experience',
//         'Understanding of basic data structures and algorithms'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 98', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Advanced', color: 'text-red-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '80+ hours of content', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Downloadable Resources', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'Is this course suitable for beginners?',
//           answer: 'This is an advanced course designed for developers with solid JavaScript fundamentals. We recommend having at least 1-2 years of JavaScript experience before enrolling.'
//         },
//         {
//           question: 'What projects will I build?',
//           answer: 'You\'ll build several advanced projects including a task management system, a real-time chat application, and a performance-optimized web application using modern JavaScript patterns.'
//         },
//         {
//           question: 'How is this different from basic JavaScript courses?',
//           answer: 'This course goes deep into JavaScript internals, advanced patterns, and performance optimization. We cover topics like memory management, V8 engine optimization, and enterprise-level architecture patterns.'
//         },
//         {
//           question: 'Will I get job placement assistance?',
//           answer: 'Yes! We provide career guidance, resume review, interview preparation, and connections to our network of hiring partners for qualified graduates.'
//         }
//       ]
//     },
//     'fullstack-development': {
//       title: 'Complete Full-Stack Web Development Bootcamp',
//       description: 'Become a complete full-stack developer with this comprehensive bootcamp. Learn frontend technologies, backend development, databases, and deployment strategies. Build production-ready applications from scratch.',
//       instructor: {
//         name: 'Alex Rodriguez',
//         title: 'Full-Stack Architect & Cloud Solutions Expert',
//         image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/alexrodriguez',
//         portfolio: 'https://alexrodriguez.dev'
//       },
//       duration: '16 weeks',
//       students: 156,
//       image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Intermediate',
//       originalPrice: 7999,
//       currentPrice: 3999,
//       rating: 4.7,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Build complete web applications from frontend to backend',
//         'Master React, Node.js, Express, and MongoDB/PostgreSQL',
//         'Implement user authentication and authorization',
//         'Design and build RESTful APIs and GraphQL endpoints',
//         'Deploy applications to cloud platforms (AWS, Heroku, Vercel)',
//         'Implement CI/CD pipelines and DevOps practices'
//       ],
//       courseContent: [
//         { title: 'Frontend Fundamentals', lessons: 15, duration: '8h 30m' },
//         { title: 'React Development', lessons: 20, duration: '11h 45m' },
//         { title: 'Backend with Node.js', lessons: 18, duration: '10h 20m' },
//         { title: 'Database Design & Management', lessons: 12, duration: '6h 50m' },
//         { title: 'API Development', lessons: 16, duration: '9h 15m' },
//         { title: 'Authentication & Security', lessons: 10, duration: '5h 40m' },
//         { title: 'Testing Full-Stack Apps', lessons: 8, duration: '4h 30m' },
//         { title: 'Deployment & DevOps', lessons: 14, duration: '7h 25m' },
//         { title: 'Performance Optimization', lessons: 9, duration: '5h 10m' },
//         { title: 'Final Project', lessons: 6, duration: '3h 45m' }
//       ],
//       requirements: [
//         'Basic understanding of HTML, CSS, and JavaScript',
//         'Familiarity with programming concepts',
//         'Understanding of how web applications work',
//         'Willingness to learn multiple technologies',
//         'Access to a computer with at least 8GB RAM'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 128', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Intermediate', color: 'text-yellow-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '120+ hours of content', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Project Source Code', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'What technologies will I learn?',
//           answer: 'You\'ll learn React, Node.js, Express, MongoDB/PostgreSQL, JWT authentication, AWS deployment, Docker, and modern development tools like Git, VS Code, and Postman.'
//         },
//         {
//           question: 'How many projects will I build?',
//           answer: 'You\'ll build 5 major projects including an e-commerce platform, social media app, task management system, blog platform, and a final capstone project of your choice.'
//         },
//         {
//           question: 'Is this course updated regularly?',
//           answer: 'Yes! We update the course content every 3 months to include the latest technologies, best practices, and industry trends. All updates are included with your lifetime access.'
//         },
//         {
//           question: 'Do I need prior backend experience?',
//           answer: 'No prior backend experience is required. We start with the basics and gradually build up to advanced concepts. However, basic JavaScript knowledge is essential.'
//         }
//       ]
//     },
//     'python-data-science': {
//       title: 'Python for Data Science: Complete Analytics Bootcamp',
//       description: 'Master Python programming with a focus on data analysis, visualization, and machine learning. Learn to work with real datasets and build predictive models using industry-standard tools and libraries.',
//       instructor: {
//         name: 'Dr. Emily Watson',
//         title: 'Data Science Lead & Machine Learning Researcher',
//         image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/emilywatson',
//         portfolio: 'https://emilywatson.dev'
//       },
//       duration: '12 weeks',
//       students: 298,
//       image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Beginner',
//       originalPrice: 5999,
//       currentPrice: 2999,
//       rating: 4.6,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Master Python programming fundamentals and advanced concepts',
//         'Analyze and manipulate data using Pandas and NumPy',
//         'Create stunning visualizations with Matplotlib and Seaborn',
//         'Build machine learning models with Scikit-learn',
//         'Work with real-world datasets and solve business problems',
//         'Deploy data science projects and create interactive dashboards'
//       ],
//       courseContent: [
//         { title: 'Python Programming Basics', lessons: 12, duration: '6h 30m' },
//         { title: 'Data Structures & Algorithms', lessons: 10, duration: '5h 20m' },
//         { title: 'NumPy for Numerical Computing', lessons: 8, duration: '4h 15m' },
//         { title: 'Pandas for Data Manipulation', lessons: 15, duration: '8h 45m' },
//         { title: 'Data Visualization', lessons: 12, duration: '6h 50m' },
//         { title: 'Statistical Analysis', lessons: 9, duration: '5h 10m' },
//         { title: 'Machine Learning Fundamentals', lessons: 18, duration: '10h 30m' },
//         { title: 'Advanced ML Algorithms', lessons: 14, duration: '8h 20m' },
//         { title: 'Model Deployment', lessons: 7, duration: '4h 15m' },
//         { title: 'Capstone Projects', lessons: 5, duration: '3h 30m' }
//       ],
//       requirements: [
//         'Basic computer skills and mathematical understanding',
//         'High school level mathematics (algebra and statistics helpful)',
//         'No prior programming experience required',
//         'Curiosity about data and problem-solving',
//         'Access to a computer with Python installation capabilities'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 110', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Beginner', color: 'text-green-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '90+ hours of content', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Datasets & Notebooks', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'Do I need math background for this course?',
//           answer: 'Basic high school mathematics is helpful but not required. We cover all necessary statistical concepts as part of the course curriculum.'
//         },
//         {
//           question: 'What datasets will we work with?',
//           answer: 'We use real-world datasets from various domains including finance, healthcare, e-commerce, and social media. You\'ll work on projects like sales forecasting, customer segmentation, and sentiment analysis.'
//         },
//         {
//           question: 'Will I learn machine learning?',
//           answer: 'Yes! The course covers both supervised and unsupervised learning algorithms, including linear regression, decision trees, clustering, and neural networks using Scikit-learn and TensorFlow.'
//         },
//         {
//           question: 'Can I get a job after this course?',
//           answer: 'Many of our graduates have successfully transitioned to data science roles. We provide career guidance, portfolio development support, and interview preparation to help you land your first data science job.'
//         }
//       ]
//     },
//     'mobile-app-development': {
//       title: 'React Native Mobile App Development Masterclass',
//       description: 'Build professional mobile applications for iOS and Android using React Native. Learn to create cross-platform apps with native performance and publish them to app stores.',
//       instructor: {
//         name: 'David Kim',
//         title: 'Mobile Development Lead & React Native Expert',
//         image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/davidkim',
//         portfolio: 'https://davidkim.dev'
//       },
//       duration: '14 weeks',
//       students: 167,
//       image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Intermediate',
//       originalPrice: 6999,
//       currentPrice: 3499,
//       rating: 4.8,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Build cross-platform mobile apps with React Native',
//         'Implement native device features (camera, GPS, push notifications)',
//         'Design beautiful and responsive mobile user interfaces',
//         'Integrate with REST APIs and handle data persistence',
//         'Publish apps to Google Play Store and Apple App Store',
//         'Optimize app performance and handle offline functionality'
//       ],
//       courseContent: [
//         { title: 'React Native Fundamentals', lessons: 12, duration: '6h 45m' },
//         { title: 'Navigation & Routing', lessons: 8, duration: '4h 30m' },
//         { title: 'UI Components & Styling', lessons: 15, duration: '8h 20m' },
//         { title: 'State Management', lessons: 10, duration: '5h 50m' },
//         { title: 'Native Device Features', lessons: 14, duration: '7h 40m' },
//         { title: 'API Integration', lessons: 9, duration: '5h 15m' },
//         { title: 'Data Persistence', lessons: 7, duration: '4h 10m' },
//         { title: 'Performance Optimization', lessons: 6, duration: '3h 30m' },
//         { title: 'Testing Mobile Apps', lessons: 8, duration: '4h 45m' },
//         { title: 'App Store Deployment', lessons: 5, duration: '3h 20m' }
//       ],
//       requirements: [
//         'Solid understanding of React and JavaScript',
//         'Basic knowledge of mobile app concepts',
//         'Familiarity with ES6+ JavaScript features',
//         'Understanding of REST APIs and JSON',
//         'Access to macOS for iOS development (optional but recommended)'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 94', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Intermediate', color: 'text-yellow-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '85+ hours of content', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Source Code & Assets', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'Do I need a Mac for iOS development?',
//           answer: 'While a Mac is required for building and testing iOS apps, you can learn React Native development on any platform. We provide cloud-based solutions for iOS testing if you don\'t have a Mac.'
//         },
//         {
//           question: 'What apps will we build?',
//           answer: 'You\'ll build 4 complete apps: a weather app, social media app, e-commerce app, and a fitness tracking app. Each project focuses on different aspects of mobile development.'
//         },
//         {
//           question: 'How is React Native different from native development?',
//           answer: 'React Native allows you to write code once and deploy to both iOS and Android, significantly reducing development time while maintaining near-native performance.'
//         },
//         {
//           question: 'Will I learn app store submission?',
//           answer: 'Yes! We cover the complete app store submission process for both Google Play Store and Apple App Store, including app signing, metadata preparation, and review guidelines.'
//         }
//       ]
//     },
//     'devops-essentials': {
//       title: 'DevOps Essentials: CI/CD, Docker & Cloud Deployment',
//       description: 'Master modern DevOps practices including continuous integration, containerization, and cloud deployment. Learn to automate development workflows and manage scalable infrastructure.',
//       instructor: {
//         name: 'Lisa Thompson',
//         title: 'DevOps Engineer & Cloud Infrastructure Specialist',
//         image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
//         linkedin: 'https://linkedin.com/in/lisathompson',
//         portfolio: 'https://lisathompson.dev'
//       },
//       duration: '10 weeks',
//       students: 203,
//       image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200',
//       level: 'Advanced',
//       originalPrice: 5999,
//       currentPrice: 2999,
//       rating: 4.7,
//       language: 'English',
//       certificate: true,
//       whatYouWillLearn: [
//         'Implement CI/CD pipelines with GitHub Actions and Jenkins',
//         'Master containerization with Docker and Kubernetes',
//         'Deploy applications to AWS, Azure, and Google Cloud',
//         'Monitor and maintain production systems',
//         'Automate infrastructure with Terraform and Ansible',
//         'Implement security best practices and compliance'
//       ],
//       courseContent: [
//         { title: 'DevOps Fundamentals', lessons: 8, duration: '4h 20m' },
//         { title: 'Version Control & Git Workflows', lessons: 6, duration: '3h 30m' },
//         { title: 'Continuous Integration', lessons: 10, duration: '5h 45m' },
//         { title: 'Docker & Containerization', lessons: 12, duration: '6h 50m' },
//         { title: 'Kubernetes Orchestration', lessons: 14, duration: '8h 15m' },
//         { title: 'Cloud Platforms', lessons: 16, duration: '9h 30m' },
//         { title: 'Infrastructure as Code', lessons: 9, duration: '5h 20m' },
//         { title: 'Monitoring & Logging', lessons: 7, duration: '4h 10m' },
//         { title: 'Security & Compliance', lessons: 8, duration: '4h 45m' },
//         { title: 'Advanced DevOps Practices', lessons: 6, duration: '3h 40m' }
//       ],
//       requirements: [
//         'Basic understanding of software development',
//         'Familiarity with Linux command line',
//         'Basic knowledge of cloud computing concepts',
//         'Understanding of networking fundamentals',
//         'Experience with at least one programming language'
//       ],
//       courseIncludes: [
//         { icon: Video, text: 'Lectures: 96', color: 'text-blue-600' },
//         { icon: BookOpen, text: 'Level: Advanced', color: 'text-red-600' },
//         { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
//         { icon: Clock, text: '75+ hours of content', color: 'text-orange-600' },
//         { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
//         { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
//         { icon: Download, text: 'Configuration Files', color: 'text-cyan-600' }
//       ],
//       faqs: [
//         {
//           question: 'Do I need cloud platform experience?',
//           answer: 'No prior cloud experience is required. We start with cloud fundamentals and gradually progress to advanced topics. We provide free cloud credits for hands-on practice.'
//         },
//         {
//           question: 'Which cloud platforms are covered?',
//           answer: 'We cover AWS (primary focus), Microsoft Azure, and Google Cloud Platform. You\'ll learn platform-agnostic concepts that apply to any cloud provider.'
//         },
//         {
//           question: 'Will I get hands-on practice?',
//           answer: 'Absolutely! This course is heavily hands-on with labs, projects, and real-world scenarios. You\'ll build complete CI/CD pipelines and deploy applications to production.'
//         },
//         {
//           question: 'Is this course suitable for developers?',
//           answer: 'Yes! This course is perfect for developers who want to understand the deployment and operations side of software development. It bridges the gap between development and operations.'
//         }
//       ]
//     }
//   };

//   const course = courseData[courseId] || courseData['react-fundamentals'];

//   // Get instructor data based on course instructor
//   const getInstructorData = (instructorName) => {
//     const instructors = {
//       'Sarah Johnson': {
//         name: 'Sarah Johnson',
//         title: 'Senior React Developer & UI/UX Specialist',
//         bio: 'Sarah is a passionate React developer with over 6 years of experience building modern web applications. She has worked at leading tech companies including Airbnb and Spotify, where she specialized in creating intuitive user interfaces and scalable component architectures. Sarah believes in making complex concepts accessible to beginners while maintaining industry best practices.',
//         experience: '6+ Years',
//         specialties: ['React', 'JavaScript', 'TypeScript', 'CSS', 'UI/UX Design', 'Redux', 'Next.js', 'Testing'],
//         education: [
//           'B.S. Computer Science - MIT (2017)',
//           'UX Design Certificate - Google (2019)',
//           'React Advanced Patterns Certification (2021)'
//         ],
//         achievements: [
//           'Created React component library used by 100+ companies',
//           'Speaker at React Summit 2023 and Frontend Masters',
//           'Contributed to React DevTools and popular open-source libraries',
//           'Mentored 150+ junior developers through bootcamps',
//           'Winner of "Best Frontend Innovation" - Web Awards 2022'
//         ],
//         coursesCount: 8,
//         studentsCount: 15000,
//         rating: 4.8,
//         location: 'San Francisco, CA',
//         email: 'sarah.johnson@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/sarahjohnson',
//         github: 'https://github.com/sarahjohnson',
//         image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
//       },
//       'Mike Chen': {
//         name: 'Mike Chen',
//         title: 'JavaScript Architect & Performance Expert',
//         bio: 'Mike is a JavaScript expert with 10+ years of experience in building high-performance web applications. He has worked as a senior engineer at Google and Netflix, focusing on JavaScript optimization, async programming, and modern ES6+ features. Mike is known for his deep understanding of JavaScript internals and ability to explain complex concepts clearly.',
//         experience: '10+ Years',
//         specialties: ['JavaScript', 'Node.js', 'TypeScript', 'Performance Optimization', 'Async Programming', 'V8 Engine', 'WebAssembly', 'GraphQL'],
//         education: [
//           'M.S. Computer Science - Stanford University (2013)',
//           'B.S. Software Engineering - UC Berkeley (2011)',
//           'Google Cloud Professional Developer (2020)'
//         ],
//         achievements: [
//           'Authored "Advanced JavaScript Patterns" - bestselling book',
//           'Core contributor to Node.js and V8 performance improvements',
//           'Speaker at JSConf, Node.js Interactive, and Google I/O',
//           'Created JavaScript performance tools used by major companies',
//           'Technical reviewer for O\'Reilly JavaScript publications'
//         ],
//         coursesCount: 12,
//         studentsCount: 28000,
//         rating: 4.9,
//         location: 'Seattle, WA',
//         email: 'mike.chen@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/mikechen',
//         github: 'https://github.com/mikechen',
//         image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
//       },
//       'Alex Rodriguez': {
//         name: 'Alex Rodriguez',
//         title: 'Full-Stack Architect & Cloud Solutions Expert',
//         bio: 'Alex is a seasoned full-stack developer with 12+ years of experience building enterprise-scale applications. Having worked at Amazon Web Services and Microsoft Azure, Alex specializes in cloud architecture, microservices, and DevOps practices. Alex is passionate about teaching the complete software development lifecycle from frontend to deployment.',
//         experience: '12+ Years',
//         specialties: ['Full-Stack Development', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Microservices', 'CI/CD', 'Database Design'],
//         education: [
//           'M.S. Software Engineering - Carnegie Mellon (2011)',
//           'B.S. Computer Science - University of Texas (2009)',
//           'AWS Solutions Architect Professional (2018)',
//           'Microsoft Azure Architect Expert (2020)'
//         ],
//         achievements: [
//           'Designed cloud infrastructure serving 10M+ users daily',
//           'Led engineering teams at 3 successful startups',
//           'AWS Community Hero and Microsoft MVP',
//           'Published 20+ technical articles on cloud architecture',
//           'Keynote speaker at AWS re:Invent and Microsoft Build'
//         ],
//         coursesCount: 18,
//         studentsCount: 35000,
//         rating: 4.7,
//         location: 'Austin, TX',
//         email: 'alex.rodriguez@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/alexrodriguez',
//         github: 'https://github.com/alexrodriguez',
//         image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
//       },
//       'Dr. Emily Watson': {
//         name: 'Dr. Emily Watson',
//         title: 'Data Science Lead & Machine Learning Researcher',
//         bio: 'Dr. Emily Watson is a data science expert with a Ph.D. in Machine Learning and 8+ years of industry experience. She has led data science teams at Tesla and Uber, working on autonomous systems and predictive analytics. Emily specializes in making data science accessible to programmers from all backgrounds, focusing on practical applications and real-world problem solving.',
//         experience: '8+ Years',
//         specialties: ['Python', 'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Statistical Modeling'],
//         education: [
//           'Ph.D. Machine Learning - Stanford University (2015)',
//           'M.S. Statistics - UC Berkeley (2012)',
//           'B.S. Mathematics - Harvard University (2010)'
//         ],
//         achievements: [
//           'Published 25+ peer-reviewed papers in top ML conferences',
//           'Led data science team that improved Uber\'s ETA accuracy by 40%',
//           'Kaggle Grandmaster with 5 competition wins',
//           'Created open-source ML library with 50k+ GitHub stars',
//           'Featured in Forbes "30 Under 30" in Science category'
//         ],
//         coursesCount: 10,
//         studentsCount: 22000,
//         rating: 4.6,
//         location: 'Palo Alto, CA',
//         email: 'emily.watson@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/emilywatson',
//         github: 'https://github.com/emilywatson',
//         image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
//       },
//       'David Kim': {
//         name: 'David Kim',
//         title: 'Mobile Development Lead & React Native Expert',
//         bio: 'David is a mobile development specialist with 9+ years of experience building iOS and Android applications. He has worked at Instagram and WhatsApp, where he contributed to apps used by billions of users. David is passionate about React Native and cross-platform development, helping developers build efficient mobile apps with a single codebase.',
//         experience: '9+ Years',
//         specialties: ['React Native', 'iOS Development', 'Android Development', 'Mobile UI/UX', 'App Store Optimization', 'Performance Optimization', 'Native Modules'],
//         education: [
//           'M.S. Mobile Computing - Georgia Tech (2014)',
//           'B.S. Computer Science - UCLA (2012)',
//           'iOS Developer Certification - Apple (2015)',
//           'Android Developer Certification - Google (2016)'
//         ],
//         achievements: [
//           'Built mobile features used by 2B+ users at Meta',
//           'Created React Native performance optimization framework',
//           'Speaker at React Native EU and Chain React conferences',
//           'Contributed to React Native core and popular libraries',
//           'Mentored mobile development teams at 5 startups'
//         ],
//         coursesCount: 14,
//         studentsCount: 18000,
//         rating: 4.8,
//         location: 'Los Angeles, CA',
//         email: 'david.kim@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/davidkim',
//         github: 'https://github.com/davidkim',
//         image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
//       },
//       'Lisa Thompson': {
//         name: 'Lisa Thompson',
//         title: 'DevOps Engineer & Cloud Infrastructure Specialist',
//         bio: 'Lisa is a DevOps expert with 11+ years of experience in cloud infrastructure and automation. She has worked at Netflix and Spotify, building scalable deployment pipelines and monitoring systems. Lisa specializes in making DevOps practices accessible to developers, focusing on practical automation and reliability engineering.',
//         experience: '11+ Years',
//         specialties: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Monitoring', 'Site Reliability Engineering', 'Infrastructure as Code'],
//         education: [
//           'M.S. Systems Engineering - MIT (2012)',
//           'B.S. Computer Engineering - Stanford (2010)',
//           'Certified Kubernetes Administrator (2019)',
//           'HashiCorp Terraform Associate (2020)'
//         ],
//         achievements: [
//           'Reduced deployment time by 90% at Netflix using automation',
//           'Built monitoring systems handling 100M+ requests/day',
//           'Created open-source DevOps tools used by 1000+ companies',
//           'Speaker at KubeCon, DockerCon, and DevOps World',
//           'Winner of "DevOps Excellence Award" - Cloud Native Foundation'
//         ],
//         coursesCount: 16,
//         studentsCount: 25000,
//         rating: 4.7,
//         location: 'Portland, OR',
//         email: 'lisa.thompson@peerprogrammers.com',
//         linkedin: 'https://linkedin.com/in/lisathompson',
//         github: 'https://github.com/lisathompson',
//         image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
//       }
//     };
    
//     return instructors[instructorName] || instructors['Sarah Johnson'];
//   };

//   const instructorData = getInstructorData(course.instructor.name);

//   const toggleSection = (sectionId) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//   };

//   const toggleFAQ = (faqId) => {
//     setExpandedFAQs(prev => ({
//       ...prev,
//       [faqId]: !prev[faqId]
//     }));
//   };

//   const getLevelColor = (level) => {
//     switch (level) {
//       case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
//       case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
//       case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

//   return (
//     <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* Instructor Modal */}
//       <InstructorModal
//         isOpen={isInstructorModalOpen}
//         onClose={() => setIsInstructorModalOpen(false)}
//         instructor={instructorData}
//       />

//       {/* Course Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Link 
//             to="/" 
//             className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Courses
//           </Link>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//             <div>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
//                   Frontend
//                 </span>
//                 <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
//                   Beginner
//                 </span>
//                 <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
//                   Paid
//                 </span>
//               </div>
              
//               <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
//               <p className="text-xl text-blue-100 mb-6">{course.description}</p>
              
//               <div className="flex flex-wrap gap-6 text-sm">
//                 <div className="flex items-center">
//                   <Users className="h-4 w-4 mr-2" />
//                   {course.students} Students
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2" />
//                   {course.duration}
//                 </div>
//                 <div className="flex items-center">
//                   <Star className="h-4 w-4 mr-2 text-yellow-300 fill-current" />
//                   {course.rating} Rating
//                 </div>
//               </div>
//             </div>
            
//             <div className="relative">
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="rounded-lg shadow-xl w-full h-64 object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
//                 <button className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-full hover:bg-opacity-30 transition-all">
//                   <Play className="h-8 w-8 text-white" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Course Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* What You Will Learn */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What You Will Learn</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {course.whatYouWillLearn.map((item, index) => (
//                   <div key={index} className="flex items-start">
//                     <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
//                     <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Course Content */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Content</h2>
//               <div className="space-y-2">
//                 {course.courseContent.map((section, index) => (
//                   <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
//                     <button
//                       onClick={() => toggleSection(`section-${index}`)}
//                       className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <div className="flex items-center">
//                         {expandedSections[`section-${index}`] ? (
//                           <ChevronDown className="h-4 w-4 mr-3 text-gray-500" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4 mr-3 text-gray-500" />
//                         )}
//                         <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         {section.lessons} lessons • {section.duration}
//                       </div>
//                     </button>
//                     {expandedSections[`section-${index}`] && (
//                       <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
//                         <div className="pt-4 text-sm text-gray-600 dark:text-gray-300">
//                           This section contains {section.lessons} comprehensive lessons covering all aspects of {section.title.toLowerCase()}.
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Requirements */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
//               <ul className="space-y-3">
//                 {course.requirements.map((requirement, index) => (
//                   <li key={index} className="flex items-start">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                     <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* FAQ */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
//               <div className="space-y-2">
//                 {course.faqs.map((faq, index) => (
//                   <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
//                     <button
//                       onClick={() => toggleFAQ(`faq-${index}`)}
//                       className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
//                       {expandedFAQs[`faq-${index}`] ? (
//                         <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
//                       ) : (
//                         <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
//                       )}
//                     </button>
//                     {expandedFAQs[`faq-${index}`] && (
//                       <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
//                         <div className="pt-4 text-gray-600 dark:text-gray-300">
//                           {faq.answer}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="space-y-6">
//             {/* Instructors */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Instructors</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={course.instructor.image}
//                     alt={course.instructor.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-900 dark:text-white">{course.instructor.name}</h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructor.title}</p>
//                     <div className="flex space-x-2 mt-1">
//                       <a
//                         href={course.instructor.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//                       >
//                         <Linkedin className="h-4 w-4" />
//                       </a>
//                       <a
//                         href={course.instructor.portfolio}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
//                       >
//                         <Globe className="h-4 w-4" />
//                       </a>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setIsInstructorModalOpen(true)}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                   >
//                     More Details
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Course Includes */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This Course Includes:</h3>
//               <div className="space-y-3">
//                 {course.courseIncludes.map((item, index) => (
//                   <div key={index} className="flex items-center">
//                     <item.icon className={`h-4 w-4 mr-3 ${item.color}`} />
//                     <span className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{course.currentPrice}</span>
//                     <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">₹{course.originalPrice}</span>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
//                     {course.level}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                   Batch of 25 only so hurry up!
//                 </p>
//                 <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
//                   Register Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Users, Clock, Star, Globe, CheckCircle, ChevronDown, ChevronRight, Award, BookOpen, Video, FileText, Download, Shield, Infinity, Calendar, DollarSign, Linkedin, Github, Mail } from 'lucide-react';
import InstructorModal from '../components/InstructorModal';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  const courseData = {
    'react-fundamentals': {
      title: 'Building the Modern Web: React Fundamentals Bootcamp',
      description: 'Dive into the world of modern web development with this hands-on React bootcamp. From mastering HTML and CSS to building dynamic, responsive interfaces with JavaScript and React, you\'ll gain the skills needed to craft professional-grade websites and web apps. Whether you\'re a beginner or brushing up on the latest tech, this course covers essential tools, frameworks, and best practices to help you build fast, accessible, and visually stunning web experiences.',
      instructor: {
        name: 'Sarah Johnson',
        title: 'Senior React Developer & UI/UX Specialist',
        image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        portfolio: 'https://sarahjohnson.dev'
      },
      duration: '8 weeks',
      students: 234,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Beginner',
      originalPrice: 3999,
      currentPrice: 1999,
      rating: 4.8,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Build responsive websites using HTML5 and CSS3',
        'Create dynamic user interfaces with JavaScript and React',
        'Implement modern design practices like Flexbox and CSS Grid',
        'Use version control with Git and GitHub',
        'Optimize web performance and accessibility',
        'Deploy frontend projects using platforms like Vercel or Netlify'
      ],
      courseContent: [
        { title: 'Introduction to Web Development', lessons: 5, duration: '2h 30m' },
        { title: 'HTML Foundations', lessons: 8, duration: '4h 15m' },
        { title: 'CSS Fundamentals', lessons: 12, duration: '6h 45m' },
        { title: 'Version Control with Git', lessons: 6, duration: '3h 20m' },
        { title: 'Modern JavaScript', lessons: 15, duration: '8h 30m' },
        { title: 'JavaScript Deep Dive', lessons: 10, duration: '5h 45m' },
        { title: 'React Basics', lessons: 18, duration: '9h 15m' },
        { title: 'React Advanced Concepts', lessons: 14, duration: '7h 30m' },
        { title: 'Routing in React', lessons: 8, duration: '4h 20m' },
        { title: 'Styling in React', lessons: 10, duration: '5h 10m' },
        { title: 'Animation & Interaction', lessons: 7, duration: '3h 45m' },
        { title: 'API Integration', lessons: 9, duration: '4h 50m' },
        { title: 'Testing & Debugging', lessons: 6, duration: '3h 15m' },
        { title: 'Deploying & Optimizing Apps', lessons: 5, duration: '2h 40m' }
      ],
      requirements: [
        'Basic computer skills and internet access',
        'Willingness to learn and solve real-world problems',
        'Curiosity and consistency — that\'s all you really need!',
        'Stable internet connection for accessing course content',
        'Basic familiarity with using the terminal/command line (helpful but not required)'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 50', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Beginner', color: 'text-green-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '60+ hours of live classes', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Live Classes', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'How this course is different from others?',
          answer: 'This course focuses on hands-on learning with real-world projects. You\'ll build actual applications while learning, not just follow along with tutorials. Our curriculum is updated regularly to reflect current industry standards and best practices.'
        },
        {
          question: 'Will I receive a certificate?',
          answer: 'Yes! Upon successful completion of the course and all assignments, you\'ll receive a certificate of completion that you can add to your LinkedIn profile and resume.'
        },
        {
          question: 'What others benefits I will get?',
          answer: 'Beyond the core curriculum, you\'ll get access to our exclusive community, career guidance, portfolio review sessions, and lifetime access to course updates and new content.'
        },
        {
          question: 'What does it mean by 100% money-back guarantee?',
          answer: 'If you\'re not satisfied with the course within the first 30 days, we\'ll provide a full refund, no questions asked. We\'re confident in the quality of our content and teaching methodology.'
        },
        {
          question: 'What is affiliate program and how it works?',
          answer: 'Our affiliate program allows you to earn commissions by referring students to our courses. You\'ll receive a unique referral link and earn up to 30% commission for each successful enrollment.'
        },
        {
          question: 'Is this course beginner-friendly?',
          answer: 'Absolutely! This course is designed for complete beginners. We start with the basics and gradually build up to more advanced concepts. No prior programming experience is required.'
        },
        {
          question: 'Do we get community access to resolve our queries?',
          answer: 'Yes! You\'ll get access to our private Discord community where you can ask questions, share projects, network with other students, and get help from instructors and teaching assistants.'
        },
        {
          question: 'What will be the batch size?',
          answer: 'We keep our batch sizes small (maximum 25 students) to ensure personalized attention and better interaction between students and instructors during live sessions.'
        }
      ]
    },
    'javascript-advanced': {
      title: 'Advanced JavaScript Mastery: From Fundamentals to Expert',
      description: 'Master advanced JavaScript concepts and become a proficient developer. This comprehensive course covers closures, async programming, design patterns, and modern ES6+ features. Perfect for developers looking to level up their JavaScript skills.',
      instructor: {
        name: 'Mike Chen',
        title: 'JavaScript Architect & Performance Expert',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/mikechen',
        portfolio: 'https://mikechen.dev'
      },
      duration: '10 weeks',
      students: 189,
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Advanced',
      originalPrice: 4999,
      currentPrice: 2499,
      rating: 4.9,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Master closures, scope, and the JavaScript execution context',
        'Understand asynchronous programming with Promises and async/await',
        'Implement advanced design patterns and architectural concepts',
        'Optimize JavaScript performance and memory management',
        'Work with modern ES6+ features and syntax',
        'Build scalable applications with proper error handling'
      ],
      courseContent: [
        { title: 'JavaScript Engine Deep Dive', lessons: 8, duration: '4h 20m' },
        { title: 'Advanced Functions & Closures', lessons: 10, duration: '5h 30m' },
        { title: 'Asynchronous JavaScript Mastery', lessons: 12, duration: '6h 45m' },
        { title: 'Object-Oriented Programming', lessons: 9, duration: '4h 50m' },
        { title: 'Functional Programming Concepts', lessons: 11, duration: '5h 40m' },
        { title: 'Design Patterns in JavaScript', lessons: 14, duration: '7h 15m' },
        { title: 'Error Handling & Debugging', lessons: 7, duration: '3h 30m' },
        { title: 'Performance Optimization', lessons: 8, duration: '4h 10m' },
        { title: 'Modern JavaScript Features', lessons: 13, duration: '6h 25m' },
        { title: 'Testing Advanced Applications', lessons: 6, duration: '3h 20m' }
      ],
      requirements: [
        'Solid understanding of JavaScript fundamentals',
        'Experience with basic programming concepts',
        'Familiarity with HTML and CSS',
        'At least 1-2 years of programming experience',
        'Understanding of basic data structures and algorithms'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 98', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Advanced', color: 'text-red-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '80+ hours of content', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Downloadable Resources', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'Is this course suitable for beginners?',
          answer: 'This is an advanced course designed for developers with solid JavaScript fundamentals. We recommend having at least 1-2 years of JavaScript experience before enrolling.'
        },
        {
          question: 'What projects will I build?',
          answer: 'You\'ll build several advanced projects including a task management system, a real-time chat application, and a performance-optimized web application using modern JavaScript patterns.'
        },
        {
          question: 'How is this different from basic JavaScript courses?',
          answer: 'This course goes deep into JavaScript internals, advanced patterns, and performance optimization. We cover topics like memory management, V8 engine optimization, and enterprise-level architecture patterns.'
        },
        {
          question: 'Will I get job placement assistance?',
          answer: 'Yes! We provide career guidance, resume review, interview preparation, and connections to our network of hiring partners for qualified graduates.'
        }
      ]
    },
    'fullstack-development': {
      title: 'Complete Full-Stack Web Development Bootcamp',
      description: 'Become a complete full-stack developer with this comprehensive bootcamp. Learn frontend technologies, backend development, databases, and deployment strategies. Build production-ready applications from scratch.',
      instructor: {
        name: 'Alex Rodriguez',
        title: 'Full-Stack Architect & Cloud Solutions Expert',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        portfolio: 'https://alexrodriguez.dev'
      },
      duration: '16 weeks',
      students: 156,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Intermediate',
      originalPrice: 7999,
      currentPrice: 3999,
      rating: 4.7,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Build complete web applications from frontend to backend',
        'Master React, Node.js, Express, and MongoDB/PostgreSQL',
        'Implement user authentication and authorization',
        'Design and build RESTful APIs and GraphQL endpoints',
        'Deploy applications to cloud platforms (AWS, Heroku, Vercel)',
        'Implement CI/CD pipelines and DevOps practices'
      ],
      courseContent: [
        { title: 'Frontend Fundamentals', lessons: 15, duration: '8h 30m' },
        { title: 'React Development', lessons: 20, duration: '11h 45m' },
        { title: 'Backend with Node.js', lessons: 18, duration: '10h 20m' },
        { title: 'Database Design & Management', lessons: 12, duration: '6h 50m' },
        { title: 'API Development', lessons: 16, duration: '9h 15m' },
        { title: 'Authentication & Security', lessons: 10, duration: '5h 40m' },
        { title: 'Testing Full-Stack Apps', lessons: 8, duration: '4h 30m' },
        { title: 'Deployment & DevOps', lessons: 14, duration: '7h 25m' },
        { title: 'Performance Optimization', lessons: 9, duration: '5h 10m' },
        { title: 'Final Project', lessons: 6, duration: '3h 45m' }
      ],
      requirements: [
        'Basic understanding of HTML, CSS, and JavaScript',
        'Familiarity with programming concepts',
        'Understanding of how web applications work',
        'Willingness to learn multiple technologies',
        'Access to a computer with at least 8GB RAM'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 128', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Intermediate', color: 'text-yellow-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '120+ hours of content', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Project Source Code', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'What technologies will I learn?',
          answer: 'You\'ll learn React, Node.js, Express, MongoDB/PostgreSQL, JWT authentication, AWS deployment, Docker, and modern development tools like Git, VS Code, and Postman.'
        },
        {
          question: 'How many projects will I build?',
          answer: 'You\'ll build 5 major projects including an e-commerce platform, social media app, task management system, blog platform, and a final capstone project of your choice.'
        },
        {
          question: 'Is this course updated regularly?',
          answer: 'Yes! We update the course content every 3 months to include the latest technologies, best practices, and industry trends. All updates are included with your lifetime access.'
        },
        {
          question: 'Do I need prior backend experience?',
          answer: 'No prior backend experience is required. We start with the basics and gradually build up to advanced concepts. However, basic JavaScript knowledge is essential.'
        }
      ]
    },
    'python-data-science': {
      title: 'Python for Data Science: Complete Analytics Bootcamp',
      description: 'Master Python programming with a focus on data analysis, visualization, and machine learning. Learn to work with real datasets and build predictive models using industry-standard tools and libraries.',
      instructor: {
        name: 'Dr. Emily Watson',
        title: 'Data Science Lead & Machine Learning Researcher',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/emilywatson',
        portfolio: 'https://emilywatson.dev'
      },
      duration: '12 weeks',
      students: 298,
      image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Beginner',
      originalPrice: 5999,
      currentPrice: 2999,
      rating: 4.6,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Master Python programming fundamentals and advanced concepts',
        'Analyze and manipulate data using Pandas and NumPy',
        'Create stunning visualizations with Matplotlib and Seaborn',
        'Build machine learning models with Scikit-learn',
        'Work with real-world datasets and solve business problems',
        'Deploy data science projects and create interactive dashboards'
      ],
      courseContent: [
        { title: 'Python Programming Basics', lessons: 12, duration: '6h 30m' },
        { title: 'Data Structures & Algorithms', lessons: 10, duration: '5h 20m' },
        { title: 'NumPy for Numerical Computing', lessons: 8, duration: '4h 15m' },
        { title: 'Pandas for Data Manipulation', lessons: 15, duration: '8h 45m' },
        { title: 'Data Visualization', lessons: 12, duration: '6h 50m' },
        { title: 'Statistical Analysis', lessons: 9, duration: '5h 10m' },
        { title: 'Machine Learning Fundamentals', lessons: 18, duration: '10h 30m' },
        { title: 'Advanced ML Algorithms', lessons: 14, duration: '8h 20m' },
        { title: 'Model Deployment', lessons: 7, duration: '4h 15m' },
        { title: 'Capstone Projects', lessons: 5, duration: '3h 30m' }
      ],
      requirements: [
        'Basic computer skills and mathematical understanding',
        'High school level mathematics (algebra and statistics helpful)',
        'No prior programming experience required',
        'Curiosity about data and problem-solving',
        'Access to a computer with Python installation capabilities'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 110', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Beginner', color: 'text-green-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '90+ hours of content', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Datasets & Notebooks', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'Do I need math background for this course?',
          answer: 'Basic high school mathematics is helpful but not required. We cover all necessary statistical concepts as part of the course curriculum.'
        },
        {
          question: 'What datasets will we work with?',
          answer: 'We use real-world datasets from various domains including finance, healthcare, e-commerce, and social media. You\'ll work on projects like sales forecasting, customer segmentation, and sentiment analysis.'
        },
        {
          question: 'Will I learn machine learning?',
          answer: 'Yes! The course covers both supervised and unsupervised learning algorithms, including linear regression, decision trees, clustering, and neural networks using Scikit-learn and TensorFlow.'
        },
        {
          question: 'Can I get a job after this course?',
          answer: 'Many of our graduates have successfully transitioned to data science roles. We provide career guidance, portfolio development support, and interview preparation to help you land your first data science job.'
        }
      ]
    },
    'mobile-app-development': {
      title: 'React Native Mobile App Development Masterclass',
      description: 'Build professional mobile applications for iOS and Android using React Native. Learn to create cross-platform apps with native performance and publish them to app stores.',
      instructor: {
        name: 'David Kim',
        title: 'Mobile Development Lead & React Native Expert',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/davidkim',
        portfolio: 'https://davidkim.dev'
      },
      duration: '14 weeks',
      students: 167,
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Intermediate',
      originalPrice: 6999,
      currentPrice: 3499,
      rating: 4.8,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Build cross-platform mobile apps with React Native',
        'Implement native device features (camera, GPS, push notifications)',
        'Design beautiful and responsive mobile user interfaces',
        'Integrate with REST APIs and handle data persistence',
        'Publish apps to Google Play Store and Apple App Store',
        'Optimize app performance and handle offline functionality'
      ],
      courseContent: [
        { title: 'React Native Fundamentals', lessons: 12, duration: '6h 45m' },
        { title: 'Navigation & Routing', lessons: 8, duration: '4h 30m' },
        { title: 'UI Components & Styling', lessons: 15, duration: '8h 20m' },
        { title: 'State Management', lessons: 10, duration: '5h 50m' },
        { title: 'Native Device Features', lessons: 14, duration: '7h 40m' },
        { title: 'API Integration', lessons: 9, duration: '5h 15m' },
        { title: 'Data Persistence', lessons: 7, duration: '4h 10m' },
        { title: 'Performance Optimization', lessons: 6, duration: '3h 30m' },
        { title: 'Testing Mobile Apps', lessons: 8, duration: '4h 45m' },
        { title: 'App Store Deployment', lessons: 5, duration: '3h 20m' }
      ],
      requirements: [
        'Solid understanding of React and JavaScript',
        'Basic knowledge of mobile app concepts',
        'Familiarity with ES6+ JavaScript features',
        'Understanding of REST APIs and JSON',
        'Access to macOS for iOS development (optional but recommended)'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 94', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Intermediate', color: 'text-yellow-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '85+ hours of content', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Source Code & Assets', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'Do I need a Mac for iOS development?',
          answer: 'While a Mac is required for building and testing iOS apps, you can learn React Native development on any platform. We provide cloud-based solutions for iOS testing if you don\'t have a Mac.'
        },
        {
          question: 'What apps will we build?',
          answer: 'You\'ll build 4 complete apps: a weather app, social media app, e-commerce app, and a fitness tracking app. Each project focuses on different aspects of mobile development.'
        },
        {
          question: 'How is React Native different from native development?',
          answer: 'React Native allows you to write code once and deploy to both iOS and Android, significantly reducing development time while maintaining near-native performance.'
        },
        {
          question: 'Will I learn app store submission?',
          answer: 'Yes! We cover the complete app store submission process for both Google Play Store and Apple App Store, including app signing, metadata preparation, and review guidelines.'
        }
      ]
    },
    'devops-essentials': {
      title: 'DevOps Essentials: CI/CD, Docker & Cloud Deployment',
      description: 'Master modern DevOps practices including continuous integration, containerization, and cloud deployment. Learn to automate development workflows and manage scalable infrastructure.',
      instructor: {
        name: 'Lisa Thompson',
        title: 'DevOps Engineer & Cloud Infrastructure Specialist',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
        linkedin: 'https://linkedin.com/in/lisathompson',
        portfolio: 'https://lisathompson.dev'
      },
      duration: '10 weeks',
      students: 203,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200',
      level: 'Advanced',
      originalPrice: 5999,
      currentPrice: 2999,
      rating: 4.7,
      language: 'English',
      certificate: true,
      whatYouWillLearn: [
        'Implement CI/CD pipelines with GitHub Actions and Jenkins',
        'Master containerization with Docker and Kubernetes',
        'Deploy applications to AWS, Azure, and Google Cloud',
        'Monitor and maintain production systems',
        'Automate infrastructure with Terraform and Ansible',
        'Implement security best practices and compliance'
      ],
      courseContent: [
        { title: 'DevOps Fundamentals', lessons: 8, duration: '4h 20m' },
        { title: 'Version Control & Git Workflows', lessons: 6, duration: '3h 30m' },
        { title: 'Continuous Integration', lessons: 10, duration: '5h 45m' },
        { title: 'Docker & Containerization', lessons: 12, duration: '6h 50m' },
        { title: 'Kubernetes Orchestration', lessons: 14, duration: '8h 15m' },
        { title: 'Cloud Platforms', lessons: 16, duration: '9h 30m' },
        { title: 'Infrastructure as Code', lessons: 9, duration: '5h 20m' },
        { title: 'Monitoring & Logging', lessons: 7, duration: '4h 10m' },
        { title: 'Security & Compliance', lessons: 8, duration: '4h 45m' },
        { title: 'Advanced DevOps Practices', lessons: 6, duration: '3h 40m' }
      ],
      requirements: [
        'Basic understanding of software development',
        'Familiarity with Linux command line',
        'Basic knowledge of cloud computing concepts',
        'Understanding of networking fundamentals',
        'Experience with at least one programming language'
      ],
      courseIncludes: [
        { icon: Video, text: 'Lectures: 96', color: 'text-blue-600' },
        { icon: BookOpen, text: 'Level: Advanced', color: 'text-red-600' },
        { icon: Award, text: 'Certificate of Completion', color: 'text-purple-600' },
        { icon: Clock, text: '75+ hours of content', color: 'text-orange-600' },
        { icon: Shield, text: '100% Money-back Guarantee', color: 'text-red-600' },
        { icon: Infinity, text: 'Lifetime Program Access', color: 'text-indigo-600' },
        { icon: Download, text: 'Configuration Files', color: 'text-cyan-600' }
      ],
      faqs: [
        {
          question: 'Do I need cloud platform experience?',
          answer: 'No prior cloud experience is required. We start with cloud fundamentals and gradually progress to advanced topics. We provide free cloud credits for hands-on practice.'
        },
        {
          question: 'Which cloud platforms are covered?',
          answer: 'We cover AWS (primary focus), Microsoft Azure, and Google Cloud Platform. You\'ll learn platform-agnostic concepts that apply to any cloud provider.'
        },
        {
          question: 'Will I get hands-on practice?',
          answer: 'Absolutely! This course is heavily hands-on with labs, projects, and real-world scenarios. You\'ll build complete CI/CD pipelines and deploy applications to production.'
        },
        {
          question: 'Is this course suitable for developers?',
          answer: 'Yes! This course is perfect for developers who want to understand the deployment and operations side of software development. It bridges the gap between development and operations.'
        }
      ]
    }
  };

  const course = courseData[courseId] || courseData['react-fundamentals'];

  // Get instructor data based on course instructor
  const getInstructorData = (instructorName) => {
    const instructors = {
      'Sarah Johnson': {
        name: 'Sarah Johnson',
        title: 'Senior React Developer & UI/UX Specialist',
        bio: 'Sarah is a passionate React developer with over 6 years of experience building modern web applications. She has worked at leading tech companies including Airbnb and Spotify, where she specialized in creating intuitive user interfaces and scalable component architectures. Sarah believes in making complex concepts accessible to beginners while maintaining industry best practices.',
        experience: '6+ Years',
        specialties: ['React', 'JavaScript', 'TypeScript', 'CSS', 'UI/UX Design', 'Redux', 'Next.js', 'Testing'],
        education: [
          'B.S. Computer Science - MIT (2017)',
          'UX Design Certificate - Google (2019)',
          'React Advanced Patterns Certification (2021)'
        ],
        achievements: [
          'Created React component library used by 100+ companies',
          'Speaker at React Summit 2023 and Frontend Masters',
          'Contributed to React DevTools and popular open-source libraries',
          'Mentored 150+ junior developers through bootcamps',
          'Winner of "Best Frontend Innovation" - Web Awards 2022'
        ],
        coursesCount: 8,
        studentsCount: 15000,
        rating: 4.8,
        location: 'San Francisco, CA',
        email: 'sarah.johnson@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson',
        image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'Mike Chen': {
        name: 'Mike Chen',
        title: 'JavaScript Architect & Performance Expert',
        bio: 'Mike is a JavaScript expert with 10+ years of experience in building high-performance web applications. He has worked as a senior engineer at Google and Netflix, focusing on JavaScript optimization, async programming, and modern ES6+ features. Mike is known for his deep understanding of JavaScript internals and ability to explain complex concepts clearly.',
        experience: '10+ Years',
        specialties: ['JavaScript', 'Node.js', 'TypeScript', 'Performance Optimization', 'Async Programming', 'V8 Engine', 'WebAssembly', 'GraphQL'],
        education: [
          'M.S. Computer Science - Stanford University (2013)',
          'B.S. Software Engineering - UC Berkeley (2011)',
          'Google Cloud Professional Developer (2020)'
        ],
        achievements: [
          'Authored "Advanced JavaScript Patterns" - bestselling book',
          'Core contributor to Node.js and V8 performance improvements',
          'Speaker at JSConf, Node.js Interactive, and Google I/O',
          'Created JavaScript performance tools used by major companies',
          'Technical reviewer for O\'Reilly JavaScript publications'
        ],
        coursesCount: 12,
        studentsCount: 28000,
        rating: 4.9,
        location: 'Seattle, WA',
        email: 'mike.chen@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/mikechen',
        github: 'https://github.com/mikechen',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'Alex Rodriguez': {
        name: 'Alex Rodriguez',
        title: 'Full-Stack Architect & Cloud Solutions Expert',
        bio: 'Alex is a seasoned full-stack developer with 12+ years of experience building enterprise-scale applications. Having worked at Amazon Web Services and Microsoft Azure, Alex specializes in cloud architecture, microservices, and DevOps practices. Alex is passionate about teaching the complete software development lifecycle from frontend to deployment.',
        experience: '12+ Years',
        specialties: ['Full-Stack Development', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Microservices', 'CI/CD', 'Database Design'],
        education: [
          'M.S. Software Engineering - Carnegie Mellon (2011)',
          'B.S. Computer Science - University of Texas (2009)',
          'AWS Solutions Architect Professional (2018)',
          'Microsoft Azure Architect Expert (2020)'
        ],
        achievements: [
          'Designed cloud infrastructure serving 10M+ users daily',
          'Led engineering teams at 3 successful startups',
          'AWS Community Hero and Microsoft MVP',
          'Published 20+ technical articles on cloud architecture',
          'Keynote speaker at AWS re:Invent and Microsoft Build'
        ],
        coursesCount: 18,
        studentsCount: 35000,
        rating: 4.7,
        location: 'Austin, TX',
        email: 'alex.rodriguez@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        github: 'https://github.com/alexrodriguez',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'Dr. Emily Watson': {
        name: 'Dr. Emily Watson',
        title: 'Data Science Lead & Machine Learning Researcher',
        bio: 'Dr. Emily Watson is a data science expert with a Ph.D. in Machine Learning and 8+ years of industry experience. She has led data science teams at Tesla and Uber, working on autonomous systems and predictive analytics. Emily specializes in making data science accessible to programmers from all backgrounds, focusing on practical applications and real-world problem solving.',
        experience: '8+ Years',
        specialties: ['Python', 'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Statistical Modeling'],
        education: [
          'Ph.D. Machine Learning - Stanford University (2015)',
          'M.S. Statistics - UC Berkeley (2012)',
          'B.S. Mathematics - Harvard University (2010)'
        ],
        achievements: [
          'Published 25+ peer-reviewed papers in top ML conferences',
          'Led data science team that improved Uber\'s ETA accuracy by 40%',
          'Kaggle Grandmaster with 5 competition wins',
          'Created open-source ML library with 50k+ GitHub stars',
          'Featured in Forbes "30 Under 30" in Science category'
        ],
        coursesCount: 10,
        studentsCount: 22000,
        rating: 4.6,
        location: 'Palo Alto, CA',
        email: 'emily.watson@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/emilywatson',
        github: 'https://github.com/emilywatson',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'David Kim': {
        name: 'David Kim',
        title: 'Mobile Development Lead & React Native Expert',
        bio: 'David is a mobile development specialist with 9+ years of experience building iOS and Android applications. He has worked at Instagram and WhatsApp, where he contributed to apps used by billions of users. David is passionate about React Native and cross-platform development, helping developers build efficient mobile apps with a single codebase.',
        experience: '9+ Years',
        specialties: ['React Native', 'iOS Development', 'Android Development', 'Mobile UI/UX', 'App Store Optimization', 'Performance Optimization', 'Native Modules'],
        education: [
          'M.S. Mobile Computing - Georgia Tech (2014)',
          'B.S. Computer Science - UCLA (2012)',
          'iOS Developer Certification - Apple (2015)',
          'Android Developer Certification - Google (2016)'
        ],
        achievements: [
          'Built mobile features used by 2B+ users at Meta',
          'Created React Native performance optimization framework',
          'Speaker at React Native EU and Chain React conferences',
          'Contributed to React Native core and popular libraries',
          'Mentored mobile development teams at 5 startups'
        ],
        coursesCount: 14,
        studentsCount: 18000,
        rating: 4.8,
        location: 'Los Angeles, CA',
        email: 'david.kim@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/davidkim',
        github: 'https://github.com/davidkim',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'Lisa Thompson': {
        name: 'Lisa Thompson',
        title: 'DevOps Engineer & Cloud Infrastructure Specialist',
        bio: 'Lisa is a DevOps expert with 11+ years of experience in cloud infrastructure and automation. She has worked at Netflix and Spotify, building scalable deployment pipelines and monitoring systems. Lisa specializes in making DevOps practices accessible to developers, focusing on practical automation and reliability engineering.',
        experience: '11+ Years',
        specialties: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Monitoring', 'Site Reliability Engineering', 'Infrastructure as Code'],
        education: [
          'M.S. Systems Engineering - MIT (2012)',
          'B.S. Computer Engineering - Stanford (2010)',
          'Certified Kubernetes Administrator (2019)',
          'HashiCorp Terraform Associate (2020)'
        ],
        achievements: [
          'Reduced deployment time by 90% at Netflix using automation',
          'Built monitoring systems handling 100M+ requests/day',
          'Created open-source DevOps tools used by 1000+ companies',
          'Speaker at KubeCon, DockerCon, and DevOps World',
          'Winner of "DevOps Excellence Award" - Cloud Native Foundation'
        ],
        coursesCount: 16,
        studentsCount: 25000,
        rating: 4.7,
        location: 'Portland, OR',
        email: 'lisa.thompson@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/lisathompson',
        github: 'https://github.com/lisathompson',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    };
    
    return instructors[instructorName] || instructors['Sarah Johnson'];
  };

  const instructorData = getInstructorData(course.instructor.name);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleFAQ = (faqId) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Instructor Modal */}
      <InstructorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        instructor={instructorData}
      />

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
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  Frontend
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  Beginner
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  Paid
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {course.students} Students
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-300 fill-current" />
                  {course.rating} Rating
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You Will Learn */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What You Will Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Content</h2>
              <div className="space-y-2">
                {course.courseContent.map((section, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection(`section-${index}`)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center">
                        {expandedSections[`section-${index}`] ? (
                          <ChevronDown className="h-4 w-4 mr-3 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-3 text-gray-500" />
                        )}
                        <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {section.lessons} lessons • {section.duration}
                      </div>
                    </button>
                    {expandedSections[`section-${index}`] && (
                      <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-4 text-sm text-gray-600 dark:text-gray-300">
                          This section contains {section.lessons} comprehensive lessons covering all aspects of {section.title.toLowerCase()}.
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {course.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(`faq-${index}`)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                      {expandedFAQs[`faq-${index}`] ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQs[`faq-${index}`] && (
                      <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-4 text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Instructors */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Instructors</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <button
                      onClick={() => setIsInstructorModalOpen(true)}
                      className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                    >
                      {course.instructor.name}
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructor.title}</p>
                    <div className="flex space-x-2 mt-1">
                      <a
                        href={course.instructor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={course.instructor.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Includes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This Course Includes:</h3>
              <div className="space-y-3">
                {course.courseIncludes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className={`h-4 w-4 mr-3 ${item.color}`} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{course.currentPrice}</span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">₹{course.originalPrice}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Batch of 25 only so hurry up!
                </p>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;