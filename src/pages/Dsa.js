import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiFilter, FiStar, FiChevronLeft, FiChevronRight, FiLoader
} from "react-icons/fi";

const API = process.env.REACT_APP_API;
const PAGE_SIZE = 15; // Define page size as a constant

// --- 1. Custom Hooks ---

/**
 * Debounces a value to prevent rapid-fire executions of effects.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

/**
 * Manages user authentication state by reading from localStorage.
 */
const useAuth = () => {
  const [auth, setAuth] = useState({ isLoggedIn: false, userId: null, token: null });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuth({ isLoggedIn: true, userId: user.id, token });
    }
  }, []);
  return auth;
};


// --- 2. UI Components (Memoized for Performance) ---

const MultiSelectDropdown = memo(({ options, selected, onToggle, placeholder, nameKey = "name" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`px-3 w-full sm:w-auto justify-between py-2 border rounded-lg flex items-center gap-2 text-sm transition-colors ${selected.length > 0 ? "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FiFilter size={16} />
        <span>{placeholder}</span>
        {selected.length > 0 && <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{selected.length}</span>}
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label key={option.id} className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                <input type="checkbox" checked={selected.includes(option.id)} onChange={() => onToggle(option.id)} className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"/>
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{option[nameKey]}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const ProblemRow = memo(({ problem }) => (
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors duration-150">
        <td className="px-6 py-4 whitespace-nowrap"><a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">{problem.title}</a></td>
        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs rounded-full font-semibold ${problem.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"}`}>{problem.difficulty}</span></td>
        <td className="px-6 py-4"><div className="flex flex-wrap gap-1">{problem.tags?.slice(0, 2).map((tag) => <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/40 dark:text-blue-300 font-medium">{tag}</span>)}{problem.tags?.length > 2 && <span className="px-2 py-1 text-xs bg-neutral-200 text-neutral-800 rounded-full dark:bg-neutral-700/60 dark:text-neutral-300 font-medium" title={problem.tags.slice(2).join(", ")}>+{problem.tags.length - 2}</span>}</div></td>
        <td className="px-6 py-4"><div className="flex flex-wrap gap-1">{problem.sheets?.slice(0, 2).map((sheet) => <span key={sheet} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900/40 dark:text-purple-300 font-medium">{sheet}</span>)}{problem.sheets?.length > 2 && <span className="px-2 py-1 text-xs bg-neutral-200 text-neutral-800 rounded-full dark:bg-neutral-700/60 dark:text-neutral-300 font-medium" title={problem.sheets.slice(2).join(", ")}>+{problem.sheets.length - 2}</span>}</div></td>
    </tr>
));

const ProblemTable = memo(({ problems }) => (
    <div className="bg-white dark:bg-neutral-800/70 rounded-lg shadow-md overflow-x-auto border border-neutral-200 dark:border-neutral-700/50">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700/50">
            <thead className="bg-neutral-50 dark:bg-neutral-800/70">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Problem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Sheets</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800/40 divide-y divide-neutral-200 dark:divide-neutral-700/50">
                {problems.map(problem => <ProblemRow key={problem.id} problem={problem} />)}
            </tbody>
        </table>
    </div>
));

// MOBILE-FRIENDLY: Card component for mobile view
const ProblemCard = memo(({ problem }) => (
    <div className="bg-white dark:bg-neutral-800/70 rounded-lg shadow-md p-4 border border-neutral-200 dark:border-neutral-700/50">
        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg mb-2 block">{problem.title}</a>
        <div className="mb-3">
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${problem.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"}`}>{problem.difficulty}</span>
        </div>
        <div className="space-y-2 text-sm">
            {problem.tags?.length > 0 && <div><h4 className="font-semibold text-xs text-neutral-500 dark:text-neutral-400 uppercase mb-1">Tags</h4><div className="flex flex-wrap gap-1">{problem.tags.map((tag) => <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/40 dark:text-blue-300 font-medium">{tag}</span>)}</div></div>}
            {problem.sheets?.length > 0 && <div><h4 className="font-semibold text-xs text-neutral-500 dark:text-neutral-400 uppercase mb-1">Sheets</h4><div className="flex flex-wrap gap-1">{problem.sheets.map((sheet) => <span key={sheet} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900/40 dark:text-purple-300 font-medium">{sheet}</span>)}</div></div>}
        </div>
    </div>
));

// NEW: Pagination component
const Pagination = memo(({ currentPage, totalProblems, onPageChange }) => {
    const totalPages = Math.ceil(totalProblems / PAGE_SIZE);
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center mt-6">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                <FiChevronLeft /> Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Next <FiChevronRight />
            </button>
        </div>
    );
});


// --- 3. Main Page Component ---

const DSASheetPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProblems, setTotalProblems] = useState(0);
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({ difficulties: [], tags: [], sheets: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ difficulty: [], tag: [], sheet: [], favorite: false });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedFilters = useDebounce(filters, 300);

  // FIX: Normalize difficulty options which are strings into {id, name} objects for the dropdown
  const normalizedDifficulties = useMemo(() => 
    filterOptions.difficulties.map(d => ({ id: d, name: d })), 
    [filterOptions.difficulties]
  );
  
  // Fetch filter options on initial mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${API}/problems/filter-options`);
        const data = await response.json();
        setFilterOptions({
          difficulties: data.difficulties || [],
          tags: data.tags || [],
          sheets: data.sheets || [],
        });
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    fetchOptions();
  }, []);

  // FIX & OPTIMIZATION: Unified effect for fetching problems.
  // It resets the page when filters change and aborts stale requests.
  useEffect(() => {
    // Reset page to 1 whenever filters change
    setPage(1);
  }, [debouncedSearchTerm, debouncedFilters]);
  
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProblems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: page, limit: PAGE_SIZE });
        if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
        if (debouncedFilters.difficulty.length) params.append("difficulties", debouncedFilters.difficulty.join(","));
        if (debouncedFilters.tag.length) params.append("tag_ids", debouncedFilters.tag.join(","));
        if (debouncedFilters.sheet.length) params.append("sheet_ids", debouncedFilters.sheet.join(","));
        if (debouncedFilters.favorite && isLoggedIn && userId) {
            params.append("favorite", "true");
            params.append("user_id", userId);
        }

        const response = await fetch(`${API}/problems/filter?${params.toString()}`, { signal });
        const data = await response.json();
        
        setProblems(data?.results || []);
        setTotalProblems(data.total || 0);
      } catch (error) {
        if (error.name !== 'AbortError') {
            console.error("Error fetching problems:", error);
            setProblems([]);
        }
      } finally {
        if (!signal.aborted) {
            setLoading(false);
        }
      }
    };

    fetchProblems();
    
    // Cleanup function to abort fetch on re-run
    return () => controller.abort();
  }, [page, debouncedSearchTerm, debouncedFilters, isLoggedIn, userId]);

  const handleToggleFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  }, []);

  const handleToggleFavoriteFilter = useCallback(() => {
    if (!isLoggedIn) { navigate('/login'); return; }
    setFilters(f => ({ ...f, favorite: !f.favorite }));
  }, [isLoggedIn, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800 dark:text-white mb-4">DSA Practice Sheet</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Consistency is the key to success!</p>

      <div className="bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
            <input type="text" placeholder="Search problems..." className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-zinc-800 dark:text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <MultiSelectDropdown options={normalizedDifficulties} selected={filters.difficulty} onToggle={(id) => handleToggleFilter("difficulty", id)} placeholder="Difficulty" />
            <MultiSelectDropdown options={filterOptions.tags} selected={filters.tag} onToggle={(id) => handleToggleFilter("tag", id)} placeholder="Tags"/>
            <MultiSelectDropdown options={filterOptions.sheets} selected={filters.sheet} onToggle={(id) => handleToggleFilter("sheet", id)} placeholder="Sheet" nameKey="title" />
            {/* <button onClick={handleToggleFavoriteFilter} className={`px-3 py-2 border rounded-lg flex items-center gap-2 text-sm justify-center transition-colors ${filters.favorite ? "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/40 dark:border-yellow-700 dark:text-yellow-400" : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"}`} >
              <FiStar size={16} className={filters.favorite ? "fill-current" : ""} /><span>Favorites</span>
            </button> */}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20"><FiLoader className="animate-spin text-4xl text-neutral-500" /></div>
      ) : problems.length > 0 ? (
        <>
          {/* MOBILE-FRIENDLY: Conditional rendering for table vs cards */}
          <div className="hidden md:block">
            <ProblemTable problems={problems} />
          </div>
          <div className="block md:hidden space-y-4">
            {problems.map(problem => <ProblemCard key={problem.id} problem={problem} />)}
          </div>
          <Pagination currentPage={page} totalProblems={totalProblems} onPageChange={setPage} />
        </>
      ) : (
        <div className="text-center py-10 bg-white dark:bg-neutral-800/70 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Problems Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DSASheetPage;