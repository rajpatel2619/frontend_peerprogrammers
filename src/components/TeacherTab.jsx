import React, { useState } from 'react';
import {
  Upload, Users, BarChart3, Settings, Plus,
  Edit, Trash2, Eye, FileText, Video
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
      // Include all instructors from your previous code...
      // (For brevity, use the full instructor object from your original code)
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

  // const renderOverview = () => (
  //   // Paste the JSX code from your overview section
  //   return <div>Overview content here</div>;
  // );

  // const renderStudentProgress = () => (
  //   // Paste the JSX code from your student progress table
  //   return <div>Student Progress content here</div>;
  // );

  // const renderResourceManagement = () => (
  //   // Paste the JSX code from your resource management section
  //   return <div>Resource Management content here</div>;
  // );

  const renderOverview = () => {
  // Paste the JSX code from your overview section
  return <div>Overview content here</div>;
};

const renderStudentProgress = () => {
  // Paste the JSX code from your student progress table
  return <div>Student Progress content here</div>;
};

const renderResourceManagement = () => {
  // Paste the JSX code from your resource management section
  return <div>Resource Management content here</div>;
};


  return (
    <div className="space-y-6">
      <InstructorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        instructor={instructorData}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 transition-colors duration-300">
        <div className="flex space-x-1">
          {['overview', 'students', 'resources'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeSection === section
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {section === 'overview' && 'Course Overview'}
              {section === 'students' && 'Student Progress'}
              {section === 'resources' && 'Resources'}
            </button>
          ))}
        </div>
      </div>

      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'students' && renderStudentProgress()}
      {activeSection === 'resources' && renderResourceManagement()}
    </div>
  );
};

export default TeacherTab;
