import React from "react";

const BranchesTab = ({ branches }) => {
  if (!branches || branches.length === 0) {
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
};

export default BranchesTab;
