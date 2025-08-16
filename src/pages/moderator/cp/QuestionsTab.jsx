// QuestionsTab.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionFormModal from './QuestionFormModal.jsx';

/** Utils */
const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'Hard':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const API_BASE = (process.env.REACT_APP_API || '').replace(/\/+$/, '');

/** @typedef {{
 *  id: number|string,
 *  title: string,
 *  problem_link?: string,
 *  difficulty?: string,
 *  rating?: number|null,
 *  tags?: string[]|null,
 *  github_solution_link?: string|null,
 *  hindi_solution_link?: string|null,
 *  english_solution_link?: string|null,
 * }} ApiProblem
 */

/** @typedef {{
 *  id: number|string,
 *  title: string,
 *  link: string,
 *  difficulty: string,
 *  rating: string|number,
 *  tags: string[],
 *  githubLink: string,
 *  hindiSolution: string,
 *  englishSolution: string,
 * }} UiProblem
 */

const mapApiItemToUi = (i) =>
({
    id: i.id,
    title: i.title,
    link: i.problem_link || '',
    difficulty: i.difficulty || 'Unknown',
    rating: i.rating ?? '',
    tags: Array.isArray(i.tags) ? i.tags.filter(Boolean) : [],
    githubLink: i.github_solution_link || '',
    hindiSolution: i.hindi_solution_link || '',
    englishSolution: i.english_solution_link || '',
    isPremium: i.is_premium,
});

/** Fetch helper with timeout + JSON fallbacks */
const fetchJson = async (input, init = {}, { timeoutMs = 15000 } = {}) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(input, { ...init, signal: controller.signal });
        const contentType = res.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        const data = isJson ? await res.json().catch(() => ({})) : await res.text();

        if (!res.ok) {
            const message =
                isJson && data && typeof data === 'object' && data.detail
                    ? data.detail
                    : res.statusText || 'Request failed';
            const error = new Error(message);
            error.status = res.status;
            error.payload = data;
            throw error;
        }

        return isJson ? data : JSON.parse(data);
    } finally {
        clearTimeout(id);
    }
};

const QuestionsTab = () => {
    const [cpQuestions, setCpQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const abortRef = useRef(null);
    const [filterDifficulty, setFilterDifficulty] = useState('All');
    const [filterPremium, setFilterPremium] = useState('All');
    const [filterRating, setFilterRating] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const problemsEndpoint = useMemo(() => `${API_BASE}/cp51/problems`, []);

    const filteredQuestions = useMemo(() => {
        let filtered = cpQuestions;

        // Filter by Search Term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(question =>
                question.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                question.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        // Filter by Difficulty
        if (filterDifficulty !== 'All') {
            filtered = filtered.filter(question => question.difficulty === filterDifficulty);
        }

        // Filter by Premium Status
        if (filterPremium !== 'All') {
            const isPremium = filterPremium === 'Premium';
            filtered = filtered.filter(question => question.isPremium === isPremium);
        }

        // Filter by Rating (assuming rating is a number and you want to filter based on a range or comparison)
        // This example assumes you want to filter by a minimum rating. Adjust as needed.
        if (filterRating !== 'All') {
            filtered = filtered.filter(question => question.rating >= parseInt(filterRating));
        }

        return filtered;
    }, [cpQuestions, searchTerm, filterDifficulty, filterPremium, filterRating]);


    const loadProblems = useCallback(async () => {
        if (!API_BASE) {
            setLoadError('API base URL is not configured (REACT_APP_API).');
            return;
        }
        setLoading(true);
        setLoadError('');
        abortRef.current?.abort?.();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const data = await fetchJson(problemsEndpoint, { method: 'GET', signal: controller.signal });
            const items = Array.isArray(data) ? data : [];
            setCpQuestions(items.map(mapApiItemToUi));
            console.log(items)
        } catch (err) {
            if (err.name === 'AbortError') return;
            setLoadError(err?.message || 'Failed to fetch problems');
        } finally {
            setLoading(false);
        }
    }, [problemsEndpoint]);

    useEffect(() => {
        loadProblems();
        return () => {
            abortRef.current?.abort?.();
        };
    }, [loadProblems]);

    const handleOpenAdd = () => {
        setShowModal(true);
        setEditMode(false);
        setCurrentItem(null);
    };

    const handleEditQuestion = (question) => {
        setCurrentItem(question);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDeleteQuestion = async (id) => {
        if (!id) return;
        // Optional: confirmation
        // if (!window.confirm('Delete this problem?')) return;

        // Optimistic update
        const prev = cpQuestions;
        setCpQuestions((p) => p.filter((q) => q.id !== id));

        try {
            await fetchJson(`${problemsEndpoint}/${id}`, { method: 'DELETE' });
            // Optional: show toast
        } catch (err) {
            // Revert on error
            setCpQuestions(prev);
            // Optional: toast with err.message
        }
    };

    const handleModalClose = (changed) => {
        setShowModal(false);
        setEditMode(false);
        setCurrentItem(null);
        if (changed) {
            // Refresh list when item created/updated
            loadProblems();
        }
    };

    return (
        <div>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Competitive Programming Questions
                    </h2>
                    <button
                        onClick={handleOpenAdd}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <FiPlus className="mr-2" /> Add Question
                    </button>
                </div>

                <div className="mb-4 flex flex-wrap gap-4 items-center">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by title or tags..."
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Difficulty Filter */}
                    <select
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    {/* Premium Filter */}
                    <select
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={filterPremium}
                        onChange={(e) => setFilterPremium(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Premium">Premium</option>
                        <option value="Free">Free</option>
                    </select>

                    {/* Rating Filter (example: filter for minimum rating) */}
                    <select
                        className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                    >
                        <option value="All">All Ratings</option>
                        <option value="800">800+</option>
                        <option value="1200">1200+</option>
                        <option value="1600">1600+</option>
                        <option value="2000">2000+</option>
                    </select>
                </div>

            </div>


            {loading && (
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">Loading problems...</div>
            )}
            {loadError && <div className="mb-4 text-sm text-red-600">{loadError}</div>}

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium">Title</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium">Description</th> */}

                            <th className="px-6 py-3 text-left text-xs font-medium">Difficulty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">Solutions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">Premium</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence initial={false}>
                            {filteredQuestions.map((question) => ( // Change cpQuestions to filteredQuestions
                                <motion.tr
                                    key={question.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {question.link ? (
                                            <a
                                                href={question.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline flex items-center dark:text-blue-400"
                                                title={question.title}
                                            >
                                                <FiExternalLink className="mr-1" /> {question.title}
                                            </a>
                                        ) : (
                                            <span className="text-gray-700 dark:text-gray-200">{question.title}</span>
                                        )}
                                    </td>

                                    {/* 
                                    <td className="px-6 py-4 max-w-xs">
                                        <div className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
                                            {question.description ? question.description : '—'}
                                        </div>
                                    </td> */}

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(
                                                question.difficulty
                                            )}`}
                                        >
                                            {question.difficulty}
                                        </span>
                                    </td>


                                    <td className="px-6 py-4">{question.rating}</td>


                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {question.githubLink && (
                                                <a
                                                    href={question.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                                    title="GitHub solution"
                                                >
                                                    <FiGithub />
                                                </a>
                                            )}
                                            {question.hindiSolution && (
                                                <a
                                                    href={question.hindiSolution}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                                    title="Hindi solution"
                                                >
                                                    हिंदी
                                                </a>
                                            )}
                                            {question.englishSolution && (
                                                <a
                                                    href={question.englishSolution}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                                    title="English solution"
                                                >
                                                    English
                                                </a>
                                            )}
                                        </div>
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${question.isPremium
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                            title={question.isPremium ? 'Premium' : 'Free'}
                                        >
                                            {question.isPremium ? 'Premium' : 'Free'}
                                        </span>
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
                                        <button
                                            onClick={() => handleEditQuestion(question)}
                                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none"
                                            aria-label="Edit question"
                                            title="Edit"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuestion(question.id)}
                                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400 focus:outline-none"
                                            aria-label="Delete question"
                                            title="Delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>


                                </motion.tr>
                            ))}
                            {!loading && !loadError && filteredQuestions.length === 0 && ( // Change cpQuestions.length to filteredQuestions.length
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        No problems found.
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {showModal && (
                    <QuestionFormModal
                        key="question-form-modal"
                        editMode={editMode}
                        currentItem={currentItem}
                        onClose={handleModalClose}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestionsTab;
