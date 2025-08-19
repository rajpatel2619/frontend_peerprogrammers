import React, { useState } from 'react'
import TeacherSidebar from "./components/TeacherSidebar";
import {
  useResourcesApi,
  ResourceManager,
} from "../moderator/resources_page/ResourceManagers";

function CreateResources() {
    const api = useResourcesApi();
    const [activeTab, setActiveTab] = useState("resources");
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TeacherSidebar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Resources Management
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("resources")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "resources"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Resources
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "resources" && <ResourceManager api={api} />}
        
      </div>
    </div>
  )
}

export default CreateResources