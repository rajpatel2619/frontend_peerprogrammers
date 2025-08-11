import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ModeratorNavbar from './components/ModeratorSidebar';

const ModeratorResources = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('resources');
  
  // State for domains
  const [domains, setDomains] = useState([
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Mobile Development' }
  ]);
  
  // State for subdomains
  const [subdomains, setSubdomains] = useState([
    { id: 1, domainId: 1, name: 'Frontend' },
    { id: 2, domainId: 1, name: 'Backend' },
    { id: 3, domainId: 2, name: 'Machine Learning' },
    { id: 4, domainId: 2, name: 'Data Visualization' },
    { id: 5, domainId: 3, name: 'Android' },
    { id: 6, domainId: 3, name: 'iOS' }
  ]);
  
  // State for resources
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'React Documentation',
      description: 'Official React documentation',
      domainId: 1,
      subdomainId: 1,
      link: 'https://reactjs.org/docs/getting-started.html'
    },
    {
      id: 2,
      title: 'Node.js Best Practices',
      description: 'Collection of best practices for Node.js',
      domainId: 1,
      subdomainId: 2,
      link: 'https://github.com/goldbergyoni/nodebestpractices'
    }
  ]);
  
  // Form states
  const [showDomainForm, setShowDomainForm] = useState(false);
  const [showSubdomainForm, setShowSubdomainForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Domain form data
  const [domainForm, setDomainForm] = useState({
    name: ''
  });
  
  // Subdomain form data
  const [subdomainForm, setSubdomainForm] = useState({
    domainId: '',
    name: ''
  });
  
  // Resource form data
  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    domainId: '',
    subdomainId: '',
    link: ''
  });

  // Handle domain form input changes
  const handleDomainChange = (e) => {
    const { name, value } = e.target;
    setDomainForm({
      ...domainForm,
      [name]: value
    });
  };

  // Handle subdomain form input changes
  const handleSubdomainChange = (e) => {
    const { name, value } = e.target;
    setSubdomainForm({
      ...subdomainForm,
      [name]: value
    });
  };

  // Handle resource form input changes
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm({
      ...resourceForm,
      [name]: value
    });
    
    // Reset subdomain when domain changes
    if (name === 'domainId') {
      setResourceForm(prev => ({
        ...prev,
        subdomainId: ''
      }));
    }
  };

  // Submit domain form
  const handleDomainSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && currentItem) {
      // Update existing domain
      setDomains(domains.map(d => 
        d.id === currentItem.id ? { ...domainForm, id: currentItem.id } : d
      ));
    } else {
      // Add new domain
      const newDomain = {
        id: domains.length + 1,
        ...domainForm
      };
      setDomains([...domains, newDomain]);
    }
    
    // Reset form
    setDomainForm({
      name: ''
    });
    setShowDomainForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  // Submit subdomain form
  const handleSubdomainSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && currentItem) {
      // Update existing subdomain
      setSubdomains(subdomains.map(s => 
        s.id === currentItem.id ? { ...subdomainForm, id: currentItem.id } : s
      ));
    } else {
      // Add new subdomain
      const newSubdomain = {
        id: subdomains.length + 1,
        ...subdomainForm,
        domainId: parseInt(subdomainForm.domainId)
      };
      setSubdomains([...subdomains, newSubdomain]);
    }
    
    // Reset form
    setSubdomainForm({
      domainId: '',
      name: ''
    });
    setShowSubdomainForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  // Submit resource form
  const handleResourceSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && currentItem) {
      // Update existing resource
      setResources(resources.map(r => 
        r.id === currentItem.id ? { ...resourceForm, id: currentItem.id } : r
      ));
    } else {
      // Add new resource
      const newResource = {
        id: resources.length + 1,
        ...resourceForm,
        domainId: parseInt(resourceForm.domainId),
        subdomainId: parseInt(resourceForm.subdomainId)
      };
      setResources([...resources, newResource]);
    }
    
    // Reset form
    setResourceForm({
      title: '',
      description: '',
      domainId: '',
      subdomainId: '',
      link: ''
    });
    setShowResourceForm(false);
    setEditMode(false);
    setCurrentItem(null);
  };

  // Edit domain
  const handleEditDomain = (domain) => {
    setCurrentItem(domain);
    setDomainForm({
      name: domain.name
    });
    setEditMode(true);
    setShowDomainForm(true);
  };

  // Edit subdomain
  const handleEditSubdomain = (subdomain) => {
    setCurrentItem(subdomain);
    setSubdomainForm({
      domainId: subdomain.domainId.toString(),
      name: subdomain.name
    });
    setEditMode(true);
    setShowSubdomainForm(true);
  };

  // Edit resource
  const handleEditResource = (resource) => {
    setCurrentItem(resource);
    setResourceForm({
      title: resource.title,
      description: resource.description,
      domainId: resource.domainId.toString(),
      subdomainId: resource.subdomainId.toString(),
      link: resource.link
    });
    setEditMode(true);
    setShowResourceForm(true);
  };

  // Delete domain
  const handleDeleteDomain = (id) => {
    setDomains(domains.filter(d => d.id !== id));
    // Also delete associated subdomains
    setSubdomains(subdomains.filter(s => s.domainId !== id));
    // Also delete associated resources
    setResources(resources.filter(r => r.domainId !== id));
  };

  // Delete subdomain
  const handleDeleteSubdomain = (id) => {
    setSubdomains(subdomains.filter(s => s.id !== id));
    // Also delete associated resources
    setResources(resources.filter(r => r.subdomainId !== id));
  };

  // Delete resource
  const handleDeleteResource = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  // Get subdomains for a specific domain
  const getSubdomainsForDomain = (domainId) => {
    return subdomains.filter(subdomain => subdomain.domainId === domainId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Resources Management</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'resources' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab('domains')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'domains' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveTab('subdomains')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'subdomains' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Subdomains
            </button>
          </nav>
        </div>
        
        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Learning Resources</h2>
              <button
                onClick={() => {
                  setShowResourceForm(true);
                  setEditMode(false);
                  setCurrentItem(null);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <FiPlus className="mr-2" /> Add Resource
              </button>
            </div>
            
            {/* Resources List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Domain/Subdomain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Link</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {resources.length > 0 ? (
                    resources.map((resource) => {
                      const domain = domains.find(d => d.id === resource.domainId);
                      const subdomain = subdomains.find(s => s.id === resource.subdomainId);
                      
                      return (
                        <motion.tr 
                          key={resource.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {resource.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {resource.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <div className="font-medium">{domain?.name}</div>
                            <div>{subdomain?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center dark:text-blue-400"
                            >
                              <FiExternalLink className="mr-1" /> Open
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditResource(resource)}
                                className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDeleteResource(resource.id)}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No resources found. Add your first resource.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Add/Edit Resource Form Modal */}
            {showResourceForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editMode ? 'Edit Resource' : 'Add New Resource'}
                      </h2>
                      <button
                        onClick={() => setShowResourceForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={handleResourceSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                          <input
                            type="text"
                            name="title"
                            value={resourceForm.title}
                            onChange={handleResourceChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description*</label>
                          <textarea
                            name="description"
                            value={resourceForm.description}
                            onChange={handleResourceChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain*</label>
                            <select
                              name="domainId"
                              value={resourceForm.domainId}
                              onChange={handleResourceChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              required
                            >
                              <option value="">Select Domain</option>
                              {domains.map(domain => (
                                <option key={domain.id} value={domain.id}>{domain.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subdomain*</label>
                            <select
                              name="subdomainId"
                              value={resourceForm.subdomainId}
                              onChange={handleResourceChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              required
                              disabled={!resourceForm.domainId}
                            >
                              <option value="">Select Subdomain</option>
                              {resourceForm.domainId && getSubdomainsForDomain(parseInt(resourceForm.domainId)).map(subdomain => (
                                <option key={subdomain.id} value={subdomain.id}>{subdomain.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resource Link*</label>
                          <input
                            type="url"
                            name="link"
                            value={resourceForm.link}
                            onChange={handleResourceChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowResourceForm(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editMode ? 'Update Resource' : 'Add Resource'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
        
        {/* Domains Tab */}
        {activeTab === 'domains' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Domains</h2>
              <button
                onClick={() => {
                  setShowDomainForm(true);
                  setEditMode(false);
                  setCurrentItem(null);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <FiPlus className="mr-2" /> Add Domain
              </button>
            </div>
            
            {/* Domains List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subdomains</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resources</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {domains.length > 0 ? (
                    domains.map((domain) => {
                      const domainSubdomains = subdomains.filter(s => s.domainId === domain.id);
                      const domainResources = resources.filter(r => r.domainId === domain.id);
                      
                      return (
                        <motion.tr 
                          key={domain.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {domain.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {domainSubdomains.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {domainResources.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditDomain(domain)}
                                className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDeleteDomain(domain.id)}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No domains found. Add your first domain.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Add/Edit Domain Form Modal */}
            {showDomainForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editMode ? 'Edit Domain' : 'Add New Domain'}
                      </h2>
                      <button
                        onClick={() => setShowDomainForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={handleDomainSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={domainForm.name}
                            onChange={handleDomainChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowDomainForm(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editMode ? 'Update Domain' : 'Add Domain'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
        
        {/* Subdomains Tab */}
        {activeTab === 'subdomains' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Subdomains</h2>
              <button
                onClick={() => {
                  setShowSubdomainForm(true);
                  setEditMode(false);
                  setCurrentItem(null);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <FiPlus className="mr-2" /> Add Subdomain
              </button>
            </div>
            
            {/* Subdomains List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Domain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resources</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {subdomains.length > 0 ? (
                    subdomains.map((subdomain) => {
                      const domain = domains.find(d => d.id === subdomain.domainId);
                      const subdomainResources = resources.filter(r => r.subdomainId === subdomain.id);
                      
                      return (
                        <motion.tr 
                          key={subdomain.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {subdomain.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {domain?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {subdomainResources.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditSubdomain(subdomain)}
                                className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDeleteSubdomain(subdomain.id)}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No subdomains found. Add your first subdomain.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Add/Edit Subdomain Form Modal */}
            {showSubdomainForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editMode ? 'Edit Subdomain' : 'Add New Subdomain'}
                      </h2>
                      <button
                        onClick={() => setShowSubdomainForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={handleSubdomainSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain*</label>
                          <select
                            name="domainId"
                            value={subdomainForm.domainId}
                            onChange={handleSubdomainChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          >
                            <option value="">Select Domain</option>
                            {domains.map(domain => (
                              <option key={domain.id} value={domain.id}>{domain.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={subdomainForm.name}
                            onChange={handleSubdomainChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowSubdomainForm(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editMode ? 'Update Subdomain' : 'Add Subdomain'}
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

export default ModeratorResources;