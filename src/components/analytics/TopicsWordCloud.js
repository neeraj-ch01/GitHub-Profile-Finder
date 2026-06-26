import React from "react";
import WordCloud from "react-d3-cloud";

const wordCloudStyles = `
  .word-cloud-wrapper text {
    animation: wordFloat 3s ease-in-out infinite alternate;
  }
  .word-cloud-wrapper text:nth-child(even) {
    animation-duration: 4s;
    animation-delay: 0.5s;
    animation-direction: alternate-reverse;
  }
  .word-cloud-wrapper text:nth-child(3n) {
    animation-duration: 2.5s;
    animation-delay: 1s;
  }
  @keyframes wordFloat {
    0% { filter: drop-shadow(0 0 0px rgba(0,0,0,0)); opacity: 1; }
    33% { filter: drop-shadow(2px 0 2px rgba(0,0,0,0.2)); opacity: 0.8; }
    66% { filter: drop-shadow(-2px 0 2px rgba(0,0,0,0.2)); opacity: 0.9; }
    100% { filter: drop-shadow(0 0 0px rgba(0,0,0,0)); opacity: 1; }
  }
`;

const wordCloudColors = ['#1E3A8A', '#047857', '#BE185D', '#B45309', '#4C1D95', '#B91C1C', '#065F46', '#831843'];

const TopicsWordCloud = ({ topicData }) => {
  const maxTopicCount = topicData && topicData.length > 0 
    ? Math.max(...topicData.map(t => t.value), 1) 
    : 1;

  const fontSizeMapper = word => Math.floor(12 + (word.value / maxTopicCount) * 20);
  
  const rotate = word => {
    const text = word.text || '';
    if (text.length > 6 || text.includes('-')) {
      return 0;
    }
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 3 === 0 ? 90 : 0;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col">
      <style>{wordCloudStyles}</style>
      <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
        <svg className="w-5 h-5 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Repository Topics
      </h2>
      <div className="flex-grow flex items-center justify-center min-h-[250px]">
        <div className="h-[300px] max-w-[300px] w-full overflow-hidden text-center bg-transparent rounded-2xl p-2 word-cloud-wrapper">
          {topicData && topicData.length > 0 ? (
            <WordCloud
              data={topicData}
              width={300}
              height={300}
              font="sans-serif"
              fontWeight="bold"
              fontSize={fontSizeMapper}
              rotate={rotate}
              padding={3}
              spiral="rectangular"
              fill={(d, i) => wordCloudColors[i % wordCloudColors.length]}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">No topics found across repositories.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsWordCloud;
