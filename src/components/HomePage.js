import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            GitHub Profile Finder
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-8 flex-grow gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Unlock GitHub <br /> Insights with Ease
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
            A premium developer utility to search profiles, explore repositories, and visualize detailed contribution statistics in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/search-profiles"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Get Started Now
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-all"
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
            className="relative rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<SearchIcon />}
              title="Profile Search"
              description="Instantly find any GitHub user with a predictive search experience and visual rich results."
              link="/search-profiles"
            />
            <FeatureCard
              icon={<RepoIcon />}
              title="Repo Explorer"
              description="Browse repositories, view branches, and analyze code structures without leaving the dashboard."
              link="/search-profiles"
            />
            <FeatureCard
              icon={<StatsIcon />}
              title="Rich Analytics"
              description="Visualize follower growth, language distribution, and contribution heatmaps effortlessly."
              link="/search-profiles"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 text-center py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400">© {new Date().getFullYear()} GitHub Finder Utility. Designed for Developers.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="group">
      <div className="h-full bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
        <div className="mb-6 p-4 bg-gray-900 rounded-xl text-blue-500 group-hover:text-blue-400 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </Link>
  );
};

// Icons (SVG)
const SearchIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const RepoIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const StatsIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default HomePage;
