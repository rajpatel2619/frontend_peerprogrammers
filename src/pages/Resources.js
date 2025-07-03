import { useState, useEffect, useRef } from "react";
import resourceJson from "../data/resources.json";

export default function DomainFilterPage() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubdomain, setSelectedSubdomain] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);
  const [showSubdomainDropdown, setShowSubdomainDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const resourceData = resourceJson.resourceData;
  const resources = resourceJson.resources;

  const applyFilter = () => {
    const result = resources.filter(
      (res) =>
        res.domain === selectedDomain &&
        res.subdomain === selectedSubdomain
    );
    setFilteredResources(result);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowSubdomainDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filter Resources</h1>

      {/* Filter Section */}
      <div
        className="sticky top-4 bg-white shadow rounded p-4 mb-6 text-black flex gap-6 flex-wrap z-10"
        ref={dropdownRef}
      >
        <div className="relative w-full sm:w-64 min-w-[16rem]">
          <label className="block font-semibold mb-1">
            Select Domain
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setSelectedSubdomain("");
              setShowSubdomainDropdown(false);
            }}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">-- Choose Domain --</option>
            {Object.keys(resourceData).map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {selectedDomain && (
          <div className="relative w-full sm:w-64 min-w-[16rem]">
            <label className="block font-semibold mb-1">
              Select Subdomain
            </label>
            <button
              onClick={() =>
                setShowSubdomainDropdown((prev) => !prev)
              }
              className="w-full px-4 py-2 border rounded text-left bg-gray-100 hover:bg-gray-200"
            >
              {selectedSubdomain || "-- Choose Subdomain --"}
            </button>
            {showSubdomainDropdown && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-lg z-30 p-3 max-h-48 overflow-y-auto">
                {resourceData[selectedDomain].map((subdomain) => (
                  <label
                    key={subdomain}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    <input
                      type="radio"
                      name="subdomain"
                      value={subdomain}
                      checked={selectedSubdomain === subdomain}
                      onChange={() => {
                        setSelectedSubdomain(subdomain);
                        setShowSubdomainDropdown(false);
                      }}
                      className="form-radio"
                    />
                    <span>{subdomain}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-end">
          <button
            onClick={applyFilter}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Filtered Resources Display */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          Filtered Resources
        </h2>
        {filteredResources.length === 0 ? (
          <p className="text-gray-500">
            No resources found. Select filters and click apply.
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredResources.map((res, index) => (
              <li
                key={index}
                className="border p-4 rounded shadow"
              >
                <h3 className="text-lg font-bold">{res.title}</h3>
                <p className="text-sm text-gray-600">
                  {res.domain} / {res.subdomain}
                </p>
                <p className="mt-2 text-gray-700">
                  {res.description}
                </p>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Watch Playlist
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
