import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProblemsTab = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    problemName: '',
    problemLink: '',
    difficulty: 'Easy',
    tags: [],
    companies: [],
    sheet: '',
    solution: '',
  });

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://your-api-url.com/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      q.problemName?.toLowerCase().includes(searchLower) ||
      q.tags?.some(tag => tag?.toLowerCase().includes(searchLower)) ||
      q.companies?.some(company => company?.toLowerCase().includes(searchLower)) ||
      q.sheet?.toLowerCase().includes(searchLower)
    );
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://your-api-url.com/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newQuestion = await response.json();
      setQuestions([...questions, newQuestion]);
      setShowForm(false);
      setFormData({
        problemName: '',
        problemLink: '',
        difficulty: 'Easy',
        tags: [],
        companies: [],
        sheet: '',
        solution: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://your-api-url.com/api/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Problem
        </button>
      </div>

      {/* Questions table */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredQuestions.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table headers and rows */}
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          No problems found
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            {/* Form content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemsTab;