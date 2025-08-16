// QuestionFormModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE = (process.env.REACT_APP_API || '').replace(/\/+$/, '');

/** Dev-only prefill helper: set to true to prefill form for faster demos */
const DEV_PREFILL = false;

const emptyForm = {
  title: '',
  link: '',
  difficulty: 'Easy',
  rating: '',
  solution: '',
  githubLink: '',
  hindiSolution: '',
  englishSolution: '',
  isPremium: false,
};

const DEV_DEFAULTS = {
  title: 'Two Sum',
  link: 'https://leetcode.com/problems/two-sum/',
  difficulty: 'Easy',
  rating: '500',
  solution: 'Use a hash map to track complements and indices; O(n) time.',
  githubLink: '',
  hindiSolution: '',
  englishSolution: '',
  isPremium: false,
};

const normalizeUrl = (v) => (typeof v === 'string' ? v.trim() : '');
const isValidUrl = (v) => {
  if (!v) return true; // optional fields allowed
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};

/** fetch helper */
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

const QuestionFormModal = ({ editMode, currentItem, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const firstFieldRef = useRef(null);

  useEffect(() => {
    // autofocus first field
    firstFieldRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (editMode && currentItem) {
      setForm({
        title: currentItem.title || '',
        link: currentItem.link || '',
        difficulty: currentItem.difficulty || 'Easy',
        rating:
          currentItem.rating !== null && currentItem.rating !== undefined
            ? String(currentItem.rating)
            : '',
        solution: currentItem.solution || '',
        githubLink: currentItem.githubLink || '',
        hindiSolution: currentItem.hindiSolution || '',
        englishSolution: currentItem.englishSolution || '',
        isPremium: Boolean(currentItem.isPremium),
      });
    } else {
      setForm(DEV_PREFILL ? DEV_DEFAULTS : emptyForm);
    }
  }, [editMode, currentItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getUserId = () => {
    try {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : null;
      return user?.id ?? null;
    } catch {
      return null;
    }
  };

  const validate = () => {
    const errors = [];
    if (!form.title.trim()) errors.push('Title is required.');
    if (!form.link.trim()) errors.push('Problem link is required.');
    if (!isValidUrl(form.link)) errors.push('Problem link must be a valid URL.');
    if (form.githubLink && !isValidUrl(form.githubLink)) errors.push('GitHub link is invalid.');
    if (form.hindiSolution && !isValidUrl(form.hindiSolution)) errors.push('Hindi link is invalid.');
    if (form.englishSolution && !isValidUrl(form.englishSolution))
      errors.push('English link is invalid.');

    const ratingStr = String(form.rating ?? '').trim();
    if (!ratingStr) {
      errors.push('Rating is required.');
    } else {
      const r = Number(ratingStr);
      if (!Number.isFinite(r) || r < 0) errors.push('Rating must be a non-negative number.');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_BASE) {
      setErrorMsg('API base URL is not configured (REACT_APP_API).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const errs = validate();
    if (errs.length) {
      setErrorMsg(errs.join(' '));
      setSubmitting(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('problem_link', normalizeUrl(form.link));

      if (form.difficulty != null) fd.append('difficulty', String(form.difficulty).trim());

      const rating = parseInt(String(form.rating).trim(), 10);
      if (!Number.isNaN(rating)) fd.append('rating', String(rating));

      if (form.solution != null) fd.append('description', form.solution);
      if (form.githubLink) fd.append('github_solution_link', normalizeUrl(form.githubLink));
      if (form.hindiSolution != null) fd.append('hindi_solution_link', normalizeUrl(form.hindiSolution));
      if (form.englishSolution != null)
        fd.append('english_solution_link', normalizeUrl(form.englishSolution));

      const userId = getUserId();
      if (userId != null) fd.append('created_by', String(userId));

      if (typeof form.isPremium !== 'undefined') {
        fd.append('is_premium', String(Boolean(form.isPremium)));
      }

      const method = editMode ? 'PUT' : 'POST';
      const url = editMode
        ? `${API_BASE}/cp51/problems/${currentItem?.id}`
        : `${API_BASE}/cp51/problems`;

      await fetchJson(url, { method, body: fd });

      setSuccessMsg(editMode ? 'Problem updated successfully' : 'Problem created successfully');

      // Close after short delay and notify parent to refresh
      setTimeout(() => {
        onClose?.(true);
      }, 350);
    } catch (err) {
      setErrorMsg(err?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.(false);
  };

  const onEscape = (e) => {
    if (e.key === 'Escape') onClose?.(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onMouseDown={handleBackdrop}
      onKeyDown={onEscape}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {editMode ? 'Edit Question' : 'Add New Question'}
            </h2>
            <button
              onClick={() => onClose?.(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              type="button"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 text-red-700 bg-red-50 dark:bg-red-900/30 p-3 rounded">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="mb-4 text-green-700 bg-green-50 dark:bg-green-900/30 p-3 rounded">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title*
                </label>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  maxLength={160}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Problem Link*
                </label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  inputMode="url"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty*
                  </label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating*
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    min={0}
                    step="1"
                    placeholder="e.g., 800"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Solution Description
                </label>
                <textarea
                  name="solution"
                  value={form.solution}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Optional explanation/approach"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub Solution Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  inputMode="url"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hindi Solution Link
                  </label>
                  <input
                    type="url"
                    name="hindiSolution"
                    value={form.hindiSolution}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    inputMode="url"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    English Solution Link
                  </label>
                  <input
                    type="url"
                    name="englishSolution"
                    value={form.englishSolution}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    inputMode="url"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="isPremium"
                  type="checkbox"
                  name="isPremium"
                  checked={Boolean(form.isPremium)}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="isPremium" className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as premium
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => onClose?.(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : editMode ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionFormModal;
