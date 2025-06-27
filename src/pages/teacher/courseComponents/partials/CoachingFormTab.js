import React from "react";

function CoachingFormTab() {
  return (
    <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Coaching Details</h2>
      <input
        type="text"
        placeholder="Institute Name"
        className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-600"
      />
      <input
        type="number"
        placeholder="Years of Experience"
        className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-600"
      />
    </div>
  );
}

export default CoachingFormTab;
