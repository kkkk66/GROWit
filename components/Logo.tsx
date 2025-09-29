import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 85" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00AEEF" />
          <stop offset="100%" stopColor="#0072BC" />
        </linearGradient>
        <linearGradient id="logoGreenGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92D050" />
          <stop offset="100%" stopColor="#00B050" />
        </linearGradient>
      </defs>
      
      {/* Left (Blue) part of the arrow */}
      <path 
        fill="url(#logoBlueGradient)"
        d="M50 0 L50 43.4 C38.3 48.3 31.4 60.3 28 72 C37.8 62.4 45.9 46.2 50 0 Z"
      />
      
      {/* Right (Green) part of the arrow */}
      <path 
        fill="url(#logoGreenGradient)"
        d="M50 0 L50 43.4 C61.7 48.3 68.6 60.3 72 72 C62.2 62.4 54.1 46.2 50 0 Z"
      />
    </svg>
  );
};