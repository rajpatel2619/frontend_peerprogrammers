import React from "react";

function OrganisationFormTab({
  orgName,
  setOrgName,
  pocName,
  setPocName,
  pocEmail,
  setPocEmail,
  pocContact,
  setPocContact,
}) {
  return (
    <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-4">Organisation Details</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Organisation Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-600"
        />
        <input
          type="text"
          placeholder="Point of Contact Name"
          value={pocName}
          onChange={(e) => setPocName(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-600"
        />
        <input
          type="email"
          placeholder="POC Email"
          value={pocEmail}
          onChange={(e) => setPocEmail(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-600"
        />
        <input
          type="tel"
          placeholder="POC Contact Number"
          value={pocContact}
          onChange={(e) => setPocContact(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-600"
        />
      </div>
    </div>
  );
}

export default OrganisationFormTab;
