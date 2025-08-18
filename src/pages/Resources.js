import { useState, useEffect, useRef, useCallback } from "react";
import { FiFilter, FiChevronDown, FiExternalLink, FiShare2, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const BASE_URL = "http://localhost:8281/resources";

async function http(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text().catch(() => "");
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const detail =
      json?.detail || json || text || `${res.status} ${res.statusText}`;
    throw new Error(
      `HTTP ${res.status} ${res.statusText} ${path}: ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`
    );
  }
  return json;
}

export default function DomainFilterPage() {
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubdomain, setSelectedSubdomain] = useState("");
  const [resources, setResources] = useState([]);
  const [showSubdomainDropdown, setShowSubdomainDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch domains + all resources on load
  useEffect(() => {
    async function fetchInitial() {
      try {
        const domainList = await http("/domain/all");
        setDomains(domainList);

        const allResources = await http("/all-resources");
        setResources(sortByUpvotes(allResources));
      } catch (e) {
        console.error("Init fetch failed:", e.message);
      }
    }
    fetchInitial();
  }, []);

  // Fetch subdomains when domain changes
  useEffect(() => {
    async function fetchSubdomains() {
      if (!selectedDomain) {
        setSubdomains([]);
        return;
      }
      try {
        const subs = await http(`/domain/${selectedDomain}/subdomains`);
        setSubdomains(subs);
      } catch (e) {
        console.error("Subdomain fetch failed:", e.message);
      }
    }
    fetchSubdomains();
  }, [selectedDomain]);

  // Sort helper
  const sortByUpvotes = (list) =>
    [...list].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

  // Apply filter (fetch from API)
  const applyFilter = useCallback(async () => {
    try {
      if (selectedDomain && selectedSubdomain) {
        const filtered = await http("/by-id", {
          method: "POST",
          body: { domain_id: selectedDomain, subdomain_id: selectedSubdomain },
        });
        setResources(sortByUpvotes(filtered));
      } else if (selectedDomain) {
        const filtered = await http("/all-resources"); // fallback if only domain
        setResources(
          sortByUpvotes(filtered.filter((r) => r.domain_id === selectedDomain))
        );
      } else {
        const all = await http("/all-resources");
        setResources(sortByUpvotes(all));
      }
    } catch (e) {
      console.error("Filter failed:", e.message);
    }
  }, [selectedDomain, selectedSubdomain]);

  // Handle upvote/downvote
  const handleVote = async (id, type) => {
    try {
      await http(`/${id}/${type}`, { method: "POST" });
      // Refresh list after voting
      if (selectedDomain || selectedSubdomain) {
        applyFilter();
      } else {
        const all = await http("/all-resources");
        setResources(sortByUpvotes(all));
      }
    } catch (e) {
      console.error(`${type} failed:`, e.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSubdomainDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Resource Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover curated resources filtered by domain and subdomain
          </p>
        </div>

        {/* Filter Section */}
        <div
          className="sticky top-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-6 z-10"
          ref={dropdownRef}
        >
          {/* Domain dropdown */}
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
                }}
                className="w-full pl-4 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="">-- Choose Domain --</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Subdomain dropdown */}
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
                  {selectedSubdomain
                    ? subdomains.find((s) => s.id === selectedSubdomain)?.name
                    : "-- Choose Subdomain --"}
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
                    {subdomains.map((sub) => (
                      <div
                        key={sub.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 ${
                          selectedSubdomain === sub.id
                            ? "bg-blue-100 dark:bg-gray-600 text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedSubdomain(sub.id);
                          setShowSubdomainDropdown(false);
                        }}
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Apply filter */}
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

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {resources.length > 0
                ? `Trending Resources (${resources.length})`
                : "No resources found"}
            </h2>
          </div>

          {resources.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FiFilter className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your filters or select different domain/subdomain
                combinations.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {res.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {res.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Resource
                        <FiExternalLink className="ml-1" />
                      </a>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <FiShare2 className="mr-1" />
                        Shared
                      </span>
                    </div>

                    {/* Vote buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleVote(res.id, "upvote")}
                        className="flex items-center px-3 py-1 text-xs font-medium rounded-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                      >
                        <FiThumbsUp className="mr-1" /> {res.upvotes || 0}
                      </button>
                      <button
                        onClick={() => handleVote(res.id, "downvote")}
                        className="flex items-center px-3 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                      >
                        <FiThumbsDown className="mr-1" /> {res.downvotes || 0}
                      </button>
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
