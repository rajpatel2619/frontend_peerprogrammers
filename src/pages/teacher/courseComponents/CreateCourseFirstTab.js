import React, { useEffect, useState } from "react";

function CreateCourseFirstTab({
  title,
  setTitle,
  domains,
  setDomains,
  category,
  setCategory,
  mode,
  setMode,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onNext,
}) {
  const [domainOptions, setDomainOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);

  useEffect(() => {
    // Replace these with your actual API endpoints
    fetch("/api/domains")
      .then(res => res.json())
      .then(data => setDomainOptions(data))
      .catch(err => console.error("Error loading domains", err));

    fetch("/api/modes")
      .then(res => res.json())
      .then(data => setModeOptions(data))
      .catch(err => console.error("Error loading modes", err));
  }, []);

  const handleDomainSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDomains(selected);
  };

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div>
        <label className="block mb-1 font-medium">Course Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          placeholder="Enter course title"
        />
      </div>

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

      <div>
        <label className="block mb-1 font-medium">Course Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        >
          <option value="">Select category</option>
          <option value="Coaching">Coaching</option>
          <option value="Individual">Individual</option>
          <option value="Organisation">Organisation</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Course Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        >
          <option value="">Select mode</option>
          {modeOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}

export default CreateCourseFirstTab;
