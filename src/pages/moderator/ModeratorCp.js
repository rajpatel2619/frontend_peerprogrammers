import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ModeratorNavbar from './components/ModeratorSidebar';

const ModeratorCp = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('ratings');
  
  // State for ratings
  const [ratings, setRatings] = useState([
    { id: 1, platform: 'Codeforces', rating: 1600, description: 'Div 2 A-B level' },
    { id: 2, platform: 'Codechef', rating: 1800, description: '3 star rating' },
    { id: 3, platform: 'AtCoder', rating: 1200, description: 'ABC level' }
  ]);
  
  // State for CP questions
  const [cpQuestions, setCpQuestions] = useState([
    {
      id: 1,
      title: 'Two Sum',
      link: 'https://codeforces.com/problemset/problem/1/A',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      rating: 1200,
      solution: 'Use hash map to store complements',
      githubLink: 'https://github.com/example/two-sum',
      hindiSolution: 'https://youtube.com/hindi-solution',
      englishSolution: 'https://youtube.com/english-solution'
    }
  ]);
  
  // Form states
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Rating form data
  const [ratingForm, setRatingForm] = useState({
    platform: '',
    rating: '',
    description: ''
  });
  
  // Question form data
  const [questionForm, setQuestionForm] = useState({
    title: '',
    link: '',
    difficulty: 'Easy',
    tags: [],
    rating: '',
    solution: '',
    githubLink: '',
    hindiSolution: '',
    englishSolution: '',
    currentTag: ''
  });

  // Handle rating form input changes
  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setRatingForm({
      ...ratingForm,
      [name]: value
    });
  };

  // Handle question form input changes
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionForm({
      ...questionForm,
      [name]: value
    });
  };

  // Add tag to question
  const handleAddTag = () => {
    if (questionForm.currentTag.trim() && !questionForm.tags.includes(questionForm.currentTag.trim())) {
      setQuestionForm({
        ...questionForm,
        tags: [...questionForm.tags, questionForm.currentTag.trim()],
        currentTag: ''
      });
    }
  };

  // Remove tag from question
  const handleRemoveTag = (tagToRemove) => {
    setQuestionForm({
      ...questionForm,
      tags: questionForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Submit rating form
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && currentItem) {
      // Update existing rating
      setRatings(ratings.map(r => 
        r.id === currentItem.id ? { ...ratingForm, id: currentItem.id } : r
      ));
    } else {
      // Add new rating
      const newRating = {
        id: ratings.length + 1,
        ...ratingForm,
        rating: parseInt(ratingForm.rating)
      };
      setRatings([...ratings, newRating]);
    }
    
    // Reset form
    setRatingForm({
      platform: '',
      rating: '',
      description: ''
    });
    setShowRatingForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  // Submit question form
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && currentItem) {
      // Update existing question
      setCpQuestions(cpQuestions.map(q => 
        q.id === currentItem.id ? { ...questionForm, id: currentItem.id } : q
      ));
    } else {
      // Add new question
      const newQuestion = {
        id: cpQuestions.length + 1,
        ...questionForm,
        rating: parseInt(questionForm.rating)
      };
      setCpQuestions([...cpQuestions, newQuestion]);
    }
    
    // Reset form
    setQuestionForm({
      title: '',
      link: '',
      difficulty: 'Easy',
      tags: [],
      rating: '',
      solution: '',
      githubLink: '',
      hindiSolution: '',
      englishSolution: '',
      currentTag: ''
    });
    setShowQuestionForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  // Edit rating
  const handleEditRating = (rating) => {
    setCurrentItem(rating);
    setRatingForm({
      platform: rating.platform,
      rating: rating.rating.toString(),
      description: rating.description
    });
    setEditMode(true);
    setShowRatingForm(true);
  };

  // Edit question
  const handleEditQuestion = (question) => {
    setCurrentItem(question);
    setQuestionForm({
      title: question.title,
      link: question.link,
      difficulty: question.difficulty,
      tags: [...question.tags],
      rating: question.rating.toString(),
      solution: question.solution,
      githubLink: question.githubLink,
      hindiSolution: question.hindiSolution,
      englishSolution: question.englishSolution,
      currentTag: ''
    });
    setEditMode(true);
    setShowQuestionForm(true);
  };

  // Delete rating
  const handleDeleteRating = (id) => {
    setRatings(ratings.filter(r => r.id !== id));
  };

  // Delete question
  const handleDeleteQuestion = (id) => {
    setCpQuestions(cpQuestions.filter(q => q.id !== id));
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Moderator Control Panel</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('ratings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ratings' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Ratings
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'questions' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              CP Questions
            </button>
          </nav>
        </div>
        
        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Rating System</h2>
              <button
                onClick={() => {
                  setShowRatingForm(true);
                  setEditMode(false);
                  setCurrentItem(null);
                }}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {ratings.map((rating) => (
                    <motion.tr 
                      key={rating.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{rating.platform}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{rating.rating}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{rating.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditRating(rating)}
                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteRating(rating.id)}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Add/Edit Rating Form Modal */}
            {showRatingForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editMode ? 'Edit Rating' : 'Add New Rating'}
                      </h2>
                      <button
                        onClick={() => setShowRatingForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={handleRatingSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform*</label>
                          <input
                            type="text"
                            name="platform"
                            value={ratingForm.platform}
                            onChange={handleRatingChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating*</label>
                          <input
                            type="number"
                            name="rating"
                            value={ratingForm.rating}
                            onChange={handleRatingChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                          <input
                            type="text"
                            name="description"
                            value={ratingForm.description}
                            onChange={handleRatingChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowRatingForm(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editMode ? 'Update Rating' : 'Add Rating'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
        
        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Competitive Programming Questions</h2>
              <button
                onClick={() => {
                  setShowQuestionForm(true);
                  setEditMode(false);
                  setCurrentItem(null);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <FiPlus className="mr-2" /> Add Question
              </button>
            </div>
            
            {/* Questions List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Solutions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {cpQuestions.map((question) => (
                    <motion.tr 
                      key={question.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <a 
                            href={question.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center dark:text-blue-400"
                          >
                            <FiExternalLink className="mr-1" /> {question.title}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{question.rating}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {question.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {question.githubLink && (
                            <a 
                              href={question.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <FiGithub />
                            </a>
                          )}
                          {question.hindiSolution && (
                            <a 
                              href={question.hindiSolution} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              हिंदी
                            </a>
                          )}
                          {question.englishSolution && (
                            <a 
                              href={question.englishSolution} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              English
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Add/Edit Question Form Modal */}
            {showQuestionForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editMode ? 'Edit Question' : 'Add New Question'}
                      </h2>
                      <button
                        onClick={() => setShowQuestionForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={handleQuestionSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                          <input
                            type="text"
                            name="title"
                            value={questionForm.title}
                            onChange={handleQuestionChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Link*</label>
                          <input
                            type="url"
                            name="link"
                            value={questionForm.link}
                            onChange={handleQuestionChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty*</label>
                            <select
                              name="difficulty"
                              value={questionForm.difficulty}
                              onChange={handleQuestionChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              required
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating*</label>
                            <input
                              type="number"
                              name="rating"
                              value={questionForm.rating}
                              onChange={handleQuestionChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                          <div className="flex">
                            <input
                              type="text"
                              name="currentTag"
                              value={questionForm.currentTag}
                              onChange={handleQuestionChange}
                              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Add tags"
                            />
                            <button
                              type="button"
                              onClick={handleAddTag}
                              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {questionForm.tags.map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Solution Description</label>
                          <textarea
                            name="solution"
                            value={questionForm.solution}
                            onChange={handleQuestionChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Solution Link</label>
                          <input
                            type="url"
                            name="githubLink"
                            value={questionForm.githubLink}
                            onChange={handleQuestionChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hindi Solution Link</label>
                            <input
                              type="url"
                              name="hindiSolution"
                              value={questionForm.hindiSolution}
                              onChange={handleQuestionChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English Solution Link</label>
                            <input
                              type="url"
                              name="englishSolution"
                              value={questionForm.englishSolution}
                              onChange={handleQuestionChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowQuestionForm(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editMode ? 'Update Question' : 'Add Question'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorCp;