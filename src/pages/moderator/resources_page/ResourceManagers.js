import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

// API Service Hook
export const useResourcesApi = () => {
  const BASE_URL = `${process.env.REACT_APP_API}/resources`;

  const fetchApi = async (path, { method = "GET", body, headers } = {}) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  return {
    // Domains
    getDomains: () => fetchApi("/domain/all"),
    createDomain: (name) =>
      fetchApi("/domain", { method: "POST", body: { name } }),
    updateDomain: (id, name) =>
      fetchApi(`/domain/${id}`, { method: "PATCH", body: { name } }),
    deleteDomain: (id) => fetchApi(`/domain/${id}`, { method: "DELETE" }),

    // Subdomains
    getSubdomains: () => fetchApi("/subdomain/all"),
    createSubdomain: (domainId, name) =>
      fetchApi("/subdomain", {
        method: "POST",
        body: { name, domain_id: domainId },
      }),
    updateSubdomain: (id, domainId, name) =>
      fetchApi(`/subdomain/${id}`, {
        method: "PATCH",
        body: { name, domain_id: domainId },
      }),
    deleteSubdomain: (id) => fetchApi(`/subdomain/${id}`, { method: "DELETE" }),
    getSubdomainsByDomain: (domainId) =>
      fetchApi(`/domain/${domainId}/subdomains`),

    // Resources
    getResources: () => fetchApi("/all-resources"),
    getResource: (id) => fetchApi(`/${id}`),
    createResource: (data) =>
      fetchApi("/upload-resource", { method: "POST", body: data }),
    updateResource: (id, data) =>
      fetchApi(`/${id}`, { method: "PATCH", body: data }),
    deleteResource: (id) => fetchApi(`/${id}`, { method: "DELETE" }),
    getResourcesByDomainSubdomain: (domainId, subdomainId) =>
      fetchApi("/by-id", {
        method: "POST",
        body: { domain_id: domainId, subdomain_id: subdomainId },
      }),
    upvoteResource: (id) => fetchApi(`/${id}/upvote`, { method: "POST" }),
    downvoteResource: (id) => fetchApi(`/${id}/downvote`, { method: "POST" }),
  };
};

// ========== Domain Manager ==========
export const DomainManager = ({ api }) => {
  const [domains, setDomains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDomain, setCurrentDomain] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      setLoading(true);
      const data = await api.getDomains();
      setDomains(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && currentDomain) {
        await api.updateDomain(currentDomain.id, formData.name);
      } else {
        await api.createDomain(formData.name);
      }
      await loadDomains();
      setShowForm(false);
      setFormData({ name: '' });
      setEditMode(false);
      setCurrentDomain(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (domain) => {
    setCurrentDomain(domain);
    setFormData({ name: domain.name });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteDomain(id);
      await loadDomains();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Domains</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            setCurrentDomain(null);
            setFormData({ name: '' });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Domain
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading domains...</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {domains.length > 0 ? (
                domains.map((domain) => (
                  <motion.tr 
                    key={domain.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {domain.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(domain)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(domain.id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No domains found. Add your first domain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Domain Form Modal */}
      {showForm && (
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
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
  );
};

// ========== Subdomain Manager ==========
export const SubdomainManager = ({ api }) => {
  const [subdomains, setSubdomains] = useState([]);
  const [domains, setDomains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubdomain, setCurrentSubdomain] = useState(null);
  const [formData, setFormData] = useState({ domainId: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [domainsData, subdomainsData] = await Promise.all([
        api.getDomains(),
        api.getSubdomains()
      ]);
      setDomains(domainsData);
      setSubdomains(subdomainsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && currentSubdomain) {
        await api.updateSubdomain(
          currentSubdomain.id,
          parseInt(formData.domainId),
          formData.name
        );
      } else {
        await api.createSubdomain(
          parseInt(formData.domainId),
          formData.name
        );
      }
      await loadData();
      setShowForm(false);
      setFormData({ domainId: '', name: '' });
      setEditMode(false);
      setCurrentSubdomain(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (subdomain) => {
    setCurrentSubdomain(subdomain);
    setFormData({ 
      domainId: subdomain.domain_id.toString(),
      name: subdomain.name 
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSubdomain(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const getDomainName = (domainId) => {
    const domain = domains.find(d => d.id === domainId);
    return domain ? domain.name : 'Unknown';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Subdomains</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            setCurrentSubdomain(null);
            setFormData({ domainId: '', name: '' });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Subdomain
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading subdomains...</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {subdomains.length > 0 ? (
                subdomains.map((subdomain) => (
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
                      {getDomainName(subdomain.domain_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(subdomain)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(subdomain.id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No subdomains found. Add your first subdomain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Subdomain Form Modal */}
      {showForm && (
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
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain*</label>
                    <select
                      name="domainId"
                      value={formData.domainId}
                      onChange={handleInputChange}
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
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
  );
};


// ========== Resource Manager ==========
export const ResourceManager = ({ api }) => {
  const [resources, setResources] = useState([]);
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domainId: '',
    subdomainId: '',
    link: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [domainsData, subdomainsData, resourcesData] = await Promise.all([
        api.getDomains(),
        api.getSubdomains(),
        api.getResources()
      ]);
      setDomains(domainsData);
      setSubdomains(subdomainsData);
      setResources(resourcesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Reset subdomain when domain changes
      if (name === 'domainId') {
        return { ...prev, [name]: value, subdomainId: '' };
      }
      return { ...prev, [name]: value };
    });
  };
  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        domain_id: parseInt(formData.domainId),
        subdomain_id: parseInt(formData.subdomainId),
        added_by_id: userId
      };

      if (editMode && currentResource) {
        await api.updateResource(currentResource.id, payload);
      } else {
        await api.createResource(payload);
      }
      await loadData();
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        domainId: '',
        subdomainId: '',
        link: ''
      });
      setEditMode(false);
      setCurrentResource(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (resource) => {
    setCurrentResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      domainId: resource.domain_id.toString(),
      subdomainId: resource.subdomain_id.toString(),
      link: resource.link
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteResource(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const getDomainName = (domainId) => {
    const domain = domains.find(d => d.id === domainId);
    return domain ? domain.name : 'Unknown';
  };

  const getSubdomainName = (subdomainId) => {
    const subdomain = subdomains.find(s => s.id === subdomainId);
    return subdomain ? subdomain.name : 'Unknown';
  };

  const getFilteredSubdomains = () => {
    if (!formData.domainId) return [];
    return subdomains.filter(s => s.domain_id === parseInt(formData.domainId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Learning Resources</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            setCurrentResource(null);
            setFormData({
              title: '',
              description: '',
              domainId: '',
              subdomainId: '',
              link: ''
            });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Resource
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading resources...</div>
      ) : (
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
                resources.map((resource) => (
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
                      <div className="font-medium">{getDomainName(resource.domain_id)}</div>
                      <div>{getSubdomainName(resource.subdomain_id)}</div>
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
                          onClick={() => handleEdit(resource)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
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
      )}

      {/* Resource Form Modal */}
      {showForm && (
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
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
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
                        value={formData.domainId}
                        onChange={handleInputChange}
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
                        value={formData.subdomainId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                        disabled={!formData.domainId}
                      >
                        <option value="">Select Subdomain</option>
                        {getFilteredSubdomains().map(subdomain => (
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
                      value={formData.link}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
  );
};
