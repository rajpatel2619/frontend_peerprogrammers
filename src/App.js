// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPublicProfile from "./pages/StudentPublicProfile";
import TeacherPublicProfile from "./pages/TeacherPublicProfile";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./pages/MyProfile";
import TeachingCourses from "./pages/teacher/TeachingCourses";
import CourseDetails from "./pages/CourseDetails";
import PageNotFound from "./pages/PageNotFound";
import CourseTabs from "./components/home/CourseTabs";
import CreateCourseIndividual from "./pages/teacher/CreateCourseIndividual";
import Resources from "./pages/Resources";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
      
      <Routes>
        {/* Course and profiles details route */}
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/profiles/students/:studentId" element={StudentPublicProfile} />
        <Route path="/profiles/teachers/:teacherId" element={TeacherPublicProfile} />
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        {/* Teacher routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeachingCourses />} />
        <Route path="/teacher/courses/new/individual" element={<CreateCourseIndividual />} />
        <Route path="/teacher/courses/edit/individual/:courseId" element={<CreateCourseIndividual />} />

        {/* Home route */}
        <Route path="/CourseTabs" element={<CourseTabs />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      </div>

    </Router>
  );
}

export default App;
