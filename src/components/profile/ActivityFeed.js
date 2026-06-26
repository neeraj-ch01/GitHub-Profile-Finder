import React from "react";
import { Link } from "react-router-dom";

const renderEventDescription = (event) => {
  const repoName = event.repo?.name || "unknown/repository";
  const repoLink = `/repos/${repoName}`;
  const dateStr = new Date(event.created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

  switch (event.type) {
    case "PushEvent":
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-blue-500 mt-1"><i className="fas fa-arrow-up"></i></span>
          <div>
            <p className="text-gray-300">
              Pushed to <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
    case "CreateEvent":
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-green-500 mt-1"><i className="fas fa-plus"></i></span>
          <div>
            <p className="text-gray-300">
              Created repository <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
    case "WatchEvent":
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-yellow-500 mt-1"><i className="fas fa-star"></i></span>
          <div>
            <p className="text-gray-300">
              Starred <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
    case "PullRequestEvent":
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-purple-500 mt-1"><i className="fas fa-code-branch"></i></span>
          <div>
            <p className="text-gray-300">
              Opened PR in <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
    case "IssuesEvent":
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-red-500 mt-1"><i className="fas fa-exclamation-circle"></i></span>
          <div>
            <p className="text-gray-300">
              Created issue in <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-start space-x-3 text-sm">
          <span className="text-gray-500 mt-1"><i className="fas fa-info-circle"></i></span>
          <div>
            <p className="text-gray-300">
              Activity in <Link to={repoLink} className="text-blue-400 hover:underline">{repoName.split("/")[1]}</Link>
            </p>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
        </div>
      );
  }
};

const ActivityFeed = ({ events }) => {
  return (
    <div className="xl:col-span-1 space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center">
        <i className="fas fa-bolt mr-2.5 text-yellow-500"></i> Recent Activity
      </h2>

      {events.length === 0 ? (
        <div className="bg-gray-850 border border-gray-750/30 p-8 rounded-2xl text-center text-gray-450 text-sm">
          No recent events found.
        </div>
      ) : (
        <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 shadow-md space-y-6 max-h-[500px] overflow-y-auto">
          {events.slice(0, 10).map((event) => (
            <div key={event.id} className="border-l border-gray-750 pl-4 py-0.5 relative">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-600"></div>
              {renderEventDescription(event)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
