import API from './api';

export const fetchQuestions = async () => {
  try {
    const response = await API.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const fetchSheets = async () => {
  try {
    const response = await API.get('/sheets');
    return response.data;
  } catch (error) {
    console.error('Error fetching sheets:', error);
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await API.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const updateQuestion = async (id, questionData) => {
  try {
    const response = await API.put(`/questions/${id}`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await API.delete(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

export const fetchAllTags = async () => {
  try {
    const response = await API.get('/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const fetchAllCompanies = async () => {
  try {
    const response = await API.get('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await API.post('/tags', { name: tagData });
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

export const deleteTag = async (tagName) => {
  try {
    const response = await API.delete(`/tags/${tagName}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await API.post('/companies', { name: companyData });
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const deleteCompany = async (companyName) => {
  try {
    const response = await API.delete(`/companies/${companyName}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};

export const createSheet = async (sheetData) => {
  try {
    const response = await API.post('/sheets', { name: sheetData });
    return response.data;
  } catch (error) {
    console.error('Error creating sheet:', error);
    throw error;
  }
};

export const deleteSheet = async (sheetName) => {
  try {
    const response = await API.delete(`/sheets/${sheetName}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sheet:', error);
    throw error;
  }
};