import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 text-center py-10 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-400">© {new Date().getFullYear()} GitHub Finder Utility. Designed for Developers.</p>
      </div>
    </footer>
  );
};

export default Footer;
