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
