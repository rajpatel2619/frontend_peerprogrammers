import React from "react"; // assuming it's in the same folder
import TeacherSidebar from "./components/TeacherSidebar";

const TeacherDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar (already handles toggle internally) */}
      <TeacherSidebar onNavigate={(path) => console.log("Navigate to:", path)} />

      {/* Main content area */}
      <div className="flex-1 p-10 w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Main Content Goes Here
        </h1>
        <div>hi there</div>
        {/* You can replace this section with your routed content or components */}
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;
