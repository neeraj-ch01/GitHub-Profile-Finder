import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import githubService from "../services/githubService";
import SearchForm from "./search/SearchForm";
import UserCard from "./search/UserCard";
import RepositoryCard from "./search/RepositoryCard";
import Pagination from "./common/Pagination";
import Footer from "./common/Footer";

const SearchProfiles = () => {
  const navigate = useNavigate();
  const locationUrl = useLocation();
  
  // Search Mode: 'users' or 'repositories'
  const initialMode = new URLSearchParams(locationUrl.search).get('mode') || "users";
  const [searchMode, setSearchMode] = useState(initialMode);
  
  useEffect(() => {
    const mode = new URLSearchParams(locationUrl.search).get('mode');
    if (mode === "repositories" || mode === "users") {
      setSearchMode(mode);
    }
  }, [locationUrl.search]);
  
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
            {searchMode === "users" ? "Developer Discovery Hub" : "Repo Explorer"}
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            {searchMode === "users" 
              ? "Search across millions of GitHub profiles in real-time." 
              : "Browse repositories, view branches, and analyze code structures."}
          </p>
        </div>

        {/* Search Input Box Form */}
        <SearchForm
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          searchMethod={searchMethod}
          setSearchMethod={setSearchMethod}
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          language={language}
          setLanguage={setLanguage}
          company={company}
          setCompany={setCompany}
          minRepos={minRepos}
          setMinRepos={setMinRepos}
          usernameLookup={usernameLookup}
          setUsernameLookup={setUsernameLookup}
          handleSearch={handleSearch}
          handleDirectLookup={handleDirectLookup}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          loading={loading}
        />

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
              <div key={i} className="animate-pulse bg-gray-800 border border-gray-750/50 rounded-2xl h-48"></div>
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
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              // Repositories Grid
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((repo) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {/* Pagination controls */}
            <Pagination page={page} totalPages={totalPages} onPageChange={handleSearch} />
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
      <Footer />
    </div>
  );
};

export default SearchProfiles;
