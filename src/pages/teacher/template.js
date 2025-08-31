import React from "react"; // assuming it's in the same folder
import Sidebar from "../../components/sidebar";

const Template = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar (already handles toggle internally) */}
      <Sidebar onNavigate={(path) => console.log("Navigate to:", path)} />

      {/* Main content area */}
      <div className="flex-1 p-10 w-full">
        main content here
      </div>
    </div>
  );
};

export default Template;
