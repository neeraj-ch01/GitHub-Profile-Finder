import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchProfiles from './components/SearchProfiles';
import UserProfile from './components/UserProfile';
import RepoDetail from './components/RepoDetail';
import Tutorials from './components/Tutorials';
import ScrollToTop from './components/ScrollToTop';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
