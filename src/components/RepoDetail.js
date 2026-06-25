import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import Navbar from "./Navbar";
import githubService from "../services/githubService";

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#3178c6",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Kotlin: "#A97BFF",
  Swift: "#F05138"
};

const getLangColor = (lang) => LANGUAGE_COLORS[lang] || "#858585";

const decodeReadme = (readmeDto) => {
  if (!readmeDto || !readmeDto.content) return "";
  if (readmeDto.encoding === "base64") {
    try {
      const cleanBase64 = readmeDto.content.replace(/\s/g, "");
      return decodeURIComponent(
        atob(cleanBase64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (e) {
      console.error("Base64 decoding failed:", e);
      try {
        return atob(readmeDto.content.replace(/\s/g, ""));
      } catch (err) {
        return readmeDto.content;
      }
    }
  }
  return readmeDto.content;
};

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

  // Calculations for Language distribution
  const renderLanguagesBar = () => {
    if (!languages || Object.keys(languages).length === 0) return null;
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    return (
      <div className="bg-gray-850 border border-gray-750/30 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-450">Languages</h3>
        {/* Horizontal Stacked Progress Bar */}
        <div className="w-full h-3 rounded-full flex overflow-hidden bg-gray-750">
          {Object.entries(languages).map(([lang, bytes]) => {
            const percentage = ((bytes / totalBytes) * 100).toFixed(1);
            return (
              <div
                key={lang}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getLangColor(lang)
                }}
                title={`${lang}: ${percentage}%`}
                className="h-full"
              ></div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {Object.entries(languages).map(([lang, bytes]) => {
            const percentage = ((bytes / totalBytes) * 100).toFixed(1);
            return (
              <div key={lang} className="flex items-center space-x-2 text-xs font-semibold">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getLangColor(lang) }}
                ></span>
                <span className="text-gray-300">{lang}</span>
                <span className="text-gray-500">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
        if (!readme) {
          return (
            <div className="p-8 text-center text-gray-450 italic">
              No README.md found in the root directory.
            </div>
          );
        }
        try {
          const rawMarkdown = decodeReadme(readme);
          const html = marked.parse(rawMarkdown);
          return (
            <div
              className="p-8 prose prose-invert max-w-none text-gray-300 break-words"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <div className="p-8 text-red-400">Failed to render README.md.</div>;
        }

      case "commits":
        if (commits.length === 0) {
          return (
            <div className="p-8 text-center text-gray-450 italic">
              No commits found or unable to access commit history.
            </div>
          );
        }
        return (
          <div className="divide-y divide-gray-750/30">
            {commits.map((commitItem) => (
              <div key={commitItem.sha} className="p-5 hover:bg-gray-800/10 transition-colors flex justify-between items-start">
                <div className="space-y-1.5 pr-4 overflow-hidden">
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {commitItem.commit?.message}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-450">
                    {commitItem.author?.avatarUrl ? (
                      <img
                        src={commitItem.author.avatarUrl}
                        alt={commitItem.commit?.author?.name}
                        className="w-4 h-4 rounded-full"
                      />
                    ) : (
                      <span className="text-gray-600"><i className="fas fa-user-circle"></i></span>
                    )}
                    <span className="font-semibold text-gray-300">{commitItem.commit?.author?.name}</span>
                    <span>committed on {new Date(commitItem.commit?.author?.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <a
                  href={commitItem.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-lg text-blue-400 hover:bg-gray-800 shrink-0 shadow-sm"
                >
                  {commitItem.sha?.substring(0, 7)}
                </a>
              </div>
            ))}
          </div>
        );

      case "branches":
        if (branches.length === 0) {
          return (
            <div className="p-8 text-center text-gray-450 italic">
              No branches found.
            </div>
          );
        }
        return (
          <div className="divide-y divide-gray-750/30">
            {branches.map((branch) => (
              <div key={branch.name} className="p-5 flex justify-between items-center hover:bg-gray-800/10">
                <div className="flex items-center space-x-2.5">
                  <span className="text-gray-500"><i className="fas fa-code-branch"></i></span>
                  <span className="text-sm font-bold text-gray-200 font-mono">{branch.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>Last commit:</span>
                  <span className="font-mono bg-gray-900 px-2.5 py-1 border border-gray-700/50 rounded-md text-gray-400">
                    {branch.commit?.sha?.substring(0, 7)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "issues":
        if (issues.length === 0) {
          return (
            <div className="p-8 text-center text-gray-450 italic">
              No open issues found in this repository.
            </div>
          );
        }
        return (
          <div className="divide-y divide-gray-750/30">
            {issues.map((issue) => (
              <div key={issue.id} className="p-5 flex items-start justify-between hover:bg-gray-800/10">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 text-xs font-semibold px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded">
                      <i className="far fa-dot-circle mr-1"></i> {issue.state}
                    </span>
                    <a
                      href={issue.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-blue-450 hover:underline leading-snug line-clamp-1"
                    >
                      {issue.title}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>#{issue.id}</span>
                    <span>opened on {new Date(issue.createdAt).toLocaleDateString()}</span>
                    <span>by</span>
                    {issue.user && (
                      <Link to={`/users/${issue.user.login}`} className="text-gray-300 font-semibold hover:underline">
                        {issue.user.login}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

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
        {renderLanguagesBar()}

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
