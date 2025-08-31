import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import RatingFormModal from './RatingFormModal.jsx';

const RatingsTab = () => {
  const [ratings, setRatings] = useState([
    { id: 1, platform: 'Codeforces', rating: 1600, description: 'Div 2 A-B level' },
    { id: 2, platform: 'Codechef', rating: 1800, description: '3 star rating' },
    { id: 3, platform: 'AtCoder', rating: 1200, description: 'ABC level' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEditRating = (rating) => {
    setCurrentItem(rating);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDeleteRating = (id) => {
    setRatings(ratings.filter(r => r.id !== id));
  };

  const handleFormSubmit = (formData) => {
    if (editMode && currentItem) {
      setRatings(ratings.map(r => r.id === currentItem.id ? { ...formData, id: currentItem.id } : r));
    } else {
      setRatings([...ratings, { ...formData, id: ratings.length + 1 }]);
    }
    setShowForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Rating System</h2>
        <button
          onClick={() => { setShowForm(true); setEditMode(false); }}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Rating
        </button>
      </div>

      {/* Ratings List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map(rating => (
              <motion.tr
                key={rating.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">{rating.platform}</td>
                <td className="px-6 py-4">{rating.rating}</td>
                <td className="px-6 py-4">{rating.description}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => handleEditRating(rating)} className="text-blue-600">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDeleteRating(rating.id)} className="text-red-600">
                    <FiTrash2 />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <RatingFormModal
          editMode={editMode}
          currentItem={currentItem}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default RatingsTab;
