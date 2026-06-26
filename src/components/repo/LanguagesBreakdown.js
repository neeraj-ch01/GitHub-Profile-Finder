import React from "react";

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

const LanguagesBreakdown = ({ languages }) => {
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

export default LanguagesBreakdown;
