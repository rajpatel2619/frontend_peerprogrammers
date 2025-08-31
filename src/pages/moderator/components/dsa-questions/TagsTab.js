import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
const API = process.env.REACT_APP_API;
const TagsTab = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);

  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API}/problems/all/tags`);
        const data = await response.json();
        console.log(data);
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);


// Add new tag
const handleAddTag = async () => {
  if (!newTag) return;
  try {
    const url = `${API}/problems/create/tag?tag_name=${encodeURIComponent(newTag)}&user_id=${user.id}`;
    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return;
    }

    await response.json(); // you can ignore addedTag if you’re refreshing

    setTags([...tags, { name: newTag }]); // optimistic update

    setNewTag(""); // clear input
  } catch (error) {
    console.error("Error adding tag:", error);
  }
};

  // Delete tag
  const handleDeleteTag = async (tagId) => {
    try {
      await fetch(`${API}/problems/delete/tag/${tagId}`, {
        method: "DELETE",
      });
      setTags(tags.filter((tag) => tag.id !== tagId));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add new tag"
          className="flex-grow px-4 py-2 border rounded-l-lg"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
        />
        <button
          onClick={handleAddTag}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg"
        >
          Add Tag
        </button>
      </div>

      {loading ? (
        <div>Loading tags...</div>
      ) : tags.length > 0 ? (
        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              {/* show tag name */}
              <span>{tag.name}</span>

              {/* delete button */}
              <button
                onClick={() => handleDeleteTag(tag.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">No tags available</div>
      )}
    </div>
  );
};

export default TagsTab;
