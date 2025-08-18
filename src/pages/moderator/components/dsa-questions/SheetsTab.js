import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
const API = process.env.REACT_APP_API;
const SheetsTab = () => {
  const [sheets, setSheets] = useState([]);
  const [newSheet, setNewSheet] = useState('');
  const [loading, setLoading] = useState(true);


  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // Fetch sheets
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch(`${API}/problems/all_sheets`);
        const data = await response.json();
        setSheets(data);
      } catch (error) {
        console.error('Error fetching sheets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  const handleAddSheet = async () => {
    if (!newSheet) return;
  
    try {
      const createdBy = user?.id || 1; // fallback to 1 if user not found
  
      // prepare form data since backend expects Form(...)
      const formData = new FormData();
      formData.append("title", newSheet);
      formData.append("created_by", createdBy);
  
      const response = await fetch(`${API}/problems/create_sheet`, {
        method: "POST",
        body: formData, // sending formData instead of JSON
      });
  
      const data = await response.json();
      console.log("API returned:", data);
  
      if (!response.ok) {
        console.error("Error response:", data);
        return;
      }
  
      if (data.sheet_id) {
        setSheets((prevSheets) => [
          ...(prevSheets || []),
          { id: data.sheet_id, title: data.title },
        ]);
      }
  
      setNewSheet("");
    } catch (error) {
      console.error("Error adding sheet:", error);
    }
  };
  

  // Delete sheet
  const handleDeleteSheet = async (id) => {
    try {
      await fetch(`${API}/problems/sheets/${id}`, {
        method: 'DELETE',
      });
      setSheets(sheets.filter(sheet => sheet.id !== id));
    } catch (error) {
      console.error('Error deleting sheet:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add new sheet"
          className="flex-grow px-4 py-2 border rounded-l-lg"
          value={newSheet}
          onChange={(e) => setNewSheet(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSheet()}
        />
        <button
          onClick={handleAddSheet}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg"
        >
          Add Sheet
        </button>
      </div>
      
      {loading ? (
        <div>Loading sheets...</div>
      ) : sheets.length > 0 ? (
        <div className="space-y-2">
          {sheets.map((sheet) => (
            <div key={sheet.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{sheet.title}</span>
              <button
                onClick={() => handleDeleteSheet(sheet.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No sheets available
        </div>
      )}
    </div>
  );
};

export default SheetsTab;