import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div
      className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-start space-x-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-2xl border border-gray-700"
        />
        <div className="overflow-hidden">
          <Link to={`/users/${user.login}`} className="text-lg font-bold text-white hover:text-blue-450 hover:underline block truncate">
            {user.name || user.login}
          </Link>
          <span className="text-xs text-gray-450 block mb-2 font-mono">@{user.login}</span>
          {user.bio && (
            <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-750/20 flex flex-wrap gap-2 text-xs text-gray-400">
        {user.location && (
          <span className="flex items-center bg-gray-900 px-2.5 py-1 rounded-md border border-gray-700/50">
            <i className="fas fa-map-marker-alt mr-1.5 text-blue-500"></i>
            {user.location}
          </span>
        )}
        {user.company && (
          <span className="flex items-center bg-gray-900 px-2.5 py-1 rounded-md border border-gray-700/50 truncate max-w-[150px]">
            <i className="fas fa-building mr-1.5 text-purple-500"></i>
            {user.company}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserCard;
