import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-900 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
          <FeatureCard
            icon={<TutorialIcon />}
            title="Git & GitHub Tutorials"
            description="Master Git with curated video tutorials from YouTube, ranging from beginner basics to advanced workflows."
            link="/tutorials"
          />
        </div>
      </div>
    </section>
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
const TutorialIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default Features;
