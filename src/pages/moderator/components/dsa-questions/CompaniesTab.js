import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
const API = process.env.REACT_APP_API;
const CompaniesTab = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch companies
  // Fetch companies
useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${API}/problems/list`);
      const data = await response.json();
      
      // Ensure companies is always an array
      if (Array.isArray(data)) {
        setCompanies(data);
      } else if (Array.isArray(data.companies)) {
        setCompanies(data.companies);
      } else {
        setCompanies([]); // fallback
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCompanies();
}, []);


  // Add new company
  const handleAddCompany = async () => {
  if (!newCompany.trim()) return;

  try {
    const url = `${API}/problems/create?company_name=${encodeURIComponent(newCompany.trim())}`;
    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return;
    }

    const data = await response.json();
    console.log("API returned:", data);

    if (data.company) {
      setCompanies(prev => [...prev, data.company]); // safe now
    }

    setNewCompany("");
  } catch (error) {
    console.error("Error adding company:", error);
  }
};


  // Delete company
  const handleDeleteCompany = async (company_id) => {
    try {
      await fetch(`${API}/problems/${company_id}`, {
        method: "DELETE",
      });
      setCompanies(prev => prev.filter((company) => company.id !== company_id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add new company"
          className="flex-grow px-4 py-2 border rounded-l-lg"
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCompany()}
        />
        <button
          onClick={handleAddCompany}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg"
        >
          Add Company
        </button>
      </div>

      {loading ? (
        <div>Loading companies...</div>
      ) : companies.length > 0 ? (
        <div className="space-y-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span>{company.name}</span>
              <button
                onClick={() => handleDeleteCompany(company.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No companies available
        </div>
      )}
    </div>
  );
};

export default CompaniesTab;
