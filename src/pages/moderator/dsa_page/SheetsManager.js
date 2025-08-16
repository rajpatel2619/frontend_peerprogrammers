import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const SheetsManager = ({ sheets, newSheet, setNewSheet, handleAddSheet, handleRemoveSheet }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add new sheet"
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          value={newSheet}
          onChange={(e) => setNewSheet(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSheet(newSheet);
            }
          }}
        />
        <button
          onClick={() => handleAddSheet(newSheet)}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Add Sheet
        </button>
      </div>
      <div className="space-y-4">
        {sheets.map((sheet) => (
          <div
            key={sheet}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-800 dark:text-gray-200">{sheet}</span>
            <button
              onClick={() => handleRemoveSheet(sheet)}
              className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        {sheets.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No sheets available. Add your first sheet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetsManager;