import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCheck,
  FiYoutube,
  FiGithub,
  FiFilter,
  FiStar,
  FiBriefcase,
} from "react-icons/fi";

const DSASheetPage = () => {
  // Sample data for DSA problems with company tags and favorite status
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Two Sum",
      link: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
      pattern: "Array",
      sheet: "Blind 75",
      companies: ["Google", "Amazon", "Facebook"],
      solved: false,
      favorite: false,
      solutions: {
        youtube: {
          english: "https://youtube.com/english-solution",
          hindi: "https://youtube.com/hindi-solution",
        },
        github: "https://github.com/code-solution",
      },
    },
    {
      id: 2,
      title: "Reverse Linked List",
      link: "https://leetcode.com/problems/reverse-linked-list/",
      difficulty: "Easy",
      pattern: "Linked List",
      sheet: "Blind 75",
      companies: ["Microsoft", "Apple"],
      solved: false,
      favorite: true,
      solutions: {
        youtube: {
          english: "https://youtube.com/english-solution",
          hindi: "https://youtube.com/hindi-solution",
        },
        github: "https://github.com/code-solution",
      },
    },
    // Add more problems similarly
  ]);
  const getUserTitle = (solved) => {
    if (solved < 10) return "🌟 Rookie Solver";
    if (solved < 30) return "🔥 Hot Streak";
    if (solved < 60) return "💡 Bright Mind";
    if (solved < 100) return "🚀 Code Ninja";
    return "🏆 DSA Champion";
  };

  const getRankTitle = (rank) => {
    if (rank <= 10) return "Top 10";
    if (rank <= 50) return "Elite";
    if (rank <= 100) return "Pro";
    return "Rising Star";
  };
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "",
    pattern: "",
    sheet: "",
    company: "",
    favorite: false,
  });
  const getRankColor = (rank) => {
    if (rank <= 10)
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    if (rank <= 50)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    if (rank <= 100)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  };
  const [userRank, setUserRank] = useState(42); // Replace with actual rank from your data
  // Calculate progress
  const totalProblems = problems.length;
  const solvedProblems = problems.filter((p) => p.solved).length;
  const progressPercentage = (solvedProblems / totalProblems) * 100;

  // Filter problems based on search and filters
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      !filters.difficulty || problem.difficulty === filters.difficulty;
    const matchesPattern =
      !filters.pattern || problem.pattern === filters.pattern;
    const matchesSheet = !filters.sheet || problem.sheet === filters.sheet;
    const matchesCompany =
      !filters.company ||
      (problem.companies && problem.companies.includes(filters.company));
    const matchesFavorite = !filters.favorite || problem.favorite;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesPattern &&
      matchesSheet &&
      matchesCompany &&
      matchesFavorite
    );
  });

  // Unique values for filters
  const difficulties = [...new Set(problems.map((p) => p.difficulty))];
  const patterns = [...new Set(problems.map((p) => p.pattern))];
  const sheets = [...new Set(problems.map((p) => p.sheet))];
  const companies = [...new Set(problems.flatMap((p) => p.companies || []))];

  const toggleSolved = (id) => {
    setProblems(
      problems.map((problem) =>
        problem.id === id ? { ...problem, solved: !problem.solved } : problem
      )
    );
  };

  const toggleFavorite = (id) => {
    setProblems(
      problems.map((problem) =>
        problem.id === id
          ? { ...problem, favorite: !problem.favorite }
          : problem
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6">
        DSA Practice Sheet
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Start Solving Now - One Problem at a Time!
      </p>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
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

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
            >
              <option value="">All Difficulties</option>
              {difficulties.map((diff, index) => (
                <option key={index} value={diff}>
                  {diff}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={filters.pattern}
              onChange={(e) =>
                setFilters({ ...filters, pattern: e.target.value })
              }
            >
              <option value="">All Patterns</option>
              {patterns.map((pattern, index) => (
                <option key={index} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={filters.sheet}
              onChange={(e) =>
                setFilters({ ...filters, sheet: e.target.value })
              }
            >
              <option value="">All Sheets</option>
              {sheets.map((sheet, index) => (
                <option key={index} value={sheet}>
                  {sheet}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            >
              <option value="">All Companies</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setFilters({ ...filters, favorite: !filters.favorite })
              }
              className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${
                filters.favorite
                  ? "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FiStar className={filters.favorite ? "fill-current" : ""} />
              <span>Favorites</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Progress Box - Takes 2/3 width on medium screens and up */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Your Progress
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {solvedProblems}/{totalProblems} ({Math.round(progressPercentage)}
              %)
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
    {/* Rank Section */}
    <div className="flex items-center gap-2">
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Rank</p>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">#{userRank}</span>
          <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${getRankColor(userRank)}`}>
            {getRankTitle(userRank)}
          </span>
        </div>
      </div>
    </div>

    {/* Achievement Section */}
    <div className="flex-1 text-center border-l border-r border-gray-200 dark:border-gray-700 px-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">Achievement</p>
      <p className="text-sm font-medium text-yellow-500 dark:text-yellow-400 truncate">
        {getUserTitle(solvedProblems)}
      </p>
    </div>

    {/* Leaderboard Button */}
    <button
      onClick={() => navigate("/leaderboard")}
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
      View
    </button>
  </div>
</div>
      </div>

      {/* Problems List */}
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
                Companies
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
            {filteredProblems.map((problem) => (
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
                    {problem.companies?.slice(0, 2).map((company, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {company}
                      </span>
                    ))}
                    {problem.companies?.length > 2 && (
                      <div className="relative">
                        <button
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          title={problem.companies.join(", ")}
                        >
                          +{problem.companies.length - 2} more
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <a
                      href={problem.solutions.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      title="Code Solution"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href={problem.solutions.youtube.hindi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      title="Hindi Solution"
                    >
                      <FiYoutube />
                    </a>
                    <a
                      href={problem.solutions.youtube.english}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      title="English Solution"
                    >
                      <FiYoutube />
                    </a>
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
                    <FiStar />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSASheetPage;
