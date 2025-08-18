import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiExternalLink,
  FiShare2,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";

const BASE_URL = process.env.REACT_APP_API + '/resources';

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
    const detail = json?.detail || json || text || `${res.status} ${res.statusText}`;
    throw new Error(
      `HTTP ${res.status} ${res.statusText} ${path}: ${typeof detail === "string" ? detail : JSON.stringify(detail)
      }`
    );
  }
  return json;
}


function normalizeDomain(d) {
  if (!d) return null;
  return {
    id: String(d.id ?? d.domain_id ?? d.domainId ?? ""),
    name: d.name ?? d.title ?? "",
  };
}

function normalizeSubdomain(s) {
  if (!s) return null;
  return {
    id: String(s.id ?? s.subdomain_id ?? s.subdomainId ?? ""),
    name: s.name ?? s.title ?? "",
    domain_id: String(s.domain_id ?? s.domainId ?? s.domainID ?? ""),
  };
}
function normalizeResource(r) {
  if (!r) return null;
  const up = r.upvotes ?? r.upvote ?? 0;
  const down = r.downvotes ?? r.downvote ?? 0;
  return {
    id: String(r.id ?? r.resource_id ?? r._id ?? ""),
    title: r.title ?? r.name ?? "Untitled",
    description: r.description ?? "",
    link: r.link ?? r.url ?? "#",
    upvotes: up,
    downvotes: down,
    domain_id: r.domain_id ? String(r.domain_id) : r.domainId ? String(r.domainId) : "",
    subdomain_id: r.subdomain_id
      ? String(r.subdomain_id)
      : r.subdomainId
        ? String(r.subdomainId)
        : "",
  };
}

export default function DomainFilterPage() {
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(""); // string id
  const [selectedSubdomain, setSelectedSubdomain] = useState(""); // string id
  const [resources, setResources] = useState([]);
  const [showSubdomainDropdown, setShowSubdomainDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const subFetchAbortRef = useRef({ token: 0 });

  const sortByUpvotes = useCallback(
    (list) => [...list].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)),
    []
  );

  // Initial load: domains + all resources
  useEffect(() => {
    let mounted = true;
    (async function fetchInitial() {
      try {
        setLoading(true);
        const domainList = await http("/domain/all");
        const normalizedDomains = (Array.isArray(domainList) ? domainList : []).map(
          normalizeDomain
        ).filter(Boolean);
        if (mounted) setDomains(normalizedDomains);

        const allResources = await http("/all-resources");
        const normalizedRes = (Array.isArray(allResources) ? allResources : [])
          .map(normalizeResource)
          .filter(Boolean);
        if (mounted) setResources(sortByUpvotes(normalizedRes));
        console.log(allResources)
      } catch (e) {
        console.error("Init fetch failed:", e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sortByUpvotes]);

  // Fetch subdomains when domain changes, guard against race
  useEffect(() => {
    const myToken = (subFetchAbortRef.current.token = (subFetchAbortRef.current.token || 0) + 1);
    const run = async () => {
      if (!selectedDomain) {
        setSubdomains([]);
        return;
      }
      try {
        const subs = await http(`/domain/${selectedDomain}/subdomains`);
        if (subFetchAbortRef.current.token !== myToken) return; // stale
        const normalizedSubs = (Array.isArray(subs) ? subs : [])
          .map(normalizeSubdomain)
          .filter(Boolean)
          // keep only subs that match selectedDomain in case API returns more
          .filter((s) => !s.domain_id || s.domain_id === selectedDomain);
        setSubdomains(normalizedSubs);
      } catch (e) {
        if (subFetchAbortRef.current.token === myToken) {
          console.error("Subdomain fetch failed:", e.message);
          setSubdomains([]);
        }
      }
    };
    run();
  }, [selectedDomain]);

  // Derived: selected subdomain display name
  const selectedSubdomainName = useMemo(() => {
    return selectedSubdomain
      ? subdomains.find((s) => s.id === selectedSubdomain)?.name || "-- Choose Subdomain --"
      : "-- Choose Subdomain --";
  }, [selectedSubdomain, subdomains]);

  // Apply filter (fetch from API)
  const applyFilter = useCallback(async () => {
    try {
      setLoading(true);
      if (selectedDomain && selectedSubdomain) {
        // POST /by-id expects ids; keep as string unless backend strictly needs number
        const filtered = await http("/by-id", {
          method: "POST",
          body: { domain_id: selectedDomain, subdomain_id: selectedSubdomain },
        });
        const normalized = (Array.isArray(filtered) ? filtered : [])
          .map(normalizeResource)
          .filter(Boolean);
        setResources(sortByUpvotes(normalized));
      } else if (selectedDomain) {
        // Fallback: filter client-side by domain if server lacks endpoint for domain-only
        const all = await http("/all-resources");
        const normalized = (Array.isArray(all) ? all : [])
          .map(normalizeResource)
          .filter(Boolean)
          .filter((r) => r.domain_id === selectedDomain);
        setResources(sortByUpvotes(normalized));
      } else {
        const all = await http("/all-resources");
        const normalized = (Array.isArray(all) ? all : [])
          .map(normalizeResource)
          .filter(Boolean);
        setResources(sortByUpvotes(normalized));
      }
    } catch (e) {
      console.error("Filter failed:", e.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDomain, selectedSubdomain, sortByUpvotes]);

  // Handle upvote/downvote
  const handleVote = useCallback(
    async (id, type) => {
      try {
        await http(`/${id}/${type}`, { method: "POST" });
        // Refresh list after voting
        if (selectedDomain || selectedSubdomain) {
          await applyFilter();
        } else {
          const all = await http("/all-resources");
          const normalized = (Array.isArray(all) ? all : [])
            .map(normalizeResource)
            .filter(Boolean);
          setResources(sortByUpvotes(normalized));
        }
      } catch (e) {
        console.error(`${type} failed:`, e.message);
      }
    },
    [applyFilter, selectedDomain, selectedSubdomain, sortByUpvotes]
  );

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
                  const v = e.target.value; // value is string
                  setSelectedDomain(v);
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
                  {selectedSubdomainName}
                </span>
                <FiChevronDown
                  className={`text-gray-400 transition-transform ${showSubdomainDropdown ? "transform rotate-180" : ""
                    }`}
                />
              </button>
              {showSubdomainDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    {subdomains.map((sub) => (
                      <div
                        key={sub.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 ${selectedSubdomain === sub.id
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
                    {subdomains.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        No subdomains found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Apply filter */}
          <div className="flex items-end">
            <button
              onClick={applyFilter}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-60 text-white font-medium rounded-lg shadow-sm transition-all duration-200"
            >
              <FiFilter className="mr-2" />
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {resources.length > 0
                ? `Trending Resources (${resources.length})`
                : loading
                  ? "Loading..."
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
                Try adjusting filters or select a different domain/subdomain combination.
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
                        <FiThumbsUp className="mr-1" /> {res?.upvotes}
                      </button>
                      <button
                        onClick={() => handleVote(res.id, "downvote")}
                        className="flex items-center px-3 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                      >
                        <FiThumbsDown className="mr-1" /> {res?.downvotes}
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
