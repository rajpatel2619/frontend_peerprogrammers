import React, { useState } from 'react';
import {
  Upload, Users, BarChart3, Settings, Plus, Edit, Trash2, Eye, FileText, Video
} from 'lucide-react';
import InstructorModal from './InstructorModal';

const TeacherTab = ({ course }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  const studentProgress = [
    { name: 'Emma Wilson', progress: 95, lastActive: '2 hours ago', assignments: 8 },
    { name: 'James Rodriguez', progress: 82, lastActive: '1 day ago', assignments: 7 },
    { name: 'Sarah Kim', progress: 76, lastActive: '3 hours ago', assignments: 6 },
    { name: 'Michael Chen', progress: 88, lastActive: '5 hours ago', assignments: 7 },
    { name: 'Lisa Johnson', progress: 92, lastActive: '1 hour ago', assignments: 8 },
  ];

  const courseResources = [
    { id: 1, name: 'React Fundamentals Slides', type: 'pdf', uploadDate: '2025-01-15', size: '2.3 MB' },
    { id: 2, name: 'Component Examples', type: 'zip', uploadDate: '2025-01-14', size: '1.8 MB' },
    { id: 3, name: 'Introduction Video', type: 'mp4', uploadDate: '2025-01-13', size: '45.2 MB' },
    { id: 4, name: 'Practice Exercises', type: 'pdf', uploadDate: '2025-01-12', size: '890 KB' },
  ];

  const getInstructorData = (instructorName) => {
    const instructors = {
      'Sarah Johnson': {
        name: 'Sarah Johnson',
        title: 'Senior React Developer & UI/UX Specialist',
        bio: 'Sarah is a passionate React developer with over 6 years of experience...',
        experience: '6+ Years',
        specialties: ['React', 'JavaScript', 'TypeScript', 'CSS', 'UI/UX Design', 'Redux', 'Next.js', 'Testing'],
        education: ['B.S. Computer Science - MIT (2017)', 'UX Design Certificate - Google (2019)', 'React Advanced Patterns Certification (2021)'],
        achievements: ['Created React component library...', 'Speaker at React Summit 2023...', 'Contributed to React DevTools...', 'Mentored 150+ junior developers...', 'Winner of "Best Frontend Innovation"...'],
        coursesCount: 8,
        studentsCount: 15000,
        rating: 4.8,
        location: 'San Francisco, CA',
        email: 'sarah.johnson@peerprogrammers.com',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson',
        image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      // ... Add the rest of the instructors from your original object here ...
    };

    return instructors[instructorName] || instructors['Sarah Johnson'];
  };

  const instructorData = getInstructorData(course.instructor);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'mp4': return <Video className="h-5 w-5 text-purple-500" />;
      case 'zip': return <FileText className="h-5 w-5 text-yellow-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Instructor</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={instructorData.image} alt={instructorData.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700" />
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{instructorData.name}</h4>
              <p className="text-gray-600 dark:text-gray-300">{instructorData.title}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">{instructorData.experience} • </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{instructorData.studentsCount.toLocaleString()} students</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsInstructorModalOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">More Details</button>
        </div>
      </div>
    </div>
  );

  const renderStudentProgress = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Progress Tracking</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assignments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {studentProgress.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{student.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{student.assignments}/8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.lastActive}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"><Eye className="h-4 w-4" /></button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"><Edit className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderResourceManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Resources</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Upload className="h-4 w-4 mr-2" /> Upload New Resource
        </button>
      </div>
      <div className="space-y-3">
        {courseResources.map((resource) => (
          <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              {getFileIcon(resource.type)}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{resource.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Uploaded on {resource.uploadDate} • {resource.size}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"><Eye className="h-4 w-4" /></button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"><Edit className="h-4 w-4" /></button>
              <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <InstructorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        instructor={instructorData}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 transition-colors duration-300">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Course Overview
          </button>
          <button
            onClick={() => setActiveSection('students')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'students' ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Student Progress
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'resources' ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Resources
          </button>
        </div>
      </div>

      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'students' && renderStudentProgress()}
      {activeSection === 'resources' && renderResourceManagement()}
    </div>
  );
};

export default TeacherTab;
