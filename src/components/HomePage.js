import React from "react";
import { Link } from "react-router-dom";
import Features from "./Features";

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
      <Features />

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 text-center py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400">© {new Date().getFullYear()} GitHub Finder Utility. Designed for Developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
