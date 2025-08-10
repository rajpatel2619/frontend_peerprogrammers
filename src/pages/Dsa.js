import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCheck,
  FiYoutube,
  FiGithub,
  FiFilter,
  FiStar,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const API = process.env.REACT_APP_API;

const DSASheetPage = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: [],
    tag: [],
    sheet: [],
    company: [],
    favorite: false,
  });
  const [userRank, setUserRank] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    difficulties: [],
    tags: [],
    sheets: [],
    companies: [],
  });
  const [pagination, setPagination] = useState({
    page: 1,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const solvedProblems = problems?.filter((p) => p.solved).length || 0;
  const progressPercentage = totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0;

  const { difficulties, tags, sheets, companies } = filterOptions;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsLoggedIn(true);
      setUserId(user.id);
    }
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${API}/problems/filter-options`);
      const data = await response.json();
      setFilterOptions({
        difficulties: data.difficulties || [],
        tags: data.tags || [],
        sheets: data.sheets || [],
        companies: data.companies || [],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (filters.difficulty.length) params.append('difficulties', filters.difficulty.join(','));
      if (filters.tag.length) params.append('tag_ids', filters.tag.join(','));
      if (filters.sheet.length) params.append('sheet_ids', filters.sheet.join(','));
      if (filters.company.length) params.append('company_ids', filters.company.join(','));
      if (filters.favorite && isLoggedIn && userId) {
        params.append('favorite', 'true');
        params.append('user_id', userId);
      }
      
      params.append('page', pagination.page);
      
      const response = await fetch(`${API}/problems/filter?${params.toString()}`);
      const data = await response.json();
      console.log(data)
      setProblems(data?.results?.map(problem => ({
        ...problem,
        solved: false,
        favorite: false,
        solutions: {
          github: problem.gitHubLink,
          youtube: {
            hindi: problem.hindiSolution,
            english: problem.englishSolution,
          }
        }
      })));
      setTotalProblems(data.total);
      setUserRank(0);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchProblems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchProblems();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  useEffect(() => {
    fetchProblems();
  }, [pagination.page, isLoggedIn]);

  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilter = (filterType) => {
    setFilters(prev => ({ ...prev, [filterType]: [] }));
  };

  const toggleSolved = async (id) => {
    try {
      setProblems(prev =>
        prev.map(problem =>
          problem.id === id ? { ...problem, solved: !problem.solved } : problem
        )
      );
      fetchProblems();
    } catch (error) {
      console.error("Error toggling solved status:", error);
      setProblems(prev =>
        prev.map(problem =>
          problem.id === id ? { ...problem, solved: !problem.solved } : problem
        )
      );
    }
  };

  const toggleFavorite = async (id) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    try {
      const response = await fetch(`${API}/problems/${id}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ user_id: userId })
      });
      
      if (response.ok) {
        setProblems(prev =>
          prev.map(problem =>
            problem.id === id ? { ...problem, favorite: !problem.favorite } : problem
          )
        );
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const getUserTitle = (solved) => {
    if (solved < 5) return "🥉 Bronze Solver";
    if (solved < 15) return "🥈 Silver Solver"; 
    if (solved < 30) return "🥇 Gold Solver";
    if (solved < 50) return "🔘 Platinum Solver";
    if (solved < 75) return "💎 Diamond Solver";
    if (solved < 100) return "👑 Crown Solver";
    if (solved < 150) return "🎯 Ace Solver";
    return "🏆 Conqueror";
  };

  const getRankColor = (rank) => {
    if (rank <= 10)
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    if (rank <= 50)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    if (rank <= 100)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  const FilterChips = () => {
    const getFilterName = (type, value) => {
      switch (type) {
        case 'difficulty':
          return difficulties.find(d => d.id === value)?.name || value;
        case 'tag':
          return tags.find(t => t.id === value)?.name || value;
        case 'sheet':
          return sheets.find(s => s.id === value)?.title || value;
        case 'company':
          return companies.find(c => c.id === value)?.name || value;
        default:
          return value;
      }
    };

    const activeFilters = [
      ...filters.difficulty.map(d => ({ type: 'difficulty', value: d })),
      ...filters.tag.map(p => ({ type: 'tag', value: p })),
      ...filters.sheet.map(s => ({ type: 'sheet', value: s })),
      ...filters.company.map(c => ({ type: 'company', value: c })),
      ...(filters.favorite ? [{ type: 'favorite', value: 'Favorites' }] : []),
    ];

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}`}
            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900/20 dark:text-blue-400"
          >
            <span>{getFilterName(filter.type, filter.value)}</span>
            <button
              onClick={() => {
                if (filter.type === 'favorite') {
                  setFilters(prev => ({ ...prev, favorite: false }));
                } else {
                  toggleFilter(filter.type, filter.value);
                }
              }}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => setFilters({
            difficulty: [],
            tag: [],
            sheet: [],
            company: [],
            favorite: false,
          })}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Clear all
        </button>
      </div>
    );
  };

  const MultiSelectDropdown = ({ options, selected, onToggle, placeholder, nameKey = 'name' }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${
            selected.length > 0
              ? "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400"
              : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <FiFilter size={16} />
          <span>{placeholder}</span>
          {selected.length > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selected.length}
            </span>
          )}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-2 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.id)}
                    onChange={() => onToggle(option.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {option[nameKey]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const PaginationControls = () => {
    const totalPages = Math.ceil(totalProblems / 10);
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, pagination.page - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {(pagination.page - 1) * 10 + 1}-{Math.min(pagination.page * 10, totalProblems)} of {totalProblems}
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: 1 }))}
                className={`px-3 py-1 rounded-lg ${1 === pagination.page ? 'bg-blue-500 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setPagination(prev => ({ ...prev, page: number }))}
              className={`px-3 py-1 rounded-lg ${number === pagination.page ? 'bg-blue-500 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: totalPages }))}
                className={`px-3 py-1 rounded-lg ${totalPages === pagination.page ? 'bg-blue-500 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
            disabled={pagination.page === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6">
        DSA Practice Sheet
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Start Solving Now - Consistency is the key of success!
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search problems..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <MultiSelectDropdown
              options={difficulties}
              selected={filters.difficulty}
              onToggle={(value) => toggleFilter('difficulty', value)}
              placeholder="Difficulty"
            />
            
            <MultiSelectDropdown
              options={tags}
              selected={filters.tag}
              onToggle={(value) => toggleFilter('tag', value)}
              placeholder="tag"
            />
            
            <MultiSelectDropdown
              options={sheets}
              selected={filters.sheet}
              onToggle={(value) => toggleFilter('sheet', value)}
              placeholder="Sheet"
              nameKey="title"
            />
            
            <MultiSelectDropdown
              options={companies}
              selected={filters.company}
              onToggle={(value) => toggleFilter('company', value)}
              placeholder="Company"
            />
            
            {/* {isLoggedIn && (
              <button
                onClick={() => setFilters({ ...filters, favorite: !filters.favorite })}
                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${
                  filters.favorite
                    ? "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FiStar className={filters.favorite ? "fill-current" : ""} />
                <span>Favorites</span>
              </button>
            )} */}
            <button
                onClick={() => {
                  if (!isLoggedIn) return; // do nothing if not logged in
                  setFilters({ ...filters, favorite: !filters.favorite });
                }}
                disabled={!isLoggedIn} // disable if not logged in
                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${
                  filters.favorite
                    ? "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`} // visual cue for disabled
              >
                <FiStar className={filters.favorite ? "fill-current" : ""} />
                <span>Favorites</span>
              </button>
          </div>
        </div>
        
        <FilterChips />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Your Progress
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {solvedProblems}/{totalProblems} ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Beginner</span>
            <span>Master</span>
          </div>
        </div>

        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 animate-bounce-in">
          <div className="flex items-center justify-between h-full gap-3">
            <div className="flex items-center gap-2">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Rank</p>
                <div className="flex items-center gap-1">
                  <span className={`text-lg font-bold ${getRankColor(userRank)}`}>
                    #{userRank}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center border-l border-r border-gray-200 dark:border-gray-700 px-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">Achievement</p>
              <p className="text-sm font-medium text-yellow-500 dark:text-yellow-400 truncate">
                {getUserTitle(solvedProblems)}
              </p>
            </div>

            <button
              onClick={() => navigate("/dsa_leaderboard")}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
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
                  Solutions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Favorite
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {problems?.map((problem) => (
                <tr
                  key={problem.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSolved(problem.id)}
                        className={`p-2 rounded-full ${
                          problem.solved
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        } dark:${
                          problem.solved
                            ? "bg-green-900/20 text-green-400"
                            : "bg-gray-700 text-gray-500"
                        }`}
                      >
                        <FiCheck />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {problem.title}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags?.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {problem.tags?.length > 2 && (
                        <div className="relative">
                          <button
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            title={problem.tags.join(", ")}
                          >
                            +{problem.tags.length - 2} more
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {problem.solutions.github && (
                        <a
                          href={problem.solutions.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          title="Code Solution"
                        >
                          <FiGithub />
                        </a>
                      )}
                      {problem.solutions.youtube.hindi && (
                        <a
                          href={problem.solutions.youtube.hindi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          title="Hindi Solution"
                        >
                          <FiYoutube />
                        </a>
                      )}
                      {problem.solutions.youtube.english && (
                        <a
                          href={problem.solutions.youtube.english}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          title="English Solution"
                        >
                          <FiYoutube />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFavorite(problem.id)}
                      className={`p-2 rounded-full ${
                        problem.favorite
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-400"
                      } dark:${
                        problem.favorite
                          ? "bg-yellow-900/20 text-yellow-400"
                          : "bg-gray-700 text-gray-500"
                      }`}
                    >
                      <FiStar className={problem.favorite ? "fill-current" : ""} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControls />
        </div>
      )}
    </div>
  );
};

export default DSASheetPage;