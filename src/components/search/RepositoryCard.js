import React from "react";
import { Link } from "react-router-dom";

const RepositoryCard = ({ repo }) => {
  return (
    <div
      className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <img
            src={repo.owner?.avatar_url}
            alt={repo.owner?.login}
            className="w-5 h-5 rounded-full"
          />
          <Link to={`/users/${repo.owner?.login}`} className="text-xs text-gray-450 hover:text-white font-mono">
            {repo.owner?.login}
          </Link>
        </div>
        <Link
          to={`/repos/${repo.owner?.login}/${repo.name}`}
          className="text-lg font-bold text-white hover:text-blue-450 hover:underline block truncate"
        >
          {repo.name}
        </Link>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-750/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span className="text-xs text-gray-450">{repo.language || "Unknown"}</span>
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
    </div>
  );
};

export default RepositoryCard;
