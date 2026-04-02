import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarPage from './components/Navbar';
import GitHubFinder from './components/GitHubFinderResults';
import HomePage from './components/HomePage';
import SearchProfiles from './components/SearchProfiles';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/github-profile-finder-results" element={<GitHubFinder />} /> 
          <Route path="/search-profiles" element= {<SearchProfiles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


