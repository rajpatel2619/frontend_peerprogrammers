import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RatingFormModal = ({ editMode, currentItem, onClose, onSubmit }) => {
  const [form, setForm] = useState({ platform: '', rating: '', description: '' });

  useEffect(() => {
    if (editMode && currentItem) {
      setForm({
        platform: currentItem.platform,
        rating: currentItem.rating.toString(),
        description: currentItem.description
      });
    }
  }, [editMode, currentItem]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, rating: parseInt(form.rating) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{editMode ? 'Edit Rating' : 'Add Rating'}</h2>
            <button onClick={onClose} className="text-gray-500">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform" className="w-full px-3 py-2 border rounded-lg" required />
            <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" className="w-full px-3 py-2 border rounded-lg" required />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded-lg" />
            
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                {editMode ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RatingFormModal;
