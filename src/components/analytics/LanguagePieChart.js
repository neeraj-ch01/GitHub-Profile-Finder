import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#19FFD5', '#D5FF19'];

const renderCustomizedLabel = ({ x, y, textAnchor, name, percent, fill }) => {
  const words = name.split(' ');
  const percentage = `${(percent * 100).toFixed(0)}%`;
  const xOffset = textAnchor === 'start' ? 12 : -12;

  return (
    <text x={x + xOffset} y={y} fill={fill} textAnchor={textAnchor} dominantBaseline="central" fontSize={14}>
      {words.map((word, i) => (
        <tspan x={x + xOffset} dy={i === 0 ? 0 : 18} key={i}>
          {word}
        </tspan>
      ))}
      <tspan x={x + xOffset} dy={18} fill={fill} fontWeight="bold">
        {percentage}
      </tspan>
    </text>
  );
};

const LanguagePieChart = ({ languageData }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Language Distribution
      </h2>
      <div className="flex-grow min-h-[400px]">
        {languageData && languageData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 50, left: 50, bottom: 0 }}>
              <Pie
                data={languageData}
                cx="50%"
                cy="45%"
                innerRadius={90}
                outerRadius={130}
                paddingAngle={5}
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No language data available</div>
        )}
      </div>
    </div>
  );
};

export default LanguagePieChart;
