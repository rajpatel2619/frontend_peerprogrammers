import React, { useState, useEffect } from 'react';
import { FiCheck, FiYoutube, FiGithub, FiStar, FiSearch, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API;
const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
const user = stored ? JSON.parse(stored) : null;
const USER_ID = user?.id;

const CPSheet = () => {
  const navigate = useNavigate();
  const [ladders, setLadders] = useState([]);
  const [sheets, setSheets] = useState({});
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRevisited, setShowRevisited] = useState(false);
  const [currentRank, setCurrentRank] = useState(null);


  useEffect(() => {
    async function fetchLadders() {
      try {
        const res = await fetch(`${API_BASE}/ladders/`);
        const data = await res.json();
        setLadders(data);
        setRatings(data.map(l => l.rating_range));
      } catch (err) {
        console.error("Failed to fetch ladders:", err);
      }
    }
    async function fetchLaddersAndRank() {
      try {
        // Step 1: Fetch ladder list
        const res = await fetch(`${API_BASE}/ladders/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setLadders(data);
        setRatings(data.map(l => l.rating_range));

        // Step 2: Fetch current user's rank
        if (USER_ID) {
          const rankRes = await fetch(
            `${API_BASE}/ladders/cp51/leaderboard/user/${USER_ID}/rank`
          );
          if (rankRes.ok) {
            const rankData = await rankRes.json();
            setCurrentRank(rankData.rank ?? "—"); // Use "—" if no rank
          } else {
            console.warn("Failed to fetch user rank");
          }
        }
      } catch (err) {
        console.error("Failed to fetch ladders or rank:", err);
      }
    }
    fetchLaddersAndRank();
    fetchLadders();
  }, []);

  useEffect(() => {
    if (!currentRating) return;
    const ladderObj = ladders.find(l => l.rating_range === currentRating);
    if (!ladderObj) return;

    fetch(`${API_BASE}/ladders/${ladderObj.id}/problems`)
      .then(res => res.json())
      .then(ladderData => {
        const allProblems = ladderData.problems.map(p => {
          let structuredSolutions = { youtube: { english: '', hindi: '' }, github: '' };
          if (Array.isArray(p.solutions)) {
            p.solutions.forEach(s => {
              if (s.platform.toLowerCase() === 'github') structuredSolutions.github = s.link;
              if (s.platform.toLowerCase() === 'youtube hindi') structuredSolutions.youtube.hindi = s.link;
              if (s.platform.toLowerCase() === 'youtube english') structuredSolutions.youtube.english = s.link;
            });
          }
          return { ...p, title: p.problem_name, link: p.problem_url, solved: false, revisited: false, solutions: structuredSolutions };
        });
        setSheets(prev => ({ ...prev, [currentRating]: allProblems }));

        fetch(`${API_BASE}/ladders/${ladderObj.id}/user/${USER_ID}/completed`)
          .then(res => res.json())
          .then(solvedData => {
            const solvedSet = new Set(solvedData?.map(p => p.id));
            setSheets(prev => ({
              ...prev,
              [currentRating]: (prev[currentRating] || []).map(p =>
                solvedSet.has(p.id) ? { ...p, solved: true } : p
              )
            }));
          });

        fetch(`${API_BASE}/ladders/${ladderObj.id}/user/${USER_ID}/revisited`)
          .then(res => res.json())
          .then(revisitData => {
            const revisitSet = new Set(revisitData?.map(p => p.id));
            setSheets(prev => ({
              ...prev,
              [currentRating]: (prev[currentRating] || []).map(p =>
                revisitSet.has(p.id) ? { ...p, revisited: true } : p
              )
            }));
          });
      })
      .catch(e => console.error("Error loading ladder problems:", e));
  }, [currentRating, ladders]);

  const calculateProgress = (rating) => {
    const problems = sheets[rating] || [];
    const solved = problems.filter(p => p.solved).length;
    return { solved, total: problems.length };
  };

  const overallProgress = () => {
    const allProblems = Object.values(sheets).filter(Boolean).flat();
    const solved = allProblems.filter(p => p && p.solved).length;
    return { solved, total: allProblems.length };
  };

  const toggleSolved = async (rating, id) => {
    setSheets(prev => ({
      ...prev,
      [rating]: prev[rating].map(problem =>
        problem.id === id ? { ...problem, solved: !problem.solved } : problem
      )
    }));
    const problem = sheets[rating].find(p => p.id === id);
    try {
      await fetch(
        `${API_BASE}/ladders/problems/${problem.id}/status?user_id=${USER_ID}&is_completed=${!problem.solved}`,
        { method: "POST" }
      );
    } catch (err) {
      console.error("Failed to update problem:", err);
    }
  };

  const toggleRevisited = async (rating, id) => {
    setSheets(prev => ({
      ...prev,
      [rating]: prev[rating].map(problem =>
        problem.id === id ? { ...problem, revisited: !problem.revisited } : problem
      )
    }));
    try {
      await fetch(`${API_BASE}/ladders/problems/${id}/user/${USER_ID}/revisit`, { method: "POST" });
    } catch (err) {
      console.error("Failed to update revisit:", err);
    }
  };

  const filteredProblems = (sheets[currentRating] || []).filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRevisited = !showRevisited || problem.revisited;
    return matchesSearch && matchesRevisited;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Codeforces CP Sheet</h1>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {ratings.map(rating => {
          let displayText = rating.replace(/Codeforces Rating\s*/gi, "").trim();
          displayText = displayText.replace(/(\d+)\s*<=\s*<=?\s*(\d+)/g, "$1 to $2");
          return (
            <button
              key={rating}
              onClick={() => setCurrentRating(rating)}
              className={`px-4 py-2 rounded-lg ${currentRating === rating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {displayText}
            </button>
          );
        })}
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <h3>{currentRating} Rating Progress</h3>
            <span>{calculateProgress(currentRating).solved}/{calculateProgress(currentRating).total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${(calculateProgress(currentRating).solved / (calculateProgress(currentRating).total || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <h3>Overall Progress</h3>
            <span>{overallProgress().solved}/{overallProgress().total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${(overallProgress().solved / (overallProgress().total || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowRevisited(!showRevisited)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showRevisited ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            <FiStar />
            {showRevisited ? 'Hide Revisited' : 'Show Revisited'}
          </button>
          <button
            onClick={() => navigate("/cp51_leaderboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white"
          >
            <FiAward /> Rank: #{currentRank}
          </button>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Problem</th>
              <th className="px-6 py-3">Solutions</th>
              <th className="px-6 py-3">Revisit</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map(problem => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSolved(currentRating, problem.id)}
                    className={`p-2 rounded-full ${problem.solved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <FiCheck />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {problem.title}
                  </a>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {problem.solutions.github && (
                    <a href={problem.solutions.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full">
                      <FiGithub />
                    </a>
                  )}
                  {problem.solutions.youtube.hindi && (
                    <a href={problem.solutions.youtube.hindi} target="_blank" rel="noopener noreferrer" className="p-2 bg-red-100 rounded-full">
                      <FiYoutube />
                    </a>
                  )}
                  {problem.solutions.youtube.english && (
                    <a href={problem.solutions.youtube.english} target="_blank" rel="noopener noreferrer" className="p-2 bg-red-100 rounded-full">
                      <FiYoutube />
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRevisited(currentRating, problem.id)}
                    className={`p-2 rounded-full ${problem.revisited ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}
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
