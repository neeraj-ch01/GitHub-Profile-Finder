import React from "react";

const GitHubFinder = () => {
  const users = [
    {
      id: 1,
      username: "wood",
      profileImg: "https://via.placeholder.com/50", // Replace with actual images
    },
    {
      id: 2,
      username: "woodruffw",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      username: "gavofyork",
      profileImg: "https://via.placeholder.com/50",
    },
    // Add more users here...
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">GitHub Finder</h1>
        <div className="flex space-x-4">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
        </div>
      </nav>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for a user"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
            Go
          </button>
          <button className="text-gray-400 hover:text-white">Clear</button>
        </div>
      </div>

      {/* User Cards */}
      <div className="container mx-auto px-6 py-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 shadow-lg"
          >
            <img
              src={user.profileImg}
              alt={user.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <a
                href="#"
                className="text-blue-400 hover:underline text-sm"
              >
                Visit Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubFinder;