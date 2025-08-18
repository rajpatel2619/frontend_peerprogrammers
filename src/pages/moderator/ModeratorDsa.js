import React, { useState } from 'react';
import { FiCode, FiTag, FiBriefcase, FiFileText } from 'react-icons/fi';
import ModeratorNavbar from './components/ModeratorSidebar';
import ProblemsTab from './components/dsa-questions/ProblemsTab';
import TagsTab from './components/dsa-questions/TagsTab';
import CompaniesTab from './components/dsa-questions/CompaniesTab';
import SheetsTab from './components/dsa-questions/SheetsTab';

const DSAQuestionsPage = () => {
  const [activeTab, setActiveTab] = useState('problems');

  return (
    <div className="min-h-screen bg-gray-50">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            DSA Questions Repository
          </h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('problems')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'problems'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiCode className="mr-2" />
              Problems
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'tags'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiTag className="mr-2" />
              Tags
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'companies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiBriefcase className="mr-2" />
              Companies
            </button>
            <button
              onClick={() => setActiveTab('sheets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'sheets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiFileText className="mr-2" />
              Sheets
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'problems' && <ProblemsTab />}
        {activeTab === 'tags' && <TagsTab />}
        {activeTab === 'companies' && <CompaniesTab />}
        {activeTab === 'sheets' && <SheetsTab />}
      </div>
    </div>
  );
};

export default DSAQuestionsPage;