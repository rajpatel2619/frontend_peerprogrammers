import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus, FiSearch, FiX, FiChevronDown, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_API;
const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
const user = stored ? JSON.parse(stored) : null;
const ProblemsTab = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    difficulty: 'Easy',
    gitHubLink: '',
    hindiSolution: '',
    englishSolution: '',
    is_premium: false,
    tag_ids: [],
    company_ids: [],
    sheet_ids: [],
  });

  // Search and dropdown states
  const [tagSearch, setTagSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [sheetSearch, setSheetSearch] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showSheetDropdown, setShowSheetDropdown] = useState(false);

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch problems
        const problemsResponse = await fetch(`${API}/problems/all_problem`);
        const problemsData = await problemsResponse.json();
        setQuestions(Array.isArray(problemsData) ? problemsData : []);

        // Fetch tags
        const tagsResponse = await fetch(`${API}/problems/all/tags`);
        const tagsData = await tagsResponse.json();
        setTags(Array.isArray(tagsData) ? tagsData : []);

        // Fetch sheets
        const sheetsResponse = await fetch(`${API}/problems/all_sheets`);
        const sheetsData = await sheetsResponse.json();
        setSheets(Array.isArray(sheetsData) ? sheetsData : []);
        
        // Fetch companies
        const companiesResponse = await fetch(`${API}/problems/list`);
        const companiesData = await companiesResponse.json();
        setCompanies(Array.isArray(companiesData?.companies) ? companiesData.companies : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setQuestions([]);
        setTags([]);
        setCompanies([]);
        setSheets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) => {
    if (!q) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      q.title?.toLowerCase().includes(searchLower) ||
      (q.tags && q.tags.some(tag => tag?.toLowerCase().includes(searchLower))) ||
      (q.companies && q.companies.some(company => company?.toLowerCase().includes(searchLower))) ||
      q.difficulty?.toLowerCase().includes(searchLower)
    );
  });

  // Filter functions for searchable selects
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companySearch.toLowerCase())
  );

  const filteredSheets = sheets.filter(sheet =>
    sheet.title.toLowerCase().includes(sheetSearch.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Toggle selection for tags, companies, and sheets
  const toggleSelection = (id, field) => {
    const currentIds = formData[field];
    if (currentIds.includes(id)) {
      setFormData({
        ...formData,
        [field]: currentIds.filter(item => item !== id),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentIds, id],
      });
    }
  };

  // Get selected items names for display
  const getSelectedNames = (ids, collection) => {
    return collection
      .filter(item => ids.includes(item.id))
      .map(item => item.name || item.title)
      .join(', ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      
      // Append all non-array fields
      form.append('title', formData.title);
      form.append('link', formData.link);
      form.append('difficulty', formData.difficulty);
      form.append('gitHubLink', formData.gitHubLink);
      form.append('hindiSolution', formData.hindiSolution);
      form.append('englishSolution', formData.englishSolution);
      form.append('is_premium', formData.is_premium);
      form.append('created_by', user.id); // Convert to string to match other fields

      // Append array fields properly
      formData.tag_ids.forEach(id => form.append('tag_ids', id.toString()));
      formData.company_ids.forEach(id => form.append('company_ids', id.toString()));
      formData.sheet_ids.forEach(id => form.append('sheet_ids', id.toString()));

      // Log FormData contents
      console.log(form)

      const url = editingId 
        ? `${API}/problems/update_problem/${editingId}`
        : `${API}/problems/create_problem`;
  
      const method = editingId ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        body: form,
      });
      
      // ... rest of your code ...
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  // Handle edit
  const handleEdit = (problem) => {
    if (!problem) return;
    
    setEditingId(problem.id);
    setFormData({
      title: problem.title || '',
      link: problem.link || '',
      difficulty: problem.difficulty || 'Easy',
      gitHubLink: problem.gitHubLink || '',
      hindiSolution: problem.hindiSolution || '',
      englishSolution: problem.englishSolution || '',
      is_premium: problem.is_premium || false,
      tag_ids: (problem.tags && Array.isArray(problem.tags)) ? problem.tags.map(t => t.id) : [],
      company_ids: (problem.companies && Array.isArray(problem.companies)) ? problem.companies.map(c => c.id) : [],
      sheet_ids: (problem.sheets && Array.isArray(problem.sheets)) ? problem.sheets.map(s => s.id) : [],
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        const response = await fetch(`${API}/problems/deleted_problem/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete problem');
        }
        
        // Refresh the problems list
        const problemsResponse = await fetch(`${API}/problems/all_problem`);
        const problemsData = await problemsResponse.json();
        setQuestions(Array.isArray(problemsData) ? problemsData : []);
      } catch (error) {
        console.error('Error deleting problem:', error);
        alert('Failed to delete problem');
      }
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search problems by title, tags, companies, or difficulty..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" /> Add Problem
        </button>
      </div>

      {/* Questions table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredQuestions.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Companies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sheets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solutions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md">
                        <FiExternalLink className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <a href={question.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {question.title}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {question.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                          {typeof tag === 'object' ? tag.name : tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {question.companies?.map((company, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">
                          {typeof company === 'object' ? company.name : company}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {question.sheets?.map((sheet, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-800">
                          {typeof sheet === 'object' ? sheet.title : sheet}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      {question.gitHubLink && (
                        <a href={question.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                          <FiExternalLink className="mr-1" /> GitHub
                        </a>
                      )}
                      {question.hindiSolution && (
                        <a href={question.hindiSolution} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                          <FiExternalLink className="mr-1" /> Hindi
                        </a>
                      )}
                      {question.englishSolution && (
                        <a href={question.englishSolution} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                          <FiExternalLink className="mr-1" /> English
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {question.is_premium ? (
                      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Premium</span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Free</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(question)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">No problems found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new problem.</p>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingId ? 'Edit Problem' : 'Add New Problem'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Problem Link*</label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty*</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Solution Link</label>
                    <input
                      type="url"
                      name="gitHubLink"
                      value={formData.gitHubLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hindi Solution Link</label>
                    <input
                      type="url"
                      name="hindiSolution"
                      value={formData.hindiSolution}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">English Solution Link</label>
                    <input
                      type="url"
                      name="englishSolution"
                      value={formData.englishSolution}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_premium"
                      checked={formData.is_premium}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Premium Problem</label>
                  </div>
                  
                  {/* Tags Select */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      onClick={() => setShowTagDropdown(!showTagDropdown)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">
                          {formData.tag_ids.length > 0 
                            ? getSelectedNames(formData.tag_ids, tags)
                            : 'Select tags...'}
                        </span>
                        <FiChevronDown className={`transition-transform ${showTagDropdown ? 'transform rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    {showTagDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                        <div className="p-2 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder="Search tags..."
                            className="w-full px-2 py-1 border rounded"
                            value={tagSearch}
                            onChange={(e) => setTagSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="divide-y divide-gray-200">
                          {filteredTags.length > 0 ? (
                            filteredTags.map(tag => (
                              <div 
                                key={tag.id} 
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelection(tag.id, 'tag_ids');
                                }}
                              >
                                <div className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${formData.tag_ids.includes(tag.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                  {formData.tag_ids.includes(tag.id) && <FiCheck className="text-white" size={14} />}
                                </div>
                                <span>{tag.name}</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">No tags found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Companies Select */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Companies</label>
                    <div 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">
                          {formData.company_ids.length > 0 
                            ? getSelectedNames(formData.company_ids, companies)
                            : 'Select companies...'}
                        </span>
                        <FiChevronDown className={`transition-transform ${showCompanyDropdown ? 'transform rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    {showCompanyDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                        <div className="p-2 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full px-2 py-1 border rounded"
                            value={companySearch}
                            onChange={(e) => setCompanySearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="divide-y divide-gray-200">
                          {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(company => (
                              <div 
                                key={company.id} 
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelection(company.id, 'company_ids');
                                }}
                              >
                                <div className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${formData.company_ids.includes(company.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                  {formData.company_ids.includes(company.id) && <FiCheck className="text-white" size={14} />}
                                </div>
                                <span>{company.name}</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">No companies found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sheets Select */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sheets</label>
                    <div 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      onClick={() => setShowSheetDropdown(!showSheetDropdown)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">
                          {formData.sheet_ids.length > 0 
                            ? getSelectedNames(formData.sheet_ids, sheets)
                            : 'Select sheets...'}
                        </span>
                        <FiChevronDown className={`transition-transform ${showSheetDropdown ? 'transform rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    {showSheetDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                        <div className="p-2 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder="Search sheets..."
                            className="w-full px-2 py-1 border rounded"
                            value={sheetSearch}
                            onChange={(e) => setSheetSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="divide-y divide-gray-200">
                          {filteredSheets.length > 0 ? (
                            filteredSheets.map(sheet => (
                              <div 
                                key={sheet.id} 
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelection(sheet.id, 'sheet_ids');
                                }}
                              >
                                <div className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${formData.sheet_ids.includes(sheet.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                  {formData.sheet_ids.includes(sheet.id) && <FiCheck className="text-white" size={14} />}
                                </div>
                                <span>{sheet.title}</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">No sheets found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {editingId ? 'Update Problem' : 'Add Problem'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProblemsTab;