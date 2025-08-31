import React, { useState } from 'react';
import ModeratorNavbar from './components/ModeratorSidebar';
import RatingsTab from './cp/RatingsTab';
import QuestionsTab from './cp/QuestionsTab';


const ModeratorCp = () => {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Moderator Control Panel
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {/* <button
              onClick={() => setActiveTab('ratings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ratings'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Ratings
            </button> */}
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'questions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              CP Questions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'ratings' && <RatingsTab />}
        {activeTab === 'questions' && <QuestionsTab />}
      </div>
    </div>
  );
};

export default ModeratorCp;
