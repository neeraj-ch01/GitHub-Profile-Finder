import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 p-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
          GitHub Profile Finder
        </Link>
        <div className="flex space-x-6 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/search-profiles" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`
            }
          >
            Search
          </NavLink>
          <NavLink 
            to="/tutorials" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`
            }
          >
            Tutorials
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
