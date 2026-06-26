import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../common/Navbar";
import githubService from "../../services/githubService";
import ProfileSidebar from "./ProfileSidebar";
import ProfileStats from "./ProfileStats";
import ActivityFeed from "./ActivityFeed";
import UserRepoCard from "./UserRepoCard";
import Footer from "../common/Footer";

const UserProfile = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch User Details, Repositories, and Recent Events concurrently
        const [profileData, reposData, eventsData] = await Promise.all([
          githubService.getUserDetails(userName),
          githubService.getUserRepos(userName),
          githubService.getUserEvents(userName)
        ]);

        setProfile(profileData);
        // Sort repos by stars descending
        const sortedRepos = (reposData || []).sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepos(sortedRepos);
        setEvents(eventsData || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. This user may not exist, or you have hit the GitHub rate limit.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userName]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-400 font-semibold">Loading developer profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center bg-gray-850 border border-gray-750 p-10 rounded-2xl max-w-lg space-y-6">
            <i className="fas fa-user-slash text-red-555 text-5xl"></i>
            <h2 className="text-2xl font-bold">Profile Unavailable</h2>
            <p className="text-gray-400">{error || "Could not retrieve user details."}</p>
            <Link to="/search-profiles" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/10">
              Return to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <Link to="/search-profiles" className="hover:text-white transition-colors">Search</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">@{profile.login}</span>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar: Profile Card */}
          <ProfileSidebar profile={profile} />

          {/* Right Main Dashboard Panel */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats Row */}
            <ProfileStats profile={profile} />

            {/* Split Repos vs Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Left Column: Repository Grid (Takes 2/3) */}
              <div className="xl:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <i className="fas fa-book-open mr-2.5 text-blue-500"></i> Repositories ({repos.length})
                </h2>

                {repos.length === 0 ? (
                  <div className="bg-gray-850 border border-gray-750/30 p-8 rounded-2xl text-center text-gray-450">
                    This user doesn't have any public repositories yet.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {repos.map((repo) => (
                      <UserRepoCard key={repo.id} repo={repo} login={profile.login} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Activity Feed (Takes 1/3) */}
              <ActivityFeed events={events} />

            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;

