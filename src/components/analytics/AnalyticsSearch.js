import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const AnalyticsSearch = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/analytics/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Rich Analytics
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            Visualize language distribution, top starred repositories, and contribution heatmaps for any GitHub user.
          </p>

          <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto flex items-center bg-gray-800 border border-gray-700 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <div className="pl-4 pointer-events-none">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full py-3 px-4 text-lg text-white bg-transparent border-none focus:outline-none focus:ring-0"
              placeholder="Enter a GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-lg px-8 py-3 transition-colors shadow-md whitespace-nowrap"
            >
              Analyze
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsSearch;
