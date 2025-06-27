import React from "react";
import CoachingFormTab from "./partials/CoachingFormTab";
import IndividualFormTab from "./partials/IndividualFormTab";
import OrganisationFormTab from "./partials/OrganisationFormTab";

function CreateCourseSecondTab({
  syllabusFile,
  setSyllabusFile,
  creatorIds,
  handleCreatorChange,
  addMoreCreator,
  onBack,
  onSubmit,
  category,
}) {
  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      {/* Syllabus Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Syllabus PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setSyllabusFile(e.target.files[0])}
          className="w-full dark:bg-gray-700"
        />
      </div>

      {/* Creator IDs */}
      <div>
        <label className="block mb-1 font-medium">Add Co-Mentors (User IDs)</label>
        {creatorIds.map((id, index) => (
          <input
            key={index}
            type="text"
            value={id}
            onChange={(e) => handleCreatorChange(index, e.target.value)}
            placeholder={`Co-Mentor ${index + 1}`}
            className="w-full mb-2 px-4 py-2 rounded border dark:bg-gray-700"
          />
        ))}
        <button
          onClick={addMoreCreator}
          className="text-blue-600 hover:underline text-sm mt-1"
        >
          + Add another
        </button>
      </div>

      {/* Category-specific Tabs */}
      {category === "Coaching" && <CoachingFormTab />}
      {category === "Individual" && <IndividualFormTab />}
      {category === "Organisation" && <OrganisationFormTab />}

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateCourseSecondTab;
