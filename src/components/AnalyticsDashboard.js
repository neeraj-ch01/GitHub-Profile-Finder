import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import apiClient from "../services/apiClient";
import { GitHubCalendar } from "react-github-calendar";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#19FFD5', '#D5FF19'];

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

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full p-6 md:p-10 flex-grow">
        <div className="flex items-center justify-between mb-10">
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

        {/* Heatmap Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Contribution Heatmap
          </h2>
          <div className="overflow-x-auto pb-4 flex justify-center">
            <GitHubCalendar
              username={userName}
              colorScheme="dark"
              blockSize={15}
              blockMargin={5}
              fontSize={14}
            />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Language Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Language Distribution
            </h2>
            <div className="flex-grow min-h-[300px]">
              {languageData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No language data available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Top Starred */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex-grow flex flex-col">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Top Starred Repositories
              </h2>
              <div className="flex-grow min-h-[250px]">
                {topStarredData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topStarredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value} />
                      <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                        cursor={{ fill: '#374151', opacity: 0.4 }}
                      />
                      <Bar dataKey="stars" fill="#FFBB28" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">No starred repositories</div>
                )}
              </div>
            </div>

            {/* Top Forked */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex-grow flex flex-col">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Most Forked Repositories
              </h2>
              <div className="flex-grow min-h-[250px]">
                {topForkedData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topForkedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value} />
                      <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                        cursor={{ fill: '#374151', opacity: 0.4 }}
                      />
                      <Bar dataKey="forks" fill="#00C49F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">No forked repositories</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
