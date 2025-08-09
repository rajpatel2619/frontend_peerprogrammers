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
import PageNotFound from "./pages/PageNotFound";
import CourseTabs from "./components/home/CourseTabs";
import CreateCourseIndividual from "./pages/teacher/CreateCourseIndividual";
import Resources from "./pages/Resources";
import Footer from "./components/Footer";
import TempCourses from "./pages/temp_courses/TempCourses";
import TempCoursesDetail from "./pages/temp_courses/TempCoursesDetail";
import Contact from "./pages/contact";
import Training from './pages/Training'
import ChangePassword from "./pages/ChangePassword";
import UserPublicProfile from "./pages/UserPublicProfile";
import OtpVerification from "./pages/OtpVerification";
import Courses from "./pages/student/Courses";
import CourseDashboard from "./pages/student/CourseDashboard";
import Dsa from "./pages/Dsa";
import Cp from "./pages/Cp";
import DsaLeaderboard from "./pages/DsaLeaderboard";
import CpLeaderboard from "./pages/CpLeaderboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
      
      <Routes>
        {/* Course and profiles details route */}
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/dsa" element={<Dsa />} />
        <Route path="/dsa_leaderboard" element={<DsaLeaderboard/>} />
        <Route path="/cp51" element={<Cp />} />
        <Route path="/cp51_leaderboard" element={<CpLeaderboard/>} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/profiles/t/:userId" element={<UserPublicProfile />} />
        {/* <Route path="/profiles/teachers/:teacherId" element={TeacherPublicProfile} /> */}
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<Courses />} />
        <Route path="/student/courses/d/:courseId" element={<CourseDashboard />} />
        
        {/* Teacher routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeachingCourses />} />
        <Route path="/teacher/courses/new/individual" element={<CreateCourseIndividual />} />
        <Route path="/teacher/courses/edit/individual/:courseId" element={<CreateCourseIndividual />} />
        <Route path="/otp-verification" element={<OtpVerification />} />


        {/* Home route */}
        <Route path="/CourseTabs" element={<CourseTabs />} />
        {/* temp courses */}
        <Route path="/temp_courses" element={<TempCourses />} />
        <Route path="/temp_courses/:slug" element={<TempCoursesDetail />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />

        <Route path="/Contact" element={<Contact/>} />
        <Route path="/training" element={<Training />} />
        

      </Routes>
      <Footer />
      </div>

    </Router>
  );
}

export default App;



