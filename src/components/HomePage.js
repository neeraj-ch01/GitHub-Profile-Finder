import React from "react";
import { Link, Routes, Route } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">GitHub Profile Finder Utility</div>

      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 flex-grow">
        <h1 className="text-4xl font-bold mb-4">Find GitHub Profiles Easily</h1>
        <p className="text-lg mb-6">
          Search for developers, repositories, and organizations on GitHub with ease.
        </p>
        <a
          href="#features"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section id="features" className="py-10 px-4 flex-grow">
        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
          <FeatureCard
            title="Search Profiles"
            description="Quickly find GitHub profiles"
            link = "/search-profiles"
          />
          <FeatureCard
            title="View Repositories"
            description="Check out the latest repositories from any user or organization."
            Link = "view-repositories"
          />
          <div className="sm:col-span-2">
            <FeatureCard
              title="Detailed Statistics"
              description="View follower counts, repository stats, and more at a glance."
              Link = "detailed-statistics"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4 mt-auto">
        <p>© 2025 GitHub Profile Finder Utility. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, link }) => {
  return (
    <Link to ={link}>
    <div className="bg-gray-800 p-6 rounded">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
    </Link>
  );
};

// Placeholder Components for Routes
//const SearchProfiles = () => <div className="p-10 text-center">Search Profiles Component</div>;
const ViewRepositories = () => <div className="p-10 text-center">View Repositories Component</div>;
const DetailedStatistics = () => <div className="p-10 text-center">Detailed Statistics Component</div>;

export default HomePage;
