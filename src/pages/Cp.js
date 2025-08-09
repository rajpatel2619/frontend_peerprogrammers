import React, { useState, useEffect } from 'react';
import { FiCheck, FiYoutube, FiGithub, FiStar, FiFilter, FiSearch } from 'react-icons/fi';

const CPSheet = () => {
  // Sample data structure with individual ratings
  const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
  const [sheets, setSheets] = useState(
    ratings.reduce((acc, rating) => {
      acc[rating] = Array(51).fill().map((_, i) => ({
        id: `${rating}-${i+1}`,
        title: `Problem ${i+1}`,
        link: `https://codeforces.com/problemset/problem/${rating}/A`,
        solved: false,
        revisited: false,
        solutions: {
          youtube: {
            english: `https://youtube.com/${rating}-english-solution-${i+1}`,
            hindi: `https://youtube.com/${rating}-hindi-solution-${i+1}`
          },
          github: `https://github.com/code-solution/${rating}-${i+1}`
        }
      }));
      return acc;
    }, {})
  );

  const [currentRating, setCurrentRating] = useState(800);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRevisited, setShowRevisited] = useState(false);

  // Calculate progress
  const calculateProgress = (rating) => {
    const problems = sheets[rating];
    const solved = problems.filter(p => p.solved).length;
    return {
      solved,
      total: problems.length
    };
  };

  const overallProgress = () => {
    const allProblems = Object.values(sheets).flat();
    const solved = allProblems.filter(p => p.solved).length;
    return {
      solved,
      total: allProblems.length
    };
  };
const [userRank, setUserRank] = useState(42); // Hardcoded initial rank
const [totalUsers, setTotalUsers] = useState(1000); // Hardcoded total users

useEffect(() => {
  // Simulate rank calculation based on solved problems
  const calculateDummyRank = () => {
    const solved = overallProgress().solved;
    
    // Simple algorithm: more solved = better rank
    // This is just an example - adjust the formula as needed
    const newRank = Math.max(1, Math.floor(totalUsers / (solved / 10 + 1)));
    
    setUserRank(newRank);
  };

  calculateDummyRank();
}, [overallProgress().solved, totalUsers]);

// Calculate percentile
const userPercentile = Math.round((userRank / totalUsers) * 100);
  // Toggle functions
  const toggleSolved = (rating, id) => {
    setSheets(prev => ({
      ...prev,
      [rating]: prev[rating].map(problem => 
        problem.id === id ? { ...problem, solved: !problem.solved } : problem
      )
    }));
  };

  const toggleRevisited = (rating, id) => {
    setSheets(prev => ({
      ...prev,
      [rating]: prev[rating].map(problem => 
        problem.id === id ? { ...problem, revisited: !problem.revisited } : problem
      )
    }));
  };

  // Filter problems
  const filteredProblems = sheets[currentRating].filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRevisited = !showRevisited || problem.revisited;
    return matchesSearch && matchesRevisited;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Codeforces CP Sheet
      </h1>

      {/* Rating Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {ratings.map(rating => (
          <button
            key={rating}
            onClick={() => setCurrentRating(rating)}
            className={`px-4 py-2 rounded-lg ${
              currentRating === rating
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}
          >
            {rating} Rating
          </button>
        ))}
      </div>

      {/* Progress Bars and Leaderboard */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Current Rating Progress */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <div className="flex justify-between mb-2">
      <h3 className="font-medium">{currentRating} Rating Progress</h3>
      <span>{calculateProgress(currentRating).solved}/51</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ 
          width: `${(calculateProgress(currentRating).solved / 51) * 100}%` 
        }}
      ></div>
    </div>
  </div>
  
  {/* Overall Progress */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <div className="flex justify-between mb-2">
      <h3 className="font-medium">Overall Progress</h3>
      <span>{overallProgress().solved}/{overallProgress().total}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full"
        style={{ 
          width: `${(overallProgress().solved / overallProgress().total) * 100}%` 
        }}
      ></div>
    </div>
  </div>
  
  {/* Leaderboard Rank */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <div className="flex justify-between mb-2">
      <h3 className="font-medium">Your Rank</h3>
      <span>#{userRank}</span>
    </div>
    <div className="flex items-center">
      <div className="flex-1">
        <div className="text-sm text-gray-500 dark:text-gray-400">Solved: {overallProgress().solved}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Top {Math.round((userRank / totalUsers) * 100)}%</div>
      </div>
      {userRank <= 3 && (
        <div className="ml-4 text-2xl">
          {userRank === 1 && <span className="text-yellow-500">🥇</span>}
          {userRank === 2 && <span className="text-gray-400">🥈</span>}
          {userRank === 3 && <span className="text-amber-600">🥉</span>}
        </div>
      )}
    </div>
  </div>
</div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowRevisited(!showRevisited)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              showRevisited
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}
          >
            <FiStar />
            {showRevisited ? 'Hide Revisited' : 'Show Revisited'}
          </button>
          
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiStar />
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </button>
        </div>
      </div>

      {/* Leaderboard (conditional render) */}
      {showLeaderboard && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
          {/* Leaderboard content would go here */}
          <p>Leaderboard implementation would connect to your backend</p>
        </div>
      )}

      {/* Problems List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Problem</th>
              <th className="px-6 py-3 text-left">Solutions</th>
              <th className="px-6 py-3 text-left">Revisit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProblems.map(problem => (
              <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSolved(currentRating, problem.id)}
                    className={`p-2 rounded-full ${
                      problem.solved
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                    }`}
                  >
                    <FiCheck />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {problem.title}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <a
                      href={problem.solutions.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      title="Code Solution"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href={problem.solutions.youtube.hindi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full hover:bg-red-200 dark:hover:bg-red-900/30"
                      title="Hindi Solution"
                    >
                      <FiYoutube />
                    </a>
                    <a
                      href={problem.solutions.youtube.english}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full hover:bg-red-200 dark:hover:bg-red-900/30"
                      title="English Solution"
                    >
                      <FiYoutube />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRevisited(currentRating, problem.id)}
                    className={`p-2 rounded-full ${
                      problem.revisited
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
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

export default CPSheet;