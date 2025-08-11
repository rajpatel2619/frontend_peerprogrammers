import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiFilter,
  FiX,
  FiTag,
  FiBriefcase,
  FiFileText,
  FiCode,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ModeratorNavbar from "./components/ModeratorSidebar";

const DSAQuestionsPage = () => {
  // State for questions list and form
  const [questions, setQuestions] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState("problems");
  const [newTag, setNewTag] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSheet, setNewSheet] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    problemName: "",
    problemLink: "",
    difficulty: "Easy",
    tags: [],
    companies: [],
    sheet: "",
    solution: "",
    githubLink: "",
    hindiSolutionLink: "",
    englishSolutionLink: "",
    tagSearch: "",
    companySearch: "",
    sheetSearch: "",
  });

  // Extract all unique tags, companies and sheets for filters
  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));
  const allCompanies = Array.from(
    new Set(questions.flatMap((q) => q.companies))
  );
  const allSheets = Array.from(new Set(questions.map((q) => q.sheet).filter(Boolean))) || [];

  // Load mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setQuestions([
            {
              id: 1,
              problemName: "Two Sum",
              problemLink: "https://leetcode.com/problems/two-sum/",
              difficulty: "Easy",
              tags: ["Array", "Hash Table"],
              companies: ["Amazon", "Google", "Microsoft"],
              sheet: "Leetcode Top 100",
              solution: "Use a hash map to store complements",
              githubLink: "https://github.com/example/two-sum",
              hindiSolutionLink: "https://youtube.com/hindi-solution",
              englishSolutionLink: "https://youtube.com/english-solution",
            },
            {
              id: 2,
              problemName: "Reverse Linked List",
              problemLink: "https://leetcode.com/problems/reverse-linked-list/",
              difficulty: "Medium",
              tags: ["Linked List"],
              companies: ["Facebook", "Apple"],
              sheet: "Striver's SDE Sheet",
              solution: "Iterative or recursive approach",
              githubLink: "https://github.com/example/reverse-ll",
              hindiSolutionLink: "https://youtube.com/hindi-solution-ll",
              englishSolutionLink: "https://youtube.com/english-solution-ll",
            },
            {
              id: 3,
              problemName: "LRU Cache",
              problemLink: "https://leetcode.com/problems/lru-cache/",
              difficulty: "Hard",
              tags: ["Hash Table", "Linked List", "Design"],
              companies: ["Amazon", "Microsoft", "Uber"],
              sheet: "Neetcode 150",
              solution: "Combine hash map with doubly linked list",
              githubLink: "https://github.com/example/lru-cache",
              hindiSolutionLink: "https://youtube.com/hindi-solution-lru",
              englishSolutionLink: "https://youtube.com/english-solution-lru",
            },
          ]);
          
          setSheets(["Leetcode Top 100", "Striver's SDE Sheet", "Neetcode 150"]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a tag to the tags array
  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
        tagSearch: "",
      });
    }
  };

  // Add a company to the companies array
  const handleAddCompany = (company) => {
    const trimmedCompany = company.trim();
    if (trimmedCompany && !formData.companies.includes(trimmedCompany)) {
      setFormData({
        ...formData,
        companies: [...formData.companies, trimmedCompany],
        companySearch: "",
      });
    }
  };

  // Remove a tag from the tags array
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Remove a company from the companies array
  const handleRemoveCompany = (companyToRemove) => {
    setFormData({
      ...formData,
      companies: formData.companies.filter(
        (company) => company !== companyToRemove
      ),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode && currentQuestion) {
      // Update existing question
      setQuestions(
        questions.map((q) =>
          q.id === currentQuestion.id
            ? { ...formData, id: currentQuestion.id }
            : q
        )
      );
    } else {
      // Add new question
      const newQuestion = {
        id: questions.length + 1,
        ...formData,
      };
      setQuestions([...questions, newQuestion]);
    }

    // Reset form
    setFormData({
      problemName: "",
      problemLink: "",
      difficulty: "Easy",
      tags: [],
      companies: [],
      sheet: "",
      solution: "",
      githubLink: "",
      hindiSolutionLink: "",
      englishSolutionLink: "",
      tagSearch: "",
      companySearch: "",
      sheetSearch: "",
    });
    setShowForm(false);
    setEditMode(false);
    setCurrentQuestion(null);
  };

  // Edit a question
  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setFormData({
      problemName: question.problemName,
      problemLink: question.problemLink,
      difficulty: question.difficulty,
      tags: [...question.tags],
      companies: [...question.companies],
      sheet: question.sheet || "",
      solution: question.solution,
      githubLink: question.githubLink,
      hindiSolutionLink: question.hindiSolutionLink,
      englishSolutionLink: question.englishSolutionLink,
      tagSearch: "",
      companySearch: "",
      sheetSearch: "",
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Delete a question
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Add new tag
  const handleAddNewTag = () => {
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      setQuestions(prevQuestions => 
        prevQuestions.map(q => ({
          ...q,
          tags: [...q.tags, newTag.trim()]
        }))
      );
      setNewTag("");
    }
  };

  // Delete tag
  const handleDeleteTag = (tagToDelete) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => ({
        ...q,
        tags: q.tags.filter(tag => tag !== tagToDelete)
      }))
    );
  };

  // Add new company
  const handleAddNewCompany = () => {
    if (newCompany.trim() && !allCompanies.includes(newCompany.trim())) {
      setQuestions(prevQuestions => 
        prevQuestions.map(q => ({
          ...q,
          companies: [...q.companies, newCompany.trim()]
        }))
      );
      setNewCompany("");
    }
  };

  // Delete company
  const handleDeleteCompany = (companyToDelete) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => ({
        ...q,
        companies: q.companies.filter(company => company !== companyToDelete)
      }))
    );
  };

  // Add new sheet
  const handleAddNewSheet = () => {
    if (newSheet.trim() && !sheets.includes(newSheet.trim())) {
      setSheets([...sheets, newSheet.trim()]);
      setNewSheet("");
    }
  };

  // Delete sheet
  const handleDeleteSheet = (sheetToDelete) => {
    setSheets(sheets.filter(sheet => sheet !== sheetToDelete));
    setQuestions(prevQuestions => 
      prevQuestions.map(q => ({
        ...q,
        sheet: q.sheet === sheetToDelete ? "" : q.sheet
      }))
    );
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) => {
    return (
      q.problemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      q.companies.some((company) =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (q.sheet && q.sheet.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Render tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "tags":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Add new tag"
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                onClick={handleAddNewTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Add Tag
              </button>
            </div>
            <div className="space-y-4">
              {allTags.map((tag) => (
                <div key={tag} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-800 dark:text-gray-200">{tag}</span>
                  <button
                    onClick={() => handleDeleteTag(tag)}
                    className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              {allTags.length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No tags available. Add your first tag.
                </div>
              )}
            </div>
          </div>
        );
      case "companies":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Add new company"
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
              />
              <button
                onClick={handleAddNewCompany}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Add Company
              </button>
            </div>
            <div className="space-y-4">
              {allCompanies.map((company) => (
                <div key={company} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-800 dark:text-gray-200">{company}</span>
                  <button
                    onClick={() => handleDeleteCompany(company)}
                    className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              {allCompanies.length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No companies available. Add your first company.
                </div>
              )}
            </div>
          </div>
        );
      case "sheets":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Add new sheet"
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={newSheet}
                onChange={(e) => setNewSheet(e.target.value)}
              />
              <button
                onClick={handleAddNewSheet}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Add Sheet
              </button>
            </div>
            <div className="space-y-4">
              {sheets.map((sheet) => (
                <div key={sheet} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-800 dark:text-gray-200">{sheet}</span>
                  <button
                    onClick={() => handleDeleteSheet(sheet)}
                    className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              {sheets.length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No sheets available. Add your first sheet.
                </div>
              )}
            </div>
          </div>
        );
      case "problems":
      default:
        return (
          <>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Problem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sheet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[...Array(3)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : filteredQuestions.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Problem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sheet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredQuestions.map((question) => (
                      <motion.tr
                        key={question.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">
                              <FiExternalLink className="text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                <a
                                  href={question.problemLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {question.problemName}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(
                              question.difficulty
                            )}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {question.sheet && (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                              {question.sheet}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(question)}
                              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(question.id)}
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-300"
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
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                  No problems found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? "Try adjusting your search" : "Add your first problem"}
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Add Problem
                </button>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            DSA Questions Repository
          </h1>
          {activeTab === "problems" && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditMode(false);
                setCurrentQuestion(null);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <FiPlus className="mr-2" /> Add Problem
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("problems")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "problems" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <FiCode className="mr-2" />
              Problems
            </button>
            <button
              onClick={() => setActiveTab("tags")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "tags" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <FiTag className="mr-2" />
              Tags
            </button>
            <button
              onClick={() => setActiveTab("companies")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "companies" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <FiBriefcase className="mr-2" />
              Companies
            </button>
            <button
              onClick={() => setActiveTab("sheets")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "sheets" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <FiFileText className="mr-2" />
              Sheets
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Add/Edit Problem Form Modal */}
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
                    {editMode ? "Edit Problem" : "Add New Problem"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditMode(false);
                      setCurrentQuestion(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Problem Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Problem Name*
                      </label>
                      <input
                        type="text"
                        name="problemName"
                        value={formData.problemName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    {/* Problem Link */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Problem Link*
                      </label>
                      <input
                        type="url"
                        name="problemLink"
                        value={formData.problemLink}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Difficulty*
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    {/* Sheet */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sheet
                      </label>
                      <select
                        name="sheet"
                        value={formData.sheet}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select a sheet (optional)</option>
                        {sheets.map((sheet) => (
                          <option key={sheet} value={sheet}>
                            {sheet}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tags
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="tagSearch"
                          value={formData.tagSearch}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Search or add tags"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (formData.tagSearch.trim()) {
                                handleAddTag(formData.tagSearch);
                              }
                            }
                          }}
                        />
                        {formData.tagSearch && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-auto">
                            {allTags
                              .filter(
                                (tag) =>
                                  tag
                                    .toLowerCase()
                                    .includes(formData.tagSearch.toLowerCase()) &&
                                  !formData.tags.includes(tag)
                              )
                              .map((tag) => (
                                <div
                                  key={tag}
                                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                  onClick={() => handleAddTag(tag)}
                                >
                                  {tag}
                                </div>
                              ))}
                            {formData.tagSearch.trim() &&
                              !allTags.includes(formData.tagSearch.trim()) && (
                                <div
                                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                  onClick={() =>
                                    handleAddTag(formData.tagSearch)
                                  }
                                >
                                  Add "{formData.tagSearch}"
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          >
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

                    {/* Companies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Companies
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="companySearch"
                          value={formData.companySearch}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Search or add companies"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (formData.companySearch.trim()) {
                                handleAddCompany(formData.companySearch);
                              }
                            }
                          }}
                        />
                        {formData.companySearch && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-auto">
                            {allCompanies
                              .filter(
                                (company) =>
                                  company
                                    .toLowerCase()
                                    .includes(formData.companySearch.toLowerCase()) &&
                                  !formData.companies.includes(company)
                              )
                              .map((company) => (
                                <div
                                  key={company}
                                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                  onClick={() => handleAddCompany(company)}
                                >
                                  {company}
                                </div>
                              ))}
                            {formData.companySearch.trim() &&
                              !allCompanies.includes(formData.companySearch.trim()) && (
                                <div
                                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                  onClick={() =>
                                    handleAddCompany(formData.companySearch)
                                  }
                                >
                                  Add "{formData.companySearch}"
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.companies.map((company, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          >
                            {company}
                            <button
                              type="button"
                              onClick={() => handleRemoveCompany(company)}
                              className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub Solution Link
                      </label>
                      <input
                        type="url"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditMode(false);
                        setCurrentQuestion(null);
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editMode ? "Update Problem" : "Add Problem"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSAQuestionsPage;