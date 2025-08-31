import React, { useState } from "react";
import ModeratorNavbar from "./components/ModeratorSidebar";
import {
  useResourcesApi,
  DomainManager,
  SubdomainManager,
  ResourceManager,
} from "./resources_page/ResourceManagers";
import ModeratorResourceVerify from "./resources_page/ModeratorResourceVerify";

const ModeratorResources = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const api = useResourcesApi();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
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
            <button
              onClick={() => setActiveTab("domains")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "domains"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveTab("subdomains")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "subdomains"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Subdomains
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "resources" && <ModeratorResourceVerify />}
        {activeTab === "domains" && <DomainManager api={api} />}
        {activeTab === "subdomains" && <SubdomainManager api={api} />}
      </div>
    </div>
  );
};

export default ModeratorResources;
