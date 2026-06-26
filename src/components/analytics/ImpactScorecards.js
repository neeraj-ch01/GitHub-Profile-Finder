import React from "react";

const ImpactScorecards = ({ totalStars, totalForks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-yellow-500 to-orange-400 rounded-2xl py-3 px-5 shadow-xl flex items-center justify-between">
        <div>
          <p className="text-yellow-100 text-xs font-semibold uppercase tracking-wider mb-0.5">Total Stars Earned</p>
          <h3 className="text-3xl font-extrabold text-white">{totalStars.toLocaleString()}</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl py-3 px-5 shadow-xl flex items-center justify-between">
        <div>
          <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-0.5">Total Forks Accumulated</p>
          <h3 className="text-3xl font-extrabold text-white">{totalForks.toLocaleString()}</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImpactScorecards;
