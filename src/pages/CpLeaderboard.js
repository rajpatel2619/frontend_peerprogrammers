import React from 'react';

function CpLeaderboard() {
  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: "Alice", problemsSolved: 185, rank: 1 },
    { id: 2, name: "Bob", problemsSolved: 142, rank: 2 },
    { id: 3, name: "Charlie", problemsSolved: 128, rank: 3 },
    { id: 4, name: "David", problemsSolved: 95, rank: 4 },
    { id: 5, name: "Eve", problemsSolved: 78, rank: 5 },
    { id: 6, name: "Frank", problemsSolved: 65, rank: 6 },
    { id: 7, name: "Grace", problemsSolved: 52, rank: 7 },
    { id: 8, name: "Hank", problemsSolved: 38, rank: 8 },
    { id: 9, name: "Ivy", problemsSolved: 25, rank: 9 },
    { id: 10, name: "Jack", problemsSolved: 12, rank: 10 },
  ];

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        CP51 Leaderboard
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
                  <div className="text-sm font-semibold">
                    {getTitle(user.problemsSolved)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

export default CpLeaderboard;