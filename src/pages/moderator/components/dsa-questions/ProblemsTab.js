import React, { useState, useEffect, useMemo } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus, FiSearch, FiX, FiChevronDown, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_API;
const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
const user = stored ? JSON.parse(stored) : null;

/** --------------------
 * Reusable Components
 ----------------------*/

// Loading Spinner
const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Badge for difficulty and premium/free
const Badge = ({ label, color }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded ${color}`}>{label}</span>
);

// Unified multi-select dropdown component
const DropdownSelect = ({ label, items, selectedIds, onToggle, search, setSearch }) => {
  const [open, setOpen] = useState(false);

  const filteredItems = useMemo(
    () => items.filter(i => (i.name || i.title).toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className="w-full px-3 py-2 border rounded-md flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">
          {selectedIds.length > 0
            ? items.filter(i => selectedIds.includes(i.id)).map(i => i.name || i.title).join(", ")
            : `Select ${label.toLowerCase()}...`}
        </span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
          {/* Search */}
          <div className="p-2 sticky top-0 bg-white">
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              className="w-full px-2 py-1 border rounded"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          {/* Items */}
          <div className="divide-y divide-gray-200">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={e => {
                    e.stopPropagation();
                    onToggle(item.id);
                  }}
                >
                  <div
                    className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${selectedIds.includes(item.id) ? "bg-blue-500 border-blue-500" : "border-gray-300"
                      }`}
                  >
                    {selectedIds.includes(item.id) && <FiCheck className="text-white" size={14} />}
                  </div>
                  <span>{item.name || item.title}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No {label.toLowerCase()} found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/** --------------------
 * Main Component
 ----------------------*/
