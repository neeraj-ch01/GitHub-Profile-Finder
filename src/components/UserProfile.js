import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import githubService from "../services/githubService";

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

  // Helper to format GitHub Event items
  const renderEventDescription = (event) => {
    const repoName = event.repoName;
    const repoLink = `/repos/${repoName}`;
    const dateStr = new Date(event.createdAt).toLocaleDateString(undefined, {
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
            <i className="fas fa-user-slash text-red-550 text-5xl"></i>
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
          <div className="lg:col-span-1">
            <div className="bg-gray-850 border border-gray-750/50 rounded-2xl p-6 shadow-xl sticky top-24 backdrop-blur-md space-y-6">
              <div className="text-center lg:text-left space-y-4">
                <img
                  src={profile.avatarUrl}
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

          {/* Right Main Dashboard Panel */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-5 shadow-lg text-center">
                <span className="block text-xs uppercase tracking-wider text-gray-450 font-bold">Public Repos</span>
                <span className="text-3xl font-black text-white mt-1 block">
                  {profile.publicRepos}
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
                      <div
                        key={repo.id}
                        className="bg-gray-850 border border-gray-750/20 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300"
                      >
                        <div className="space-y-2">
                          <Link
                            to={`/repos/${profile.login}/${repo.name}`}
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
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Activity Feed (Takes 1/3) */}
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

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
