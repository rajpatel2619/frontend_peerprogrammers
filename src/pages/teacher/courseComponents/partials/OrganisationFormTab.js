import React from "react";

function OrganisationFormTab() {
  return (
    <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Organisation Details</h2>
      <input
        type="text"
        placeholder="Organisation Name"
        className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-600"
      />
      <input
        type="email"
        placeholder="Official Email"
        className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-600"
      />
    </div>
  );
}

export default OrganisationFormTab;
