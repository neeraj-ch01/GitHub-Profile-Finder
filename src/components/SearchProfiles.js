import React from "react";
import { Link } from "react-router-dom";

const SearchProfiles = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Home
        </Link>
        <Link to="/logout" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </Link>
      </nav>

      <div className="flex flex-grow items-center justify-center">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-center w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-6">Search Profiles</h1>
          <button className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 mb-4 w-3/4 text-left">
            Search by Name
          </button>
          <button className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600 w-3/4 text-left">
            Search by GitHub Username
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center w-1/2">
          {/* Placeholder for the graphic */}
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="w-48 h-48"
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4 mt-auto">
        <p>© 2025 GitHub Profile Finder Utility. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SearchProfiles;
