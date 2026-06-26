import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import apiClient from "../services/apiClient";
import ImpactScorecards from "./analytics/ImpactScorecards";
import ProfileBanner from "./analytics/ProfileBanner";
import LanguagePieChart from "./analytics/LanguagePieChart";
import TopicsWordCloud from "./analytics/TopicsWordCloud";
import RepoBarChart from "./analytics/RepoBarChart";
import Footer from "./common/Footer";

const AnalyticsDashboard = () => {
  const { userName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/github/analytics/${userName}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [userName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center flex-col p-6 text-center">
          <svg className="w-20 h-20 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-red-400 mb-4">Analytics Not Found</h2>
          <p className="text-gray-400 max-w-md">{error}</p>
          <Link to="/analytics" className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Try Another User
          </Link>
        </div>
      </div>
    );
  }

  // Format Language Data for Recharts
  const languageData = Object.entries(data.languageDistribution || {}).map(([key, value]) => ({
    name: key,
    value: value
  })).sort((a, b) => b.value - a.value);

  // Format Top Starred Data
  const topStarredData = (data.topStarredRepos || []).map(repo => ({
    name: repo.name,
    stars: repo.stargazers_count
  }));

  // Format Top Forked Data
  const topForkedData = (data.topForkedRepos || []).map(repo => ({
    name: repo.name,
    forks: repo.forks_count
  }));

  const totalStars = data.totalStars || 0;
  const totalForks = data.totalForks || 0;

  // Format Topic Data
  const topicData = Object.entries(data.topicDistribution || {})
    .map(([key, value]) => ({ text: key, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-2 md:px-10 md:py-4 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {userName}'s Analytics
            </h1>
            <p className="text-gray-400 mt-2">Deep dive into coding habits and popular repositories</p>
          </div>
          <Link to="/analytics" className="hidden md:flex items-center text-blue-400 hover:text-blue-300">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </Link>
        </div>

        {/* Impact Scorecards */}
        <ImpactScorecards totalStars={totalStars} totalForks={totalForks} />

        {/* Profile Banner & Heatmap Section */}
        <ProfileBanner userName={userName} avatarUrl={data.avatarUrl} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <LanguagePieChart languageData={languageData} />
            <TopicsWordCloud topicData={topicData} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <RepoBarChart 
              data={topStarredData} 
              dataKey="stars" 
              fill="#FFBB28" 
              title="Top Starred Repositories" 
              icon={
                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
              emptyMessage="No starred repositories"
            />
            <RepoBarChart 
              data={topForkedData} 
              dataKey="forks" 
              fill="#00C49F" 
              title="Most Forked Repositories" 
              icon={
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              emptyMessage="No forked repositories"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsDashboard;

