import React from "react";
import Navbar from "./Navbar";

const Tutorials = () => {
  const tutorialVideos = [
    {
      id: "RGOj5yH7evk", // Git for Beginners
      title: "Git & GitHub Crash Course for Beginners",
      channel: "Traversy Media",
      description: "Learn the absolute basics of Git and GitHub, including configuration, initializing a repository, staging, committing, pushing, and working with branches.",
      duration: "30 mins",
      level: "Beginner"
    },
    {
      id: "f1wnYdLEpgI", // Advanced Git
      title: "Git Tutorial: Branching and Merging",
      channel: "Corey Schafer",
      description: "A deep dive into branching structures, fast-forward merges, 3-way merges, rebasing, and resolving merge conflicts without losing work.",
      duration: "18 mins",
      level: "Intermediate"
    },
    {
      id: "rgbCcBNZcdQ", // Pull requests
      title: "How to Make Your First Pull Request on GitHub",
      channel: "Kent C. Dodds",
      description: "Step-by-step guide to fork a repository, clone it locally, make changes, commit, push, create a pull request, and handle maintainer feedback.",
      duration: "10 mins",
      level: "Intermediate"
    },
    {
      id: "R8_veQiYBjI", // GitHub Actions
      title: "GitHub Actions CI/CD Tutorial for Beginners",
      channel: "TechWorld with Nana",
      description: "Understand continuous integration and continuous deployment using GitHub Actions, workflow triggers, runners, and configuration with YAML.",
      duration: "40 mins",
      level: "Advanced"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full space-y-12">
        {/* Title Block */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
            Git & GitHub Tutorials
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Master repository management, code collaboration, and CI/CD pipelines.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {tutorialVideos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-850 border border-gray-750/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300"
            >
              {/* Responsive Video Container */}
              <div className="relative pb-[56.25%] h-0 bg-gray-950">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-blue-400 font-mono">{video.channel}</span>
                    <span className={`px-2.5 py-0.5 rounded-full border ${
                      video.level === "Beginner" 
                        ? "border-green-500/30 text-green-400 bg-green-500/5" 
                        : video.level === "Intermediate"
                        ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/5"
                        : "border-purple-500/30 text-purple-400 bg-purple-500/5"
                    }`}>
                      {video.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white line-clamp-1">{video.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-750/20 flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span className="flex items-center">
                    <i className="far fa-clock mr-1.5 text-blue-500"></i>
                    {video.duration}
                  </span>
                  <span>Video Tutorial</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default Tutorials;
