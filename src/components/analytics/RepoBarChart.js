import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RepoBarChart = ({ data, dataKey, fill, title, icon, emptyMessage }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex-grow flex flex-col">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        {icon}
        {title}
      </h2>
      <div className="flex-grow min-h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                interval={0} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value} 
              />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                cursor={{ fill: '#374151', opacity: 0.4 }}
              />
              <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
};

export default RepoBarChart;
