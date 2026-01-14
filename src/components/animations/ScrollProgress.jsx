import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollAnimation';

const ScrollProgress = ({
  className = '',
  height = '4px',
  color = 'from-blue-500 via-purple-500 to-pink-500',
  showPercentage = false
}) => {
  const progress = useScrollProgress();

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      <div
        className={`h-${height} bg-gradient-to-r ${color}`}
        style={{
          width: `${progress}%`,
          transition: 'width 0.1s ease-out'
        }}
      />
      {showPercentage && (
        <div className="absolute top-2 right-4 text-white text-sm font-mono bg-black/50 px-2 py-1 rounded">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;
