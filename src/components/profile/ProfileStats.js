import React from "react";

const ProfileStats = ({ profile }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-5 shadow-lg text-center">
        <span className="block text-xs uppercase tracking-wider text-gray-450 font-bold">Public Repos</span>
        <span className="text-3xl font-black text-white mt-1 block">
          {profile.public_repos}
        </span>
      </div>
      <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-5 shadow-lg text-center">
        <span className="block text-xs uppercase tracking-wider text-gray-450 font-bold">Followers</span>
        <span className="text-3xl font-black text-white mt-1 block">
          {profile.followers}
        </span>
      </div>
      <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-5 shadow-lg text-center">
        <span className="block text-xs uppercase tracking-wider text-gray-450 font-bold">Following</span>
        <span className="text-3xl font-black text-white mt-1 block">
          {profile.following}
        </span>
      </div>
    </div>
  );
};

export default ProfileStats;
