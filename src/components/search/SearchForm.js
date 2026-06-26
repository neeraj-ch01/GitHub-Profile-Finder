import React from "react";

const SearchForm = ({
  searchMode,
  setSearchMode,
  searchMethod,
  setSearchMethod,
  query,
  setQuery,
  location,
  setLocation,
  language,
  setLanguage,
  company,
  setCompany,
  minRepos,
  setMinRepos,
  usernameLookup,
  setUsernameLookup,
  handleSearch,
  handleDirectLookup,
  showFilters,
  setShowFilters,
  loading
}) => {
  return (
    <>
      {/* Mode Selector Tab Group */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800/80 p-1 rounded-xl flex border border-gray-700">
          <button
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
    </>
  );
};

export default SearchForm;
