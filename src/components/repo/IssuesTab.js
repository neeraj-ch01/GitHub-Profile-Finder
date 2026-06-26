import React from "react";
import { Link } from "react-router-dom";

const IssuesTab = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="p-8 text-center text-gray-450 italic">
        No open issues found in this repository.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-750/30">
      {issues.map((issue) => (
        <div key={issue.id} className="p-5 flex items-start justify-between hover:bg-gray-800/10">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xs font-semibold px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded">
                <i className="far fa-dot-circle mr-1"></i> {issue.state}
              </span>
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hover:text-blue-450 hover:underline leading-snug line-clamp-1"
              >
                {issue.title}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>#{issue.id}</span>
              <span>opened on {new Date(issue.created_at).toLocaleDateString()}</span>
              <span>by</span>
              {issue.user && (
                <Link to={`/users/${issue.user.login}`} className="text-gray-300 font-semibold hover:underline">
                  {issue.user.login}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssuesTab;
