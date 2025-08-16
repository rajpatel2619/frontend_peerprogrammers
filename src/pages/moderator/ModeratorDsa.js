import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import ModeratorNavbar from "./components/ModeratorSidebar";

import {
  fetchQuestions,
  fetchSheets,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  fetchAllTags,
  fetchAllCompanies,
  createTag,
  deleteTag,
  createCompany,
  deleteCompany,
  createSheet,
  deleteSheet,
} from "./dsa_page/services/dsaQuestionsAPI";
import Tabs from "./dsa_page/Tabs";
import QuestionsTable from "./dsa_page/QuestionsTable";
import TagsManager from "./dsa_page/TagsManager";
import CompaniesManager from "./dsa_page/CompaniesManager";
import SheetsManager from "./dsa_page/SheetsManager";
import QuestionForm from "./dsa_page/QuestionForm";

const DSAQuestionsPage = () => {
  // State for questions list and form
  const [questions, setQuestions] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState("problems");
  const [newTag, setNewTag] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSheet, setNewSheet] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    problemName: "",
    problemLink: "",
    difficulty: "Easy",
    tags: [],
    companies: [],
    sheets: [],
    sheetSearch: "",
    solution: "",
    githubLink: "",
    hindiSolutionLink: "",
    englishSolutionLink: "",
    tagSearch: "",
    companySearch: "",
  });

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [questionsData, sheetsData, tagsData, companiesData] = await Promise.all([
          fetchQuestions(),
          fetchSheets(),
          fetchAllTags(),
          fetchAllCompanies()
        ]);
        
        setQuestions(questionsData);
        setSheets(sheetsData);
        setAllTags(tagsData);
        setAllCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      let result;
      
      if (editMode && currentQuestion) {
        result = await updateQuestion(currentQuestion.id, formData);
        setQuestions(questions.map(q => 
          q.id === currentQuestion.id ? result : q
        ));
      } else {
        result = await createQuestion(formData);
        setQuestions([...questions, result]);
      }

      // Reset form on success
      setFormData({
        problemName: "",
        problemLink: "",
        difficulty: "Easy",
        tags: [],
        companies: [],
        sheets: [],
        sheetSearch: "",
        solution: "",
        githubLink: "",
        hindiSolutionLink: "",
        englishSolutionLink: "",
        tagSearch: "",
        companySearch: "",
      });
      setShowForm(false);
      setEditMode(false);
      setCurrentQuestion(null);
    } catch (error) {
      console.error("Error saving question:", error);
      setError(error.response?.data?.message || "Failed to save question. Please try again.");
    }
  };

  // Delete a question with API call
  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
      setError("Failed to delete question. Please try again.");
    }
  };

  // Add new tag with API call
  const handleAddNewTag = async () => {
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      try {
        await createTag(newTag.trim());
        setAllTags([...allTags, newTag.trim()]);
        setNewTag("");
      } catch (error) {
        console.error("Error creating tag:", error);
        setError("Failed to create tag. Please try again.");
      }
    }
  };

  // Delete tag with API call
  const handleDeleteTag = async (tagToDelete) => {
    try {
      await deleteTag(tagToDelete);
      setAllTags(allTags.filter(tag => tag !== tagToDelete));
      // Also remove this tag from all questions that have it
      setQuestions(questions.map(q => ({
        ...q,
        tags: q.tags.filter(tag => tag !== tagToDelete)
      })));
    } catch (error) {
      console.error("Error deleting tag:", error);
      setError("Failed to delete tag. Please try again.");
    }
  };

  // Add new company with API call
  const handleAddNewCompany = async () => {
    if (newCompany.trim() && !allCompanies.includes(newCompany.trim())) {
      try {
        await createCompany(newCompany.trim());
        setAllCompanies([...allCompanies, newCompany.trim()]);
        setNewCompany("");
      } catch (error) {
        console.error("Error creating company:", error);
        setError("Failed to create company. Please try again.");
      }
    }
  };

  // Delete company with API call
  const handleDeleteCompany = async (companyToDelete) => {
    try {
      await deleteCompany(companyToDelete);
      setAllCompanies(allCompanies.filter(company => company !== companyToDelete));
      // Also remove this company from all questions that have it
      setQuestions(questions.map(q => ({
        ...q,
        companies: q.companies.filter(company => company !== companyToDelete)
      })));
    } catch (error) {
      console.error("Error deleting company:", error);
      setError("Failed to delete company. Please try again.");
    }
  };

  // Add new sheet with API call
  const handleAddSheet = async (sheet) => {
    const trimmedSheet = sheet.trim();
    if (trimmedSheet && !sheets.includes(trimmedSheet)) {
      try {
        await createSheet(trimmedSheet);
        setSheets([...sheets, trimmedSheet]);
        setFormData({
          ...formData,
          sheets: [...(formData.sheets || []), trimmedSheet],
          sheetSearch: "",
        });
      } catch (error) {
        console.error("Error creating sheet:", error);
        setError("Failed to create sheet. Please try again.");
      }
    }
  };

  // Remove sheet with API call
  const handleRemoveSheet = async (sheetToRemove) => {
    try {
      await deleteSheet(sheetToRemove);
      setSheets(sheets.filter(sheet => sheet !== sheetToRemove));
      // Also remove this sheet from all questions that have it
      setQuestions(questions.map(q => ({
        ...q,
        sheet: q.sheet === sheetToRemove ? "" : q.sheet
      })));
    } catch (error) {
      console.error("Error deleting sheet:", error);
      setError("Failed to delete sheet. Please try again.");
    }
  };

  // Edit a question
  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setFormData({
      problemName: question.problemName,
      problemLink: question.problemLink,
      difficulty: question.difficulty,
      tags: [...question.tags],
      companies: [...question.companies],
      sheets: question.sheet ? [question.sheet] : [],
      solution: question.solution,
      githubLink: question.githubLink,
      hindiSolutionLink: question.hindiSolutionLink,
      englishSolutionLink: question.englishSolutionLink,
      tagSearch: "",
      companySearch: "",
      sheetSearch: "",
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) => {
    return (
      q.problemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.companies.some((company) => company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.sheet && q.sheet.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ModeratorNavbar />
        <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModeratorNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            DSA Questions Repository
          </h1>
          {activeTab === "problems" && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditMode(false);
                setCurrentQuestion(null);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <FiPlus className="mr-2" /> Add Problem
            </button>
          )}
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "problems" && (
          <QuestionsTable
            loading={loading}
            questions={filteredQuestions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setShowForm={setShowForm}
          />
        )}

        {activeTab === "tags" && (
          <TagsManager 
            allTags={allTags}
            newTag={newTag}
            setNewTag={setNewTag}
            handleAddNewTag={handleAddNewTag}
            handleDeleteTag={handleDeleteTag}
          />
        )}

        {activeTab === "companies" && (
          <CompaniesManager
            allCompanies={allCompanies}
            newCompany={newCompany}
            setNewCompany={setNewCompany}
            handleAddNewCompany={handleAddNewCompany}
            handleDeleteCompany={handleDeleteCompany}
          />
        )}

        {activeTab === "sheets" && (
          <SheetsManager
            sheets={sheets}
            newSheet={newSheet}
            setNewSheet={setNewSheet}
            handleAddSheet={handleAddSheet}
            handleRemoveSheet={handleRemoveSheet}
          />
        )}

        {showForm && (
          <QuestionForm
            editMode={editMode}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            setEditMode={setEditMode}
            setCurrentQuestion={setCurrentQuestion}
            allTags={allTags}
            allCompanies={allCompanies}
            sheets={sheets}
          />
        )}
      </div>
    </div>
  );
};

export default DSAQuestionsPage;