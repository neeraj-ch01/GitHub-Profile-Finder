import React from "react";

const CommitsTab = ({ commits }) => {
  if (!commits || commits.length === 0) {
    return (
      <div className="p-8 text-center text-gray-450 italic">
        No commits found or unable to access commit history.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-750/30">
      {commits.map((commitItem) => (
        <div key={commitItem.sha} className="p-5 hover:bg-gray-800/10 transition-colors flex justify-between items-start">
          <div className="space-y-1.5 pr-4 overflow-hidden">
            <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
              {commitItem.commit?.message}
            </h4>
            <div className="flex items-center space-x-2 text-xs text-gray-450">
              {commitItem.author?.avatar_url ? (
                <img
                  src={commitItem.author.avatar_url}
                  alt={commitItem.commit?.author?.name}
                  className="w-4 h-4 rounded-full"
                />
              ) : (
                <span className="text-gray-600"><i className="fas fa-user-circle"></i></span>
              )}
              <span className="font-semibold text-gray-300">{commitItem.commit?.author?.name}</span>
              <span>committed on {new Date(commitItem.commit?.author?.date).toLocaleDateString()}</span>
            </div>
          </div>
          <a
            href={commitItem.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-lg text-blue-400 hover:bg-gray-800 shrink-0 shadow-sm"
          >
            {commitItem.sha?.substring(0, 7)}
          </a>
        </div>
      ))}
    </div>
  );
};

export default CommitsTab;
