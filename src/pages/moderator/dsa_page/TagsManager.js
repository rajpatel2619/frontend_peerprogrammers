import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const TagsManager = ({ allTags, newTag, setNewTag, handleAddNewTag, handleDeleteTag }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add new tag"
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddNewTag();
            }
          }}
        />
        <button
          onClick={handleAddNewTag}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Add Tag
        </button>
      </div>
      <div className="space-y-4">
        {allTags.map((tag) => (
          <div
            key={tag}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-800 dark:text-gray-200">{tag}</span>
            <button
              onClick={() => handleDeleteTag(tag)}
              className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        {allTags.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No tags available. Add your first tag.
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsManager;