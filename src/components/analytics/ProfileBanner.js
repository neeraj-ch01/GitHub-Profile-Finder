import React from "react";
import { GitHubCalendar } from "react-github-calendar";

const ProfileBanner = ({ userName, avatarUrl }) => {
  return (
    <div className="relative bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden mb-4 shadow-xl">
      {/* Top Banner Ribbon */}
      <div className="h-28 bg-gradient-to-r from-emerald-500 to-teal-400 w-full absolute top-0 left-0 z-0"></div>

      <div className="pt-28 px-6 md:px-10 pb-8 flex flex-col xl:flex-row items-center xl:items-start gap-8 relative z-10 bg-gray-800/80 backdrop-blur-sm">
        {/* Avatar Profile */}
        <div className="flex flex-col items-center -mt-16 z-20 xl:w-1/4">
          <img
            src={avatarUrl || `https://github.com/${userName}.png`}
            alt={userName}
            className="w-36 h-36 rounded-full border-4 border-gray-800 bg-gray-900 shadow-2xl object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-white text-center">{userName}</h2>
          <a href={`https://github.com/${userName}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-sm mt-1">
            View GitHub Profile
          </a>
        </div>

        {/* Heatmap Area */}
        <div className="flex-grow w-full overflow-x-auto bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-700/50 shadow-inner">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
            <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Contribution Heatmap
          </h3>
          <div className="flex justify-center xl:justify-start">
            <GitHubCalendar
              username={userName}
              colorScheme="dark"
              blockSize={11}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
