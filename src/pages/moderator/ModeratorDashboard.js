import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiCheck, FiX, FiTag, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ModeratorSidebar from './components/ModeratorSidebar';

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);

  // Mock data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        setTimeout(() => {
          setQuestions([
            {
              id: 1,
              title: 'How to optimize React performance?',
              content: 'Looking for best practices to optimize React application performance...',
              tags: ['react', 'performance'],
              verified: false,
              createdAt: '2023-05-15'
            },
            {
              id: 2,
              title: 'State management in large applications',
              content: 'What are the recommended state management solutions for large scale React apps?',
              tags: ['react', 'state-management'],
              verified: true,
              createdAt: '2023-06-02'
            }
          ]);
          setTags([
            { id: 1, name: 'react', verified: true },
            { id: 2, name: 'javascript', verified: true },
            { id: 3, name: 'performance', verified: false }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerifyQuestion = (questionId) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, verified: !q.verified } : q
    ));
  };

  const handleVerifyTag = (tagId) => {
    setTags(tags.map(t => 
      t.id === tagId ? { ...t, verified: !t.verified } : t
    ));
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: questions.length + 1,
      title: newQuestion.title,
      content: newQuestion.content,
      tags: newQuestion.tags,
      verified: false,
      createdAt: new Date().toISOString()
    };
    setQuestions([...questions, newQ]);
    setNewQuestion({ title: '', content: '', tags: [] });
    setShowAddQuestionModal(false);
  };

  const handleAddTag = () => {
    const newT = {
      id: tags.length + 1,
      name: newTag.toLowerCase(),
      verified: false
    };
    setTags([...tags, newT]);
    setNewTag('');
    setShowAddTagModal(false);
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTags = tags.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorSidebar />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Moderator Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'questions' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'tags' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
            >
              Tags
            </button>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => activeTab === 'questions' ? setShowAddQuestionModal(true) : setShowAddTagModal(true)}
            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" />
            Add {activeTab === 'questions' ? 'Question' : 'Tag'}
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'questions' ? (
          <div className="space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{question.title}</h3>
                      <button
                        onClick={() => handleVerifyQuestion(question.id)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${question.verified ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}
                      >
                        {question.verified ? (
                          <>
                            <FiCheck className="mr-1" /> Verified
                          </>
                        ) : (
                          <>
                            <FiX className="mr-1" /> Unverified
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{question.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full flex items-center"
                        >
                          <FiTag className="mr-1" /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>Posted on {new Date(question.createdAt).toLocaleDateString()}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          <FiEdit2 />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No questions found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <motion.div
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                        <FiTag className="mr-2" /> {tag.name}
                      </h3>
                      <button
                        onClick={() => handleVerifyTag(tag.id)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${tag.verified ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}
                      >
                        {tag.verified ? (
                          <>
                            <FiCheck className="mr-1" /> Verified
                          </>
                        ) : (
                          <>
                            <FiX className="mr-1" /> Unverified
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Used in {Math.floor(Math.random() * 50) + 1} questions</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          <FiEdit2 />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center col-span-3">
                <p className="text-gray-500 dark:text-gray-400">No tags found</p>
              </div>
            )}
          </div>
        )}

        {/* Add Question Modal */}
        {showAddQuestionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add New Question</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      value={newQuestion.tags.join(',')}
                      onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value.split(',') })}
                      placeholder="react,javascript,performance"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddQuestionModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Tag Modal */}
        {showAddTagModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add New Tag</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tag Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddTagModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorDashboard;