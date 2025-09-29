import React from 'react';

interface HeaderProps {
    onShowHistory: () => void;
    onShowSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowHistory, onShowSettings }) => {
  
  return (
    <header className="w-full max-w-4xl relative text-center z-10">
      <h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-800"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
      >
        <span>
          GROW<span style={{color: '#84C441'}}>it</span>
        </span>
      </h1>
      <p className="mt-2 text-base sm:text-lg text-gray-600">AI-Powered Social Media Optimizer</p>
      
      <div className="mt-4 sm:mt-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-0 flex items-center justify-center gap-2">
          <button
            onClick={onShowHistory}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white/80 rounded-lg shadow-md hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm"
            title="View generation history"
            aria-label="View generation history"
          >
            History
          </button>
          <button
            onClick={onShowSettings}
            className="p-2 text-sm font-semibold text-gray-700 bg-white/80 rounded-full shadow-md hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm"
            title="Settings"
            aria-label="Open settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8.21 5.15c-.9.22-1.75.58-2.5.99L3.93 5.3c-1.42-.7-3.13.7-2.43 2.12l1.16 2.47c-.41.75-.77 1.6-1 2.5L.47 12.07c-.7 1.42.7 3.13 2.12 2.43l2.47-1.16c.75.41 1.6.77 2.5 1l-1.98 2.3c-1.56.38-1.56 2.6 0 2.98l1.98.3c.22.9.58 1.75 1 2.5l-1.16 2.47c-.7 1.42.7 3.13 2.12 2.43l2.47-1.16c.75.41 1.6.77 2.5 1l-1.98 2.3c-1.56.38-1.56 2.6 0 2.98l1.98.3c.9.22 1.75.58 2.5 1l-1.16 2.47c-.7 1.42.7 3.13 2.12 2.43l2.47-1.16c.75-.41 1.6-.77 2.5-1l1.98-2.3c1.56-.38 1.56-2.6 0-2.98l-1.98-.3c-.22-.9-.58-1.75-1-2.5l1.16-2.47c.7-1.42-.7-3.13-2.12-2.43l-2.47 1.16c-.75-.41-1.6-.77-2.5-1l1.98-2.3c1.56-.38 1.56-2.6 0-2.98l-1.98-.3c-.9-.22-1.75-.58-2.5-1l1.16-2.47c.7-1.42-.7-3.13-2.12-2.43L14.7 6.14c-.75.41-1.6.77-2.5-1L11.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
      </div>
    </header>
  );
};