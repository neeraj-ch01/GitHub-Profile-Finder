import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL 
  ? `${process.env.REACT_APP_API_BASE_URL}/api/github` 
  : '/api/github';

const githubService = {
  // Search Users
  searchUsers: (name, location, language, company, minRepos, page = 1, size = 30) => {
    const params = {};
    if (name) params.name = name;
    if (location) params.location = location;
    if (language) params.language = language;
    if (company) params.company = company;
    if (minRepos) params.minRepos = minRepos;
    params.page = page;
    params.size = size;

    return axios.get(`${API_BASE}/search/users`, { params }).then(res => res.data);
  },

  // Search Repositories
  searchRepositories: (q, page = 1, size = 30) => {
    return axios.get(`${API_BASE}/search/repositories`, {
      params: { q, page, size }
    }).then(res => res.data);
  },

  // Get Trending Repositories
  getTrendingRepositories: (language, since = 'weekly', page = 1, size = 10) => {
    const params = { since, page, size };
    if (language) params.language = language;
    return axios.get(`${API_BASE}/search/trending-repositories`, { params }).then(res => res.data);
  },

  // Get User Details
  getUserDetails: (userName) => {
    return axios.get(`${API_BASE}/users/${userName}`).then(res => res.data);
  },

  // Get User Events (Activity Feed)
  getUserEvents: (userName) => {
    return axios.get(`${API_BASE}/users/${userName}/events`).then(res => res.data);
  },

  // Get User Repositories
  getUserRepos: (userName) => {
    return axios.get(`${API_BASE}/users/${userName}/repos`).then(res => res.data);
  },

  // Get Repository Details
  getRepoDetails: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}`).then(res => res.data);
  },

  // Get Repository Issues
  getRepoIssues: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}/issues`).then(res => res.data);
  },

  // Get Repository Commits
  getRepoCommits: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}/commits`).then(res => res.data);
  },

  // Get Repository Branches
  getRepoBranches: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}/branches`).then(res => res.data);
  },

  // Get Repository README
  getRepoReadme: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}/readme`).then(res => res.data);
  },

  // Get Repository Languages
  getRepoLanguages: (owner, repo) => {
    return axios.get(`${API_BASE}/repos/${owner}/${repo}/languages`).then(res => res.data);
  }
};

export default githubService;