const ProblemsTab = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sheets, setSheets] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    difficulty: "Easy",
    gitHubLink: "",
    hindiSolution: "",
    englishSolution: "",
    is_premium: false,
    tag_ids: [],
    company_ids: [],
    sheet_ids: [],
  });

  // Dropdown search states
  const [tagSearch, setTagSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [sheetSearch, setSheetSearch] = useState("");

  /** Fetch data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problems, tags, sheets, companiesRes] = await Promise.all([
          fetch(`${API}/problems/all_problem`).then(res => res.json()),
          fetch(`${API}/problems/all/tags`).then(res => res.json()),
          fetch(`${API}/problems/all_sheets`).then(res => res.json()),
          fetch(`${API}/problems/list`).then(res => res.json())
        ]);

        setQuestions(Array.isArray(problems) ? problems : []);
        setTags(Array.isArray(tags) ? tags : []);
        setSheets(Array.isArray(sheets) ? sheets : []);
        setCompanies(Array.isArray(companiesRes?.companies) ? companiesRes.companies : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /** Search filter */
  const filteredQuestions = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return questions.filter(q =>
      q?.title?.toLowerCase().includes(searchLower) ||
      q?.difficulty?.toLowerCase().includes(searchLower) ||
      q?.tags?.some(tag => (tag.name || tag).toLowerCase().includes(searchLower)) ||
      q?.companies?.some(c => (c.name || c).toLowerCase().includes(searchLower))
    );
  }, [questions, searchTerm]);

  /** Input change handler */
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  /** Toggle multi-select */
  const toggleSelection = (id, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id) ? prev[field].filter(i => i !== id) : [...prev[field], id]
    }));
  };

  /** Submit handler */
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (Array.isArray(val)) val.forEach(v => form.append(key, v));
        else form.append(key, key === "is_premium" ? String(val) : val || "");
      });
      form.append("created_by", String(user.id));

      const url = editingId ? `${API}/problems/update_problem/${editingId}` : `${API}/problems/create_problem`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: form });
      if (!res.ok) throw new Error("Failed to save problem");
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.message);
    }
  };

  /** Edit handler */
  const handleEdit = problem => {
    setEditingId(problem.id);
    setFormData({
      title: problem.title || "",
      link: problem.link || "",
      difficulty: problem.difficulty || "Easy",
      gitHubLink: problem.gitHubLink || "",
      hindiSolution: problem.hindiSolution || "",
      englishSolution: problem.englishSolution || "",
      is_premium: problem.is_premium || false,
      tag_ids: problem.tags?.map(t => t.id) || [],
      company_ids: problem.companies?.map(c => c.id) || [],
      sheet_ids: problem.sheets?.map(s => s.id) || [],
    });
    setShowForm(true);
  };

  /** Delete handler */
  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      await fetch(`${API}/problems/deleted_problem/${id}`, { method: "DELETE" });
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete problem");
    }
  };

  /** Badge colors */
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> Add Problem
        </button>
      </div>

      {loading ? <Spinner /> : (
        filteredQuestions.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Title</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Difficulty</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Tags</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Companies</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Sheets</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Solutions</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Premium</th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map(q => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <a href={q.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{q.title}</a>
                    </td>
                    <td><Badge label={q.difficulty} color={difficultyColors[q.difficulty] || "bg-gray-100"} /></td>
                    <td>{q.tags?.map((t, i) => <Badge key={i} label={t.name || t} color="bg-gray-100 text-gray-800" />)}</td>
                    <td>{q.companies?.map((c, i) => <Badge key={i} label={c.name || c} color="bg-purple-100 text-purple-800" />)}</td>
                    <td>{q.sheets?.map((s, i) => <Badge key={i} label={s.title || s} color="bg-indigo-100 text-indigo-800" />)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        {q.gitHubLink && (
                          <a href={q.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                            <FiExternalLink className="mr-1" /> GitHub
                          </a>
                        )}
                        {q.hindiSolution && (
                          <a href={q.hindiSolution} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                            <FiExternalLink className="mr-1" /> Hindi
                          </a>
                        )}
                        {q.englishSolution && (
                          <a href={q.englishSolution} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                            <FiExternalLink className="mr-1" /> English
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <Badge label={q.is_premium ? "Premium" : "Free"} color={q.is_premium ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"} />
                    </td>
                    <td className="flex space-x-2">
                      <button onClick={() => handleEdit(q)} className="text-blue-600 hover:text-blue-900"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(q.id)} className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="p-10 bg-white text-center rounded-lg shadow">No problems found</div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2>{editingId ? "Edit Problem" : "Add Problem"}</h2>
              <button onClick={() => setShowForm(false)}><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full border px-3 py-2 rounded" />
              <input type="url" name="link" required value={formData.link} onChange={handleInputChange} placeholder="Problem Link" className="w-full border px-3 py-2 rounded" />
              <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
              <input type="url" name="gitHubLink" value={formData.gitHubLink} onChange={handleInputChange} placeholder="GitHub Solution (optional)" className="w-full border px-3 py-2 rounded" />
              <input type="url" name="hindiSolution" value={formData.hindiSolution} onChange={handleInputChange} placeholder="Hindi Solution" className="w-full border px-3 py-2 rounded" />
              <input type="url" name="englishSolution" value={formData.englishSolution} onChange={handleInputChange} placeholder="English Solution" className="w-full border px-3 py-2 rounded" />
              <label className="flex items-center"><input type="checkbox" name="is_premium" checked={formData.is_premium} onChange={handleInputChange} /> Premium?</label>

              <DropdownSelect label="Tags" items={tags} selectedIds={formData.tag_ids} onToggle={id => toggleSelection(id, "tag_ids")} search={tagSearch} setSearch={setTagSearch} />
              <DropdownSelect label="Companies" items={companies} selectedIds={formData.company_ids} onToggle={id => toggleSelection(id, "company_ids")} search={companySearch} setSearch={setCompanySearch} />
              <DropdownSelect label="Sheets" items={sheets} selectedIds={formData.sheet_ids} onToggle={id => toggleSelection(id, "sheet_ids")} search={sheetSearch} setSearch={setSheetSearch} />

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white">{editingId ? "Update" : "Add"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProblemsTab;
