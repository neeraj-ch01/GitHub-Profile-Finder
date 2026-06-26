import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import githubService from "../services/githubService";
import LanguagesBreakdown from "./repo/LanguagesBreakdown";
import ReadmeTab from "./repo/ReadmeTab";
import CommitsTab from "./repo/CommitsTab";
import BranchesTab from "./repo/BranchesTab";
import IssuesTab from "./repo/IssuesTab";

const RepoDetail = () => {
  const { owner, repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [languages, setLanguages] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  // Tab contents state
  const [readme, setReadme] = useState(null);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [issues, setIssues] = useState([]);

  // Loaders
  const [loadingRepo, setLoadingRepo] = useState(true);
  const [loadingTab, setLoadingTab] = useState(false);
  const [errorRepo, setErrorRepo] = useState(null);
  const [errorTab, setErrorTab] = useState(null);

  // Fetch base repo details and languages
  useEffect(() => {
    const fetchBaseData = async () => {
      setLoadingRepo(true);
      setErrorRepo(null);
      try {
        const [repoData, languagesData] = await Promise.all([
          githubService.getRepoDetails(owner, repoName),
          githubService.getRepoLanguages(owner, repoName)
        ]);
        setRepo(repoData);
        setLanguages(languagesData || {});
      } catch (err) {
        console.error(err);
        setErrorRepo("Failed to fetch repository information. It may not exist, or you have hit the GitHub rate limit.");
      } finally {
        setLoadingRepo(false);
      }
    };
    fetchBaseData();
  }, [owner, repoName]);

  // Fetch tab-specific data on change
  useEffect(() => {
    if (!repo) return;

    const fetchTabData = async () => {
      setLoadingTab(true);
      setErrorTab(null);
      try {
        if (activeTab === "overview" && !readme) {
          try {
            const readmeData = await githubService.getRepoReadme(owner, repoName);
            setReadme(readmeData);
          } catch (e) {
            console.warn("No readme found:", e);
            setReadme(null);
          }
        } else if (activeTab === "commits" && commits.length === 0) {
          const commitsData = await githubService.getRepoCommits(owner, repoName);
          setCommits(commitsData || []);
        } else if (activeTab === "branches" && branches.length === 0) {
          const branchesData = await githubService.getRepoBranches(owner, repoName);
          setBranches(branchesData || []);
        } else if (activeTab === "issues" && issues.length === 0) {
          const issuesData = await githubService.getRepoIssues(owner, repoName);
          setIssues(issuesData || []);
        }
      } catch (err) {
        console.error("Tab data fetch failed:", err);
        setErrorTab("Could not retrieve details for this tab.");
      } finally {
        setLoadingTab(false);
      }
    };

    fetchTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, repo, owner, repoName]);

  const renderTabContent = () => {
    if (loadingTab) {
      return (
        <div className="py-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      );
    }

    if (errorTab) {
      return (
        <div className="py-12 text-center text-red-400 flex flex-col items-center justify-center space-y-2">
          <i className="fas fa-exclamation-triangle text-3xl"></i>
          <p>{errorTab}</p>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <ReadmeTab readme={readme} owner={owner} repoName={repoName} />;

      case "commits":
        return <CommitsTab commits={commits} />;

      case "branches":
        return <BranchesTab branches={branches} />;

      case "issues":
        return <IssuesTab issues={issues} />;

      default:
        return null;
    }
  };

  if (loadingRepo) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-400 font-semibold">Retrieving repository details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (errorRepo || !repo) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center bg-gray-850 border border-gray-750 p-10 rounded-2xl max-w-lg space-y-6">
            <i className="fas fa-search-minus text-red-550 text-5xl"></i>
            <h2 className="text-2xl font-bold">Repository Not Found</h2>
            <p className="text-gray-400">{errorRepo || "Could not load repository information."}</p>
            <Link to="/search-profiles" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md">
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

      <div className="max-w-5xl mx-auto px-6 py-12 flex-grow w-full space-y-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 flex items-center space-x-2">
          <Link to="/search-profiles" className="hover:text-white transition-colors">Search</Link>
          <span>/</span>
          <Link to={`/users/${owner}`} className="hover:text-white font-mono transition-colors">@{owner}</Link>
          <span>/</span>
          <span className="text-gray-200 font-bold">{repo.name}</span>
        </div>

        {/* Repository Main Details Card */}
        <div className="bg-gray-850 border border-gray-750/50 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3.5">
              <img
                src={repo.owner?.avatar_url}
                alt={owner}
                className="w-8 h-8 rounded-full border border-gray-700"
              />
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
                {repo.name}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-full text-gray-450 uppercase">
                Public
              </span>
            </div>
            {repo.description ? (
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {repo.description}
              </p>
            ) : (
              <p className="text-gray-500 italic text-sm">No description provided.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto font-medium">
            <div className="flex bg-gray-900 border border-gray-750 rounded-xl px-4 py-2 text-xs text-gray-300 shadow-sm items-center">
              <i className="far fa-star mr-2 text-yellow-500"></i>
              <span className="font-bold">{repo.stargazers_count}</span>
              <span className="text-gray-500 ml-1.5">stars</span>
            </div>
            <div className="flex bg-gray-900 border border-gray-750 rounded-xl px-4 py-2 text-xs text-gray-300 shadow-sm items-center">
              <i className="fas fa-code-branch mr-2 text-blue-500"></i>
              <span className="font-bold">{repo.forks_count}</span>
              <span className="text-gray-500 ml-1.5">forks</span>
            </div>
            <a
              href={`https://github.com/${owner}/${repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex bg-blue-600 hover:bg-blue-500 border border-blue-500/20 text-white rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10 items-center justify-center"
            >
              <i className="fab fa-github mr-2"></i>
              GitHub
            </a>
          </div>
        </div>

        {/* Languages Breakdown */}
        <LanguagesBreakdown languages={languages} />

        {/* Tabbed interface system */}
        <div className="space-y-4">
          {/* Tab Selection Row */}
          <div className="border-b border-gray-750 flex space-x-8 overflow-x-auto text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 font-bold border-b-2 transition-all flex items-center shrink-0 ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-450 hover:text-white"
              }`}
            >
              <i className="far fa-file-alt mr-2 text-xs"></i> README
            </button>
            <button
              onClick={() => setActiveTab("commits")}
              className={`pb-4 font-bold border-b-2 transition-all flex items-center shrink-0 ${
                activeTab === "commits"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-450 hover:text-white"
              }`}
            >
              <i className="fas fa-history mr-2 text-xs"></i> Commits
            </button>
            <button
              onClick={() => setActiveTab("branches")}
              className={`pb-4 font-bold border-b-2 transition-all flex items-center shrink-0 ${
                activeTab === "branches"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-450 hover:text-white"
              }`}
            >
              <i className="fas fa-code-branch mr-2 text-xs"></i> Branches
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`pb-4 font-bold border-b-2 transition-all flex items-center shrink-0 ${
                activeTab === "issues"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-450 hover:text-white"
              }`}
            >
              <i className="far fa-dot-circle mr-2 text-xs"></i> Open Issues
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="bg-gray-850 border border-gray-750/30 rounded-2xl overflow-hidden shadow-xl min-h-[300px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;

