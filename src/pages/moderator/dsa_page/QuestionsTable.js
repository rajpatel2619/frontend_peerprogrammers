import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import DifficultyBadge from './DifficultyBadge';
import SearchBar from './SearchBar';

const QuestionsTable = ({
  loading,
  questions,
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete,
  setShowForm,
}) => {
  if (loading) {
    return <LoadingTable />;
  }

  if (questions.length === 0) {
    return <EmptyState setShowForm={setShowForm} searchTerm={searchTerm} />;
  }

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <TableHeader>Problem</TableHeader>
              <TableHeader>Difficulty</TableHeader>
              <TableHeader>Tags</TableHeader>
              <TableHeader>Sheet</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {questions.map((question) => (
              <QuestionRow
                key={question.id}
                question={question}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);

const QuestionRow = ({ question, handleEdit, handleDelete }) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">
          <FiExternalLink className="text-blue-600 dark:text-blue-300" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            <a
              href={question.problemLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {question.problemName}
            </a>
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <DifficultyBadge difficulty={question.difficulty} />
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-wrap gap-1">
        {question.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      {question.sheet && (
        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
          {question.sheet}
        </span>
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(question)}
          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-300"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => handleDelete(question.id)}
          className="text-red-600 hover:text-red-900 dark:hover:text-red-300"
        >
          <FiTrash2 />
        </button>
      </div>
    </td>
  </motion.tr>
);

const LoadingTable = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <TableHeader>Problem</TableHeader>
          <TableHeader>Difficulty</TableHeader>
          <TableHeader>Tags</TableHeader>
          <TableHeader>Sheet</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(3)].map((_, i) => (
          <tr key={i}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState = ({ setShowForm, searchTerm }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
    <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
      No problems found
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      {searchTerm ? "Try adjusting your search" : "Add your first problem"}
    </p>
    <button
      onClick={() => setShowForm(true)}
      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    >
      Add Problem
    </button>
  </div>
);

export default QuestionsTable;