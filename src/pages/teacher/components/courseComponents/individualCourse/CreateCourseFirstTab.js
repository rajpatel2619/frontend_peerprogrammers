import React from "react";

function CreateCourseFirstTab({
  title,
  setTitle,
  category,
  setCategory,
  mode,
  setMode,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  price,
  setPrice,
  onNext,
}) {
  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Course Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          placeholder="Enter course title"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">Price (in ₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
          placeholder="Enter course price"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Course Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        >
          <option value="Individual">Individual</option>
          <option value="Coaching">Coaching</option>
          <option value="Organisation">Organisation</option>
        </select>
      </div>

      {/* Mode */}
      <div>
        <label className="block mb-1 font-medium">Course Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700"
        >
          <option value="online_live">Online (Live)</option>
          <option value="online_recorded">Online (Recorded)</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Dates */}
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

      {/* Next Button */}
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
