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
  const [cfHandle, setCFHandle] = useState('');
  const [totalProgress, setTotalProgress] = useState({ solved: 0, total: 0 });


  // Connect CF handle
  const connectCodeforces = async () => {
    if (!cfHandle.trim()) return alert("Please enter your Codeforces username.");

    try {
      const form = new FormData();
      form.append("user_id", USER_ID);
      form.append("codeforces_handle", cfHandle);

      const res = await fetch(`${API_BASE}/ladders/profile`, { method: "POST", body: form });
      const result = await res.json();

      if (res.ok) {
        alert("Codeforces connected successfully!");
        setCFHandle(cfHandle); // Update UI immediately
      } else {
        alert(result.detail || "Failed to connect Codeforces");
      }
    } catch (err) {
      console.error("Error connecting to Codeforces:", err);
    }
  };

  // Fetch CP profile for CF handle
  useEffect(() => {
  if (!USER_ID) return;
  async function fetchCPProfile() {
    try {
      const res = await fetch(`${API_BASE}/ladders/profile/${USER_ID}`);
      if (!res.ok) throw new Error("Failed to fetch CP profile");
      const data = await res.json();
      if (data.codeforces_handle) setCFHandle(data.codeforces_handle);
      setTotalProgress(data.overall_progress); // direct from backend
    } catch (err) {
      console.error("Error fetching CP profile:", err);
    }
  }
  fetchCPProfile();
}, [USER_ID]);


  // Fetch ladders & rank
  useEffect(() => {
    async function fetchLaddersAndRank() {
      try {
        const res = await fetch(`${API_BASE}/ladders/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setLadders(data);
        setRatings(data.map(l => l.rating_range));

        if (USER_ID) {
          const rankRes = await fetch(`${API_BASE}/ladders/cp51/leaderboard/user/${USER_ID}/rank`);
          if (rankRes.ok) {
            const rankData = await rankRes.json();
            setCurrentRank(rankData.rank ?? "—");
          }
        }
      } catch (err) {
        console.error("Failed to fetch ladders or rank:", err);
      }
    }
    fetchLaddersAndRank();
  }, [USER_ID]);

  // Fetch problems for selected ladder
  useEffect(() => {
    if (!currentRating) return;
    const ladderObj = ladders.find(l => l.rating_range === currentRating);
    if (!ladderObj) return;

    const fetchData = async () => {
      try {
        const ladderRes = await fetch(`${API_BASE}/ladders/${ladderObj.id}/problems`);
        const ladderData = await ladderRes.json();

        let allProblems = ladderData.problems.map(p => {
          let structuredSolutions = { youtube: { english: '', hindi: '' }, github: '' };
          p.solutions?.forEach(s => {
            if (s?.platform === 'github') structuredSolutions.github = s.link;
            if (s?.platform === 'youtube hindi') structuredSolutions.youtube.hindi = s.link;
            if (s?.platform === 'youtube english') structuredSolutions.youtube.english = s.link;
          });

          return {
            ...p,
            title: p.problem_name,
            link: p.problem_url,
            solved: false,
            revisited: false,
            solutions: structuredSolutions
          };
        });

        const [solvedRes, revisitRes] = await Promise.all([
          fetch(`${API_BASE}/ladders/${ladderObj.id}/user/${USER_ID}/completed`),
          fetch(`${API_BASE}/ladders/${ladderObj.id}/user/${USER_ID}/revisited`)
        ]);

        const solvedData = await solvedRes.json();
        const revisitData = await revisitRes.json();

        const solvedSet = new Set((solvedData ?? []).map(p => p.id));
        const revisitSet = new Set((revisitData ?? []).map(p => p.id));

        allProblems = allProblems.map(p => ({
          ...p,
          solved: solvedSet.has(p.id),
          revisited: revisitSet.has(p.id)
        }));

        setSheets(prev => ({ ...prev, [currentRating]: allProblems }));
      } catch (e) {
        console.error("Error loading ladder problems:", e);
      }
    };

    fetchData();
  }, [currentRating, ladders]);

  // Progress calculation
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

  // // Mark as solved
  // const toggleSolved = async (rating, id) => {
  //   setSheets(prev => {
  //     const updated = prev[rating].map(problem =>
  //       problem.id === id ? { ...problem, solved: !problem.solved } : problem
  //     );
  //     return { ...prev, [rating]: updated };
  //   });

  //   const problem = sheets[rating]?.find(p => p.id === id);
  //   const newStatus = !problem?.solved;
  //   try {
  //     await fetch(
  //       `${API_BASE}/ladders/problems/${id}/status?user_id=${USER_ID}&is_completed=${newStatus}`,
  //       { method: "POST" }
  //     );
  //   } catch (err) {
  //     console.error("Failed to update problem:", err);
  //   }
  // };

  // Mark as revisited
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

  // Search & filters
  const filteredProblems = (sheets[currentRating] || []).filter(problem => {
    const matchesSearch = problem?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRevisited = !showRevisited || problem.revisited;
    return matchesSearch && matchesRevisited;
  });

  // Sync with CF
  const handleSync = async () => {
    if (!currentRating) return alert("Please select a rating ladder first.");
    const ladderObj = ladders.find(l => l.rating_range === currentRating);
    if (!ladderObj) return alert("Invalid ladder selection.");

    try {
      const res = await fetch(`${API_BASE}/ladders/codeforces/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, ladder_id: ladderObj.id })
      });
      if (!res.ok) throw new Error(`Failed to sync: ${res.status}`);
      console.log("Sync successful");
      setCurrentRating(currentRating); // Re-trigger load
    } catch (err) {
      console.error("Error syncing Codeforces:", err);
    }
  };

  const progress = currentRating ? calculateProgress(currentRating) : { solved: 0, total: 0 };
  // const totalProgress = overallProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Codeforces CP Sheet</h1>

      {/* Ladder Buttons */}
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
            <h3>{currentRating || "Select Ladder"} Rating Progress</h3>
            <span>{progress.solved}/{progress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${(progress.solved / (progress.total || 1)) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <h3>Overall Progress</h3>
            <span>{totalProgress.solved}/{totalProgress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full"
              style={{ width: `${(totalProgress.solved / (totalProgress.total || 1)) * 100}%` }} />
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

        <div className="flex gap-2 items-center justify-center">
          {cfHandle ? (
            <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold flex items-center gap-2">
              Codeforces: {cfHandle}
              <button
                onClick={handleSync}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Sync
              </button>
            </span>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Codeforces handle"
                value={cfHandle}
                onChange={e => setCFHandle(e.target.value)}
                className="px-4 py-2 rounded-lg border"
                style={{ minWidth: '220px' }}
              />
              <button
                onClick={connectCodeforces}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Connect to Codeforces
              </button>
            </>
          )}
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
                    disabled
                    // onClick={() => toggleSolved(currentRating, problem.id)}
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
