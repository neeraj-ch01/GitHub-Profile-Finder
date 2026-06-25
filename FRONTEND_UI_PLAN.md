# Frontend UI Implementation Ideas

This document outlines potential structures and features for the frontend to seamlessly consume the comprehensive backend API wrappers we are building.

## Core Layout & Navigation

### 1. Global Search Bar (The Core)
The application should center around a powerful, ubiquitous search experience.
- **Dynamic Search Bar:** Placed centrally on the home page and in the header on other pages.
- **Search Mode Dropdown:** Users can toggle between "Search Users" and "Search Repositories".
- **Advanced Filters Drawer:** A collapsible or off-canvas menu attached to the search bar. This allows users to construct complex queries:
  - `Location`
  - `Language`
  - `Company`
  - `Minimum Repositories`
  - (These inputs will map to the backend's `/api/github/search/users` query parameters).

## Main Views

### 2. User Profile Dashboard
When a user selects a profile from the search results, they navigate to a dedicated Profile Dashboard (data fed by `/api/github/users/{userName}`).

**Layout Recommendations:**
- **Sidebar (Profile Info):** Sticky sidebar displaying the `avatar`, `name`, `login`, `bio`, `company`, `location`, and a link to the original GitHub profile.
- **Stats Row:** Large counters for `followers`, `following`, and `public_repos`.
- **Repository Grid:** The main content area renders a grid or list of the user's repositories (data fed by `/api/github/users/{userName}/repos`).
  - Cards should display the repo name, description, language tag with color-coding, and star/fork counts.

### 3. Repository Deep-Dive Page
Clicking on a specific repository from the Profile Dashboard or Search Results navigates to a highly detailed Repository View (data fed by `/api/github/repos/{owner}/{repo}`).

**Tabbed Interface System:**
To prevent overwhelming the user, the repository details should be divided into tabs:
- **Overview (Readme):** Renders the markdown of the repository's README file (fetched via `/api/github/repos/{owner}/{repo}/readme`). We can use a library like `react-markdown` or `marked.js` to render the API's raw markdown output.
- **Issues:** Displays a list or Kanban-style view of open issues (fetched via `/api/github/repos/{owner}/{repo}/issues`). Shows issue titles, authors, and state (open/closed).
- **Commits:** A timeline UI showing the recent commit history (fetched via `/api/github/repos/{owner}/{repo}/commits`). Shows commit message, author avatar, and SHA hash.
- **Branches:** A simple list or dropdown showing active branches (fetched via `/api/github/repos/{owner}/{repo}/branches`).

## Pagination Handling
Since the search APIs are paginated, the frontend should implement:
- **Infinite Scrolling:** For mobile views or seamless browsing (fetching `page=1`, then `page=2` on scroll).
- **Standard Pagination Controls:** For tabular data (e.g., standard "Previous / Next" buttons).

## Next Steps
Once the backend APIs are finalized, the frontend team can mock these endpoints during initial UI development, mapping the JSON responses directly to state management (e.g., Redux, Context API, or React Query).

---

## UI Mockup & Endpoint Mapping
Based on the provided frontend mockups, here is how the views map to our implemented API endpoints:

### 1. Landing Page (Home)
- **Hero Section**: "Unlock GitHub Insights with Ease" - Static introductory content. The "Get Started Now" button will route the user to the Search Profiles page.
- **Trending Showcase (Suggested addition)**: We can use our newly created `GET /api/github/search/trending-repositories` endpoint to display a live "Trending Repositories" ticker or carousel directly on the home page.
- **Powerful Features Cards**:
  - **Profile Search**: Routes to the Search view.
  - **Repo Explorer**: Highlights the `/api/github/users/{userName}/repos` capabilities.
  - **Rich Analytics**: Teases analytical charts (see "Missing APIs" below for how to support this).
  - **Git & GitHub Tutorials**: Can be a static curated page of embedded YouTube tutorials.

### 2. Search Profiles Page
The search page offers two distinct UX paths:
- **"Search by Name"**: This will hit `GET /api/github/search/users?name={query}`. We can also integrate our advanced query parameters here (location, language, etc.) for a robust search experience.
- **"Search by GitHub Username"**: This will attempt to directly fetch `GET /api/github/users/{userName}`. If the user exists, we instantly bypass the search results and route them to their Profile Dashboard.

## Identified Missing APIs & Scope Expansion
After reviewing the planned features (like "Rich Analytics" and "Readme" rendering), we are currently missing a few crucial endpoints on the backend to fulfill the UI's promises:

1. **Repository Readme Endpoint (`GET /api/github/repos/{owner}/{repo}/readme`)**:
   - **Why we need it**: The "Overview" tab in the Repository Deep-Dive is supposed to render the README. We need an endpoint that calls the GitHub API and returns the raw Markdown or Base64 encoded content of the README file.
2. **Repository Languages Endpoint (`GET /api/github/repos/{owner}/{repo}/languages`)**:
   - **Why we need it**: The mockups mention "Rich Analytics" including "language distribution". GitHub provides an endpoint that returns the exact byte count of every programming language used in a repository. This is perfect for rendering beautiful Doughnut/Pie charts on the frontend using Chart.js or Recharts.
3. **User Recent Events / Activity (`GET /api/github/users/{userName}/events`)**:
   - **Why we need it**: To generate "contribution heatmaps" or an "Activity Feed", we need to fetch the user's recent public events (PushEvents, PullRequestEvents, etc.) from GitHub.

**Recommendation**: Before we transition fully to building the React frontend, we should quickly implement these 3 missing backend endpoints to ensure our frontend has all the data it needs to be truly "premium" and "rich".
