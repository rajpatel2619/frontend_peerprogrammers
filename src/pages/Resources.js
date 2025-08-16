import { useState, useEffect, useRef, useCallback } from "react";
import resourceJson from "../data/resources.json";
import { FiFilter, FiChevronDown, FiExternalLink, FiShare2 } from "react-icons/fi";

export default function DomainFilterPage() {
  const resourceData = resourceJson.resourceData;
  const resources = resourceJson.resources;

  const [selectedDomain, setSelectedDomain] = useState("AI");
  const [selectedSubdomain, setSelectedSubdomain] = useState("Deep Learning");
  const [filteredResources, setFilteredResources] = useState([]);
  const [showSubdomainDropdown, setShowSubdomainDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const applyFilter = useCallback(() => {
    const result = resources.filter(
      (res) =>
        res.domain === selectedDomain && res.subdomain === selectedSubdomain
    );
    setFilteredResources(result);
  }, [resources, selectedDomain, selectedSubdomain]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSubdomainDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Resource Explorer</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover curated resources filtered by domain and subdomain
          </p>
        </div>

        {/* Filter Section */}
        <div
          className="sticky top-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-6 z-10"
          ref={dropdownRef}
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Domain
            </label>
            <div className="relative">
              <select
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setSelectedSubdomain("");
                  setShowSubdomainDropdown(false);
                }}
                className="w-full pl-4 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="">-- Choose Domain --</option>
                {Object.keys(resourceData).map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>

          {selectedDomain && (
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subdomain
              </label>
              <button
                onClick={() => setShowSubdomainDropdown((prev) => !prev)}
                className="w-full flex justify-between items-center pl-4 pr-3 py-3 text-base text-left border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <span className="truncate">
                  {selectedSubdomain || "-- Choose Subdomain --"}
                </span>
                <FiChevronDown
                  className={`text-gray-400 transition-transform ${
                    showSubdomainDropdown ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {showSubdomainDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    {resourceData[selectedDomain].map((subdomain) => (
                      <div
                        key={subdomain}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 ${
                          selectedSubdomain === subdomain
                            ? "bg-blue-100 dark:bg-gray-600 text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedSubdomain(subdomain);
                          setShowSubdomainDropdown(false);
                        }}
                      >
                        {subdomain}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={applyFilter}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200"
            >
              <FiFilter className="mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {filteredResources.length > 0
                ? `Found ${filteredResources.length} resources`
                : "No resources found"}
            </h2>
            {filteredResources.length > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedDomain} {selectedSubdomain && `/ ${selectedSubdomain}`}
              </span>
            )}
          </div>

          {filteredResources.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FiFilter className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your filters or select different domain/subdomain combinations.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((res, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-3">
                          {res.domain}
                        </span>
                        {res.subdomain && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-3 ml-2">
                            {res.subdomain}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {res.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {res.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Resource
                        <FiExternalLink className="ml-1" />
                      </a>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <FiShare2 className="mr-1" />
                        Shared by Raj
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}