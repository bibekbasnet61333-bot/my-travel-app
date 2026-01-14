import React from 'react';

const ReadingProgress = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
