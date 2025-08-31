import React, { useEffect, useState } from "react";
import CoachingFormTab from "./partials/CoachingFormTab";
import IndividualFormTab from "./partials/IndividualFormTab";
import OrganisationFormTab from "./partials/OrganisationFormTab";

function CreateCourseSecondTab({
  syllabusFile,
  setSyllabusFile,
  coverPhoto,
  setCoverPhoto,
  description,
  setDescription,
  whatsappLink,
  setWhatsappLink,
  creatorIds,
  handleCreatorChange,
  addMoreCreator,
  setCreatorIds,
  onBack,
  onSubmit,
  category,
  domains,
  setDomains,
  orgName,
  setOrgName,
  pocName,
  setPocName,
  pocEmail,
  setPocEmail,
  pocContact,
  setPocContact,
  mode,
  dailyMeetingLink,
  setDailyMeetingLink,
  lectureLink,
  setLectureLink,
  venueAddress,
  setVenueAddress,
}) {
  const [domainOptions, setDomainOptions] = useState([]);

  useEffect(() => {
    fetch("/api/domains")
      .then((res) => res.json())
      .then((data) => setDomainOptions(data))
      .catch((err) => console.error("Error loading domains", err));
  }, []);

  const handleDomainSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDomains(selected);
  };

  const removeCreator = (index) => {
    const updated = [...creatorIds];
    updated.splice(index, 1);
    setCreatorIds(updated);
  };

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      {/* Domains Selection */}
      <div>
        <label className="block mb-1 font-medium">Domains</label>
        <select
          multiple
          value={domains}
          onChange={handleDomainSelect}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 h-32"
        >
          {domainOptions.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
      </div>

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

      {/* Cover Photo Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Cover Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverPhoto(e.target.files[0])}
          className="w-full dark:bg-gray-700"
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block mb-1 font-medium">Course Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter a brief description of the course..."
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        />
      </div>

      {/* WhatsApp Group Link */}
      <div>
        <label className="block mb-1 font-medium">WhatsApp Group Link</label>
        <input
          type="text"
          value={whatsappLink}
          onChange={(e) => setWhatsappLink(e.target.value)}
          placeholder="https://chat.whatsapp.com/..."
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        />
      </div>

      {/* Mode-specific Fields */}
      {mode === "online_live" && (
        <div>
          <label className="block mb-1 font-medium">Daily Meeting Link</label>
          <input
            type="url"
            value={dailyMeetingLink}
            onChange={(e) => setDailyMeetingLink(e.target.value)}
            placeholder="https://zoom.us/..."
            className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          />
        </div>
      )}

      {mode === "online_recorded" && (
        <div>
          <label className="block mb-1 font-medium">Lecture Link</label>
          <input
            type="url"
            value={lectureLink}
            onChange={(e) => setLectureLink(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          />
        </div>
      )}

      {mode === "offline" && (
        <div>
          <label className="block mb-1 font-medium">Venue Address</label>
          <textarea
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            placeholder="Enter full venue address..."
            rows={3}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          />
        </div>
      )}

      {/* Co-Mentors */}
      <div>
        <label className="block mb-1 font-medium">Add Co-Mentors (User IDs)</label>
        {creatorIds.map((id, index) => (
          <div key={index} className="flex items-center mb-2 gap-2">
            <input
              type="text"
              value={id}
              onChange={(e) => handleCreatorChange(index, e.target.value)}
              placeholder={`Co-Mentor ${index + 1}`}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700"
            />
            <button
              onClick={() => removeCreator(index)}
              className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
              title="Remove Co-Mentor"
            >
              ❌
            </button>
          </div>
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
      {category === "Organisation" && (
        <OrganisationFormTab
          orgName={orgName}
          setOrgName={setOrgName}
          pocName={pocName}
          setPocName={setPocName}
          pocEmail={pocEmail}
          setPocEmail={setPocEmail}
          pocContact={pocContact}
          setPocContact={setPocContact}
        />
      )}

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
