// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import StudentDetails from "./pages/student/StudentDetails";
import TeacherDetails from "./pages/teacher/TeacherDetails";
import LearningCourses from "./pages/student/LearningCourses";
import PageNotFound from "./pages/PageNotFound";
import Whistlist from "./pages/student/Whistlist";
import CreateCourse from "./pages/CreateCourse";
import FillCoureseDetail from "./pages/FillCourseDetail";
import Courses from "./pages/Courses";
import CourseTabs from "./components/home/CourseTabs";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
      
      <Routes>
        {/* Course details route */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/learnings" element={<LearningCourses />} />
        <Route path="/student/cart" element={<Whistlist />} />
        <Route path="/student/:studentId" element={<StudentDetails />} />
        {/* Teacher routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeachingCourses />} />
        <Route path="/teacher/:teacherId" element={<TeacherDetails />} />
        <Route path="/teacher/courses/new" element={<CreateCourse />} />
        {/* Fill course detail route */}
        <Route path="/teacher/courses/update" element={<FillCoureseDetail />} />
        <Route path="/courses" element={<Courses />} />
        {/* Home route */}
        <Route path="/CourseTabs" element={<CourseTabs />} />
        {/* Catch-all route for 404 */}
        {/* Catch-all 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
