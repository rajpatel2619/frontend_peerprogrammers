import React from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DifficultyBadge from './DifficultyBadge';

const QuestionForm = ({
  editMode,
  formData,
  setFormData,
  handleSubmit,
  setShowForm,
  setEditMode,
  setCurrentQuestion,
  allTags,
  allCompanies,
  sheets,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
        tagSearch: "",
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAddCompany = (company) => {
    const trimmedCompany = company.trim();
    if (trimmedCompany && !formData.companies.includes(trimmedCompany)) {
      setFormData({
        ...formData,
        companies: [...formData.companies, trimmedCompany],
        companySearch: "",
      });
    }
  };

  const handleRemoveCompany = (companyToRemove) => {
    setFormData({
      ...formData,
      companies: formData.companies.filter((company) => company !== companyToRemove),
    });
  };

  const handleAddSheet = (sheet) => {
    const trimmedSheet = sheet.trim();
    if (trimmedSheet && !formData.sheets?.includes(trimmedSheet)) {
      setFormData({
        ...formData,
        sheets: [...(formData.sheets || []), trimmedSheet],
        sheetSearch: "",
      });
    }
  };

  const handleRemoveSheet = (sheetToRemove) => {
    setFormData({
      ...formData,
      sheets: formData.sheets?.filter((sheet) => sheet !== sheetToRemove),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {editMode ? "Edit Problem" : "Add New Problem"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditMode(false);
                setCurrentQuestion(null);
              }}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Form fields */}
              <FormField
                label="Problem Name*"
                name="problemName"
                value={formData.problemName}
                onChange={handleInputChange}
                required
              />
              
              <FormField
                label="Problem Link*"
                name="problemLink"
                value={formData.problemLink}
                onChange={handleInputChange}
                type="url"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty*
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <TagInput 
                formData={formData}
                setFormData={setFormData}
                allTags={allTags}
                handleAddTag={handleAddTag}
                handleRemoveTag={handleRemoveTag}
              />
              
              <CompanyInput
                formData={formData}
                setFormData={setFormData}
                allCompanies={allCompanies}
                handleAddCompany={handleAddCompany}
                handleRemoveCompany={handleRemoveCompany}
              />
              
              <SheetInput
                formData={formData}
                setFormData={setFormData}
                sheets={sheets}
                handleAddSheet={handleAddSheet}
                handleRemoveSheet={handleRemoveSheet}
              />
              
              <FormField
                label="GitHub Solution Link"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                type="url"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditMode(false);
                  setCurrentQuestion(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editMode ? "Update Problem" : "Add Problem"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
      required={required}
    />
  </div>
);

const TagInput = ({ formData, setFormData, allTags, handleAddTag, handleRemoveTag }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Tags
    </label>
    <div className="relative">
      <input
        type="text"
        name="tagSearch"
        value={formData.tagSearch}
        onChange={(e) => setFormData({...formData, tagSearch: e.target.value})}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Search or add tags"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (formData.tagSearch.trim()) {
              handleAddTag(formData.tagSearch);
            }
          }
        }}
      />
      {formData.tagSearch && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-auto">
          {allTags
            .filter(
              (tag) =>
                tag.toLowerCase().includes(formData.tagSearch.toLowerCase()) &&
                !formData.tags.includes(tag)
            )
            .map((tag) => (
              <div
                key={tag}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </div>
            ))}
          {formData.tagSearch.trim() && !allTags.includes(formData.tagSearch.trim()) && (
            <div
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleAddTag(formData.tagSearch)}
            >
              Add "{formData.tagSearch}"
            </div>
          )}
        </div>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {formData.tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  </div>
);

const CompanyInput = ({ formData, setFormData, allCompanies, handleAddCompany, handleRemoveCompany }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Companies
    </label>
    <div className="relative">
      <input
        type="text"
        name="companySearch"
        value={formData.companySearch}
        onChange={(e) => setFormData({...formData, companySearch: e.target.value})}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Search or add companies"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (formData.companySearch.trim()) {
              handleAddCompany(formData.companySearch);
            }
          }
        }}
      />
      {formData.companySearch && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-auto">
          {allCompanies
            .filter(
              (company) =>
                company.toLowerCase().includes(formData.companySearch.toLowerCase()) &&
                !formData.companies.includes(company)
            )
            .map((company) => (
              <div
                key={company}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddCompany(company)}
              >
                {company}
              </div>
            ))}
          {formData.companySearch.trim() &&
            !allCompanies.includes(formData.companySearch.trim()) && (
              <div
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddCompany(formData.companySearch)}
              >
                Add "{formData.companySearch}"
              </div>
            )}
        </div>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {formData.companies.map((company, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
        >
          {company}
          <button
            type="button"
            onClick={() => handleRemoveCompany(company)}
            className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  </div>
);

const SheetInput = ({ formData, setFormData, sheets, handleAddSheet, handleRemoveSheet }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Sheets
    </label>
    <div className="relative">
      <input
        type="text"
        name="sheetSearch"
        value={formData.sheetSearch || ""}
        onChange={(e) => setFormData({...formData, sheetSearch: e.target.value})}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Search or add sheets"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (formData.sheetSearch?.trim()) {
              handleAddSheet(formData.sheetSearch);
            }
          }
        }}
      />
      {formData.sheetSearch && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-auto">
          {sheets
            .filter(
              (sheet) =>
                sheet.toLowerCase().includes(formData.sheetSearch.toLowerCase()) &&
                !formData.sheets?.includes(sheet)
            )
            .map((sheet) => (
              <div
                key={sheet}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddSheet(sheet)}
              >
                {sheet}
              </div>
            ))}
          {formData.sheetSearch.trim() &&
            !sheets.includes(formData.sheetSearch.trim()) && (
              <div
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddSheet(formData.sheetSearch)}
              >
                Add "{formData.sheetSearch}"
              </div>
            )}
        </div>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {formData.sheets?.map((sheet, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
        >
          {sheet}
          <button
            type="button"
            onClick={() => handleRemoveSheet(sheet)}
            className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  </div>
);

export default QuestionForm;