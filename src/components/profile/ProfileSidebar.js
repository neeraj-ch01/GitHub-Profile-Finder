import React from "react";

const ProfileSidebar = ({ profile }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-850 border border-gray-750/50 rounded-2xl p-6 shadow-xl sticky top-24 backdrop-blur-md space-y-6">
        <div className="text-center lg:text-left space-y-4">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl mx-auto lg:mx-0 border-2 border-gray-700 shadow-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {profile.name || profile.login}
            </h1>
            <span className="text-sm text-blue-450 font-mono block mt-1">@{profile.login}</span>
          </div>
        </div>

        {profile.bio && (
          <p className="text-sm text-gray-400 leading-relaxed border-t border-gray-700/50 pt-4">
            {profile.bio}
          </p>
        )}

        <div className="space-y-3.5 text-sm text-gray-400 border-t border-gray-700/50 pt-4 font-medium">
          {profile.company && (
            <div className="flex items-center">
              <span className="w-6 text-purple-500"><i className="fas fa-building"></i></span>
              <span className="truncate">{profile.company}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center">
              <span className="w-6 text-blue-500"><i className="fas fa-map-marker-alt"></i></span>
              <span className="truncate">{profile.location}</span>
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center">
              <span className="w-6 text-teal-500"><i className="fas fa-link"></i></span>
              <a
                href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-450 hover:underline truncate"
              >
                {profile.blog.replace(/(^\w+:|^)\/\//, "")}
              </a>
            </div>
          )}
        </div>

        <div className="pt-2">
          <a
            href={`https://github.com/${profile.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-xl font-bold text-center block text-sm transition-all text-white"
          >
            <i className="fab fa-github mr-2"></i> View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
