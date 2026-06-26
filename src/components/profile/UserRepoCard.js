import React from "react";
import { Link } from "react-router-dom";

const UserRepoCard = ({ repo, login }) => {
  return (
    <div
      className="bg-gray-850 border border-gray-750/20 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300"
    >
      <div className="space-y-2">
        <Link
          to={`/repos/${login}/${repo.name}`}
          className="text-base font-bold text-white hover:text-blue-450 hover:underline block truncate"
        >
          {repo.name}
        </Link>
        {repo.description ? (
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {repo.description}
          </p>
        ) : (
          <p className="text-xs text-gray-500 italic">No description provided.</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-750/20 text-xs">
        {repo.language ? (
          <span className="flex items-center text-gray-450">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>
            {repo.language}
          </span>
        ) : (
          <span className="text-gray-500">Plain text</span>
        )}

        <div className="flex items-center space-x-3 text-gray-450 font-medium">
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

export default UserRepoCard;
