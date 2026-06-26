import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Features from "./Features";
import Navbar from "../common/Navbar";
import githubService from "../../services/githubService";
import Footer from "../common/Footer";
const HomePage = () => {
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("weekly");
  const [language, setLanguage] = useState("");

  const timeframes = [
    { value: "daily", label: "Today" },
    { value: "weekly", label: "This Week" },
    { value: "monthly", label: "This Month" },
  ];

  const languages = [
    { value: "", label: "All Languages" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "typescript", label: "TypeScript" },
  ];

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await githubService.getTrendingRepositories(
          language || null,
          timeframe,
          1,
          4 // Show top 4 trending repos on homepage
        );
        setTrendingRepos(response.items || []);
      } catch (err) {
        console.error("Error fetching trending repos:", err);
        setError("Could not load trending repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeframe, language]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-8 flex-grow gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            GitHub <br /> Insights with Ease
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
            A premium developer utility to search profiles, explore repositories, and visualize detailed contribution statistics in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/search-profiles"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/20 text-center w-full sm:w-auto"
            >
              Get Started Now
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-all text-center w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <img
            src="/assets/hero_graphic.png"
            alt="GitHub Insights Visualization"
            className="relative rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] mx-auto max-w-full"
          />
        </div>
      </header>

      {/* Trending Section */}
      <section className="bg-gray-800/30 border-y border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Trending Showcase</h2>
              <p className="text-gray-400 mt-2">See what the developer community is building</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-gray-850 border border-gray-750 text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                {timeframes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-850 border border-gray-750 text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 border border-gray-700/50 rounded-2xl h-48"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-gray-800/40 rounded-2xl border border-gray-700 text-red-400">
              {error}
            </div>
          ) : trendingRepos.length === 0 ? (
            <div className="text-center py-10 bg-gray-800/40 rounded-2xl border border-gray-700 text-gray-400">
              No trending repositories found for this combination.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {trendingRepos.map((repo) => (
                <Link
                  key={repo.id}
                  to={`/repos/${repo.owner?.login}/${repo.name}`}
                  className="group bg-gray-850/50 border border-gray-750/50 hover:border-blue-500/50 hover:bg-gray-800 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={repo.owner?.avatar_url}
                        alt={repo.owner?.login}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors">
                        {repo.owner?.login}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:underline truncate">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-750/30">
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-xs text-gray-400">{repo.language || "Unknown"}</span>
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
