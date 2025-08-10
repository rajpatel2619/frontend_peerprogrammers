import React, { useState, useEffect } from 'react';

function CpLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [averageSolved, setAverageSolved] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to determine title with icons
  const getTitle = (solved) => {
    if (solved < 5) return "🥉 Bronze";
    if (solved < 15) return "🥈 Silver";
    if (solved < 30) return "🥇 Gold";
    if (solved < 50) return "🔘 Platinum";
    if (solved < 75) return "💎 Diamond";
    if (solved < 100) return "👑 Crown";
    if (solved < 150) return "🎯 Ace";
    return "🏆 Conqueror";
  };

  // Function to get color based on rank
  const getRankColor = (rank) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (rank === 2) return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    if (rank === 3) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    if (rank <= 10) return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    if (rank <= 50) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  };

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/ladders/cp51/leaderboard`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setLeaderboardData(data.leaderboard.map(user => ({
          id: user.rank,
          name: user.user,
          problemsSolved: user.problems_solved,
          rank: user.rank,
        })));
        setTotalUsers(data.total_users);
        setTotalProblems(data.total_problems);
        setAverageSolved(data.average_solved);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center p-4">Loading leaderboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        CP51 Leaderboard
      </h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Problems</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalProblems}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Solved</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{averageSolved}</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Coder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Problems Solved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRankColor(user.rank)}`}>
                      #{user.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {user.problemsSolved}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${(user.problemsSolved / totalProblems) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Math.round((user.problemsSolved / totalProblems) * 100)}% of total
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">
                      {getTitle(user.problemsSolved)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Updated: {new Date().toLocaleDateString()} • Total problems solved by all users: {leaderboardData.reduce((sum, u) => sum + u.problemsSolved, 0)}
      </div>
    </div>
  );
}

export default CpLeaderboard;
