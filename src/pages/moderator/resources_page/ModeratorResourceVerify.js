import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiSearch, FiThumbsUp, FiThumbsDown, FiExternalLink, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ModeratorResourceVerify = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const API = process.env.REACT_APP_API;

  // Fetch resources from API
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setMessage({ text: 'Loading resources...', type: 'info' });
      
      const res = await fetch(`${API}/resources/all`);
      const data = await res.json();
    console.log(data);
      if (data) {
        setResources(data);
        setMessage({ text: 'Resources loaded successfully', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to load resources', type: 'error' });
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setMessage({ text: 'Failed to load resources. Please check your connection.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Toggle verify resource using the correct API endpoint
  const toggleVerifyResource = async (id) => {
    try {
      setMessage({ text: 'Updating verification status...', type: 'info' });
      
      const res = await fetch(`${API}/resources/toggle_verify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update local state to reflect the change
        setResources(prev =>
          prev.map(resource =>
            resource.id === id 
              ? { ...resource, is_verified: data.is_verified } 
              : resource
          )
        );
        
        setMessage({ 
          text: `Resource ${data.is_verified ? 'verified' : 'unverified'} successfully`, 
          type: 'success' 
        });
        
        console.log(`Resource ${id} verification toggled to ${data.is_verified}`);
      } else {
        setMessage({ 
          text: data.message || 'Failed to update verification status', 
          type: 'error' 
        });
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error verifying resource:', err);
      setMessage({ 
        text: 'Failed to update verification status. Please check your connection.', 
        type: 'error' 
      });
    }
  };

  // Filter resources by title, added_by_name, domain, or subdomain
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.added_by_name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (resource.domain_name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (resource.subdomain_name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Resource Verification
          </h1>
          <div className="flex items-center">
            <div className="text-sm text-blue-600 dark:text-blue-400 mr-4">
              {filteredResources.length} resources found
            </div>
            <button
              onClick={fetchResources}
              className="flex items-center text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 px-3 py-1 rounded-md transition-colors"
              title="Refresh resources"
            >
              <FiRefreshCw className="mr-1" /> Refresh
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'error' && <FiAlertCircle className="mr-2" />}
              {message.text}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, creator, domain, or subdomain..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

      

        {/* Resources Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>Loading resources...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title & Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Domain/Subdomain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Added By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Verified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                      <motion.tr
                        key={resource.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 flex items-center"
                            >
                              {resource.title} <FiExternalLink className="ml-1" size={14} />
                            </a>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            <span className="font-medium">{resource.domain_name}</span>
                            {resource.subdomain_name && (
                              <span className="text-gray-500 dark:text-gray-400">
                                {" / "}{resource.subdomain_name}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {resource.added_by_name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <FiThumbsUp className="mr-1" />
                              <span>{resource.upvote || 0}</span>
                            </div>
                            <div className="flex items-center text-red-600 dark:text-red-400">
                              <FiThumbsDown className="mr-1" />
                              <span>{resource.downvote || 0}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {resource.is_verified ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full dark:bg-yellow-900 dark:text-yellow-200">
                              unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleVerifyResource(resource.id)}
                            className={`p-2 rounded-full transition-colors ${
                              resource.is_verified
                                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                                : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                            }`}
                            title={
                              resource.is_verified ? 'Unverify Resource' : 'Verify Resource'
                            }
                          >
                            {resource.is_verified ? <FiX /> : <FiCheck />}
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        {resources.length === 0 
                          ? "No resources available" 
                          : "No resources match your search"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default ModeratorResourceVerify;