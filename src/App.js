import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import SearchProfiles from './components/search/SearchProfiles';
import UserProfile from './components/profile/UserProfile';
import RepoDetail from './components/repo/RepoDetail';
import Tutorials from './components/tutorials/Tutorials';
import ScrollToTop from './components/common/ScrollToTop';
import AnalyticsSearch from './components/analytics/AnalyticsSearch';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-gray-900 text-white min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-profiles" element={<SearchProfiles />} />
          <Route path="/users/:userName" element={<UserProfile />} />
          <Route path="/repos/:owner/:repoName" element={<RepoDetail />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/analytics" element={<AnalyticsSearch />} />
          <Route path="/analytics/:userName" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
