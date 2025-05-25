// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import MyProfile from './pages/MyProfile';
import TeachingCourses from './pages/teacher/TeachingCourses';
import CourseDetails from './pages/CourseDetails';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<MyProfile />}/>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/teacher/teaching-courses" element={<TeachingCourses />}/>
        {/* <Route path="/student/learning-courses" element={< />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
