import React, { useState } from 'react';
import InstructorModal from '../components/InstructorModal'; // ← sahi path se import karo

const InstructorPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const instructorData = {
    image: "https://i.pravatar.cc/150?img=32",
    name: "John Doe",
    title: "Senior Instructor",
    location: "Bangalore",
    experience: "5 years",
    rating: 4.9,
    coursesCount: 12,
    studentsCount: 8500,
    bio: "I love teaching JavaScript and React to new developers!",
    specialties: ["React", "Node.js", "JavaScript"],
    education: ["B.Tech in CSE - IIT Delhi"],
    achievements: ["Top Educator Award 2023", "5-Star Instructor on Udemy"],
    email: "john@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Instructor Page</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Show Instructor Details
      </button>

      <InstructorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        instructor={instructorData}
      />
    </div>
  );
};

export default InstructorPage;

