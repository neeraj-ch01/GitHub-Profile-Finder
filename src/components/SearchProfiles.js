import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import githubService from "../services/githubService";

const SearchProfiles = () => {
  const navigate = useNavigate();
  
  // Search Mode: 'users' or 'repositories'
  const [searchMode, setSearchMode] = useState("users");
  // Search Method for users: 'criteria' (Search by Name/Criteria) or 'direct' (Direct Username Lookup)
  const [searchMethod, setSearchMethod] = useState("criteria");

  // Search Inputs
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [company, setCompany] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [usernameLookup, setUsernameLookup] = useState("");

  // Filters Drawer State
  const [showFilters, setShowFilters] = useState(false);

  // Results State
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  // Perform standard search (called when query or filters change, or page changes)
  const handleSearch = async (e, targetPage = 1) => {
    if (e) e.preventDefault();
    
    // For repositories search or name search, we need a query
    if (!query.trim() && searchMode === "repositories") {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);
    setPage(targetPage);

    try {
      if (searchMode === "users") {
        const response = await githubService.searchUsers(
          query.trim() || null,
          location.trim() || null,
          language.trim() || null,
          company.trim() || null,
          minRepos ? parseInt(minRepos) : null,
          targetPage,
          pageSize
        );
        setResults(response.items || []);
        setTotalCount(response.total_count || 0);
      } else {
        const response = await githubService.searchRepositories(
          query.trim(),
          targetPage,
          pageSize
        );
        setResults(response.items || []);
        setTotalCount(response.total_count || 0);
      }
    } catch (err) {
      console.error(err);
      setError("Search query failed. Please refine your query or try again later (you may have hit the GitHub rate limit).");
      setResults([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Perform Direct Username Lookup
  const handleDirectLookup = async (e) => {
    e.preventDefault();
    if (!usernameLookup.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = await githubService.getUserDetails(usernameLookup.trim());
      if (user && user.login) {
        // Redirect directly to user profile dashboard
        navigate(`/users/${user.login}`);
      } else {
        setError("User profile not found.");
      }
    } catch (err) {
      console.error(err);
      setError("User profile details could not be retrieved. (Does this GitHub user exist?)");
    } finally {
      setLoading(false);
    }
  };

  // Reset pagination on mode change
  useEffect(() => {
    setResults([]);
    setTotalCount(0);
    setError(null);
    setQuery("");
    setPage(1);
  }, [searchMode, searchMethod]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
            Developer Discovery Hub
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Search across millions of GitHub profiles and codebases in real-time.
          </p>
        </div>

        {/* Mode Selector Tab Group */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/80 p-1 rounded-xl flex border border-gray-700">
            <button
              onClick={() => setSearchMode("users")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                searchMode === "users"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-450 hover:text-white"
              }`}
            >
              <i className="fas fa-user mr-2"></i> Search Users
            </button>
            <button
              onClick={() => setSearchMode("repositories")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                searchMode === "repositories"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-450 hover:text-white"
              }`}
            >
              <i className="fas fa-code mr-2"></i> Search Repositories
            </button>
          </div>
        </div>

        {/* User Search Method Selectors */}
        {searchMode === "users" && (
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setSearchMethod("criteria")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
                searchMethod === "criteria"
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              Search by Name / Criteria
            </button>
            <button
              onClick={() => setSearchMethod("direct")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
                searchMethod === "direct"
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              Direct Username Lookup
            </button>
          </div>
        )}

        {/* Search Input Box Card */}
        <div className="max-w-3xl mx-auto bg-gray-850 border border-gray-750/50 rounded-2xl p-6 shadow-xl mb-12 backdrop-blur-md">
          {searchMode === "users" && searchMethod === "direct" ? (
            // Direct Username Lookup Form
            <form onSubmit={handleDirectLookup} className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                GitHub Username
              </label>
              <div className="flex gap-4">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <i className="fas fa-at"></i>
                  </span>
                  <input
                    type="text"
                    value={usernameLookup}
                    onChange={(e) => setUsernameLookup(e.target.value)}
                    placeholder="e.g. torvalds"
                    className="w-full bg-gray-900/60 border border-gray-700 rounded-xl py-3.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : "Lookup"}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Bypasses standard searches and directly loads the user's detailed contribution profile.
              </p>
            </form>
          ) : (
            // Criteria / Repositories Search Form
            <form onSubmit={(e) => handleSearch(e, 1)} className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      searchMode === "users"
                        ? "Search developers by name..."
                        : "Search repositories by keywords..."
                    }
                    className="w-full bg-gray-900/60 border border-gray-700 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : "Search"}
                </button>
                {searchMode === "users" && (
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-3.5 border rounded-xl font-semibold transition-all flex items-center ${
                      showFilters || location || language || company || minRepos
                        ? "border-blue-500 text-blue-400 bg-blue-500/10"
                        : "border-gray-700 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    <i className="fas fa-filter mr-2"></i> Filters
                  </button>
                )}
              </div>

              {/* Advanced Filters Accordion Drawer */}
              {searchMode === "users" && showFilters && (
                <div className="pt-4 border-t border-gray-750/30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-down">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Francisco"
                      className="w-full bg-gray-900/40 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Language
                    </label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g. Java, Python"
                      className="w-full bg-gray-900/40 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Google"
                      className="w-full bg-gray-900/40 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Min Repositories
                    </label>
                    <input
                      type="number"
                      value={minRepos}
                      onChange={(e) => setMinRepos(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full bg-gray-900/40 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Feedback / Error Notifications */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-900/30 border border-red-800 text-red-300 px-6 py-4 rounded-xl flex items-center space-x-3">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Results Showcase */}
        {loading ? (
          // Skeleton loader
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 border border-gray-700/50 rounded-2xl h-48"></div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="text-gray-400 text-sm mb-6 flex justify-between items-center">
              <span>Found {totalCount.toLocaleString()} results</span>
              <span>Page {page} of {totalPages || 1}</span>
            </div>

            {searchMode === "users" ? (
              // Users Grid
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-16 h-16 rounded-2xl border border-gray-700"
                      />
                      <div className="overflow-hidden">
                        <Link to={`/users/${user.login}`} className="text-lg font-bold text-white hover:text-blue-450 hover:underline block truncate">
                          {user.name || user.login}
                        </Link>
                        <span className="text-xs text-gray-450 block mb-2 font-mono">@{user.login}</span>
                        {user.bio && (
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-750/20 flex flex-wrap gap-2 text-xs text-gray-400">
                      {user.location && (
                        <span className="flex items-center bg-gray-900 px-2.5 py-1 rounded-md border border-gray-700/50">
                          <i className="fas fa-map-marker-alt mr-1.5 text-blue-500"></i>
                          {user.location}
                        </span>
                      )}
                      {user.company && (
                        <span className="flex items-center bg-gray-900 px-2.5 py-1 rounded-md border border-gray-700/50 truncate max-w-[150px]">
                          <i className="fas fa-building mr-1.5 text-purple-500"></i>
                          {user.company}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Repositories Grid
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={repo.owner.avatar_url}
                          alt={repo.owner.login}
                          className="w-5 h-5 rounded-full"
                        />
                        <Link to={`/users/${repo.owner.login}`} className="text-xs text-gray-450 hover:text-white font-mono">
                          {repo.owner.login}
                        </Link>
                      </div>
                      <Link
                        to={`/repos/${repo.owner.login}/${repo.name}`}
                        className="text-lg font-bold text-white hover:text-blue-450 hover:underline block truncate"
                      >
                        {repo.name}
                      </Link>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-750/20 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-gray-450">{repo.language || "Unknown"}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <span className="flex items-center">
                          <i className="far fa-star mr-1"></i>
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center">
                          <i className="fas fa-code-branch mr-1"></i>
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={(e) => handleSearch(e, page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-750 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg font-semibold transition-all"
                >
                  <i className="fas fa-chevron-left mr-1"></i> Previous
                </button>
                <span className="text-sm text-gray-400 font-semibold">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={(e) => handleSearch(e, page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-750 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg font-semibold transition-all"
                >
                  Next <i className="fas fa-chevron-right ml-1"></i>
                </button>
              </div>
            )}
          </div>
        ) : (
          !loading && query && (
            <div className="text-center py-16 bg-gray-850 rounded-2xl border border-gray-750/50 text-gray-450 max-w-3xl mx-auto">
              <i className="fas fa-search-minus text-4xl mb-4"></i>
              <p className="text-lg">No results found for your search.</p>
              <p className="text-sm mt-1">Try tweaking filters or simplifying your query keywords.</p>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-850 border-t border-gray-800 text-center py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400">© {new Date().getFullYear()} GitHub Finder Utility. Designed for Developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchProfiles;
