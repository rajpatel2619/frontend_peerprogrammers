import React from 'react';
import { FiCode, FiTag, FiBriefcase, FiFileText } from 'react-icons/fi';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'problems', label: 'Problems', icon: FiCode },
    { id: 'tags', label: 'Tags', icon: FiTag },
    { id: 'companies', label: 'Companies', icon: FiBriefcase },
    { id: 'sheets', label: 'Sheets', icon: FiFileText },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Icon className="mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;