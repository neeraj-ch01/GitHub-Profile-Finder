import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center items-center space-x-4">
      <button
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border border-gray-750 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg font-semibold transition-all"
      >
        <i className="fas fa-chevron-left mr-1"></i> Previous
      </button>
      <span className="text-sm text-gray-400 font-semibold">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 border border-gray-750 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg font-semibold transition-all"
      >
        Next <i className="fas fa-chevron-right ml-1"></i>
      </button>
    </div>
  );
};

export default Pagination;
