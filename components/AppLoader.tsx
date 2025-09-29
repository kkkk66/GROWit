import React from 'react';
import { Logo } from './Logo';

export const AppLoader: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#5A7859] flex flex-col items-center justify-center p-4 font-sans">
      <div className="animate-pulse">
        <Logo className="w-32 h-32 sm:w-40 sm:h-40" />
      </div>
      <h1 
        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-6 text-white"
        style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.25)' }}
      >
        <span>
          GROW<span style={{color: '#92D050'}}>it</span>
        </span>
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-white/80">AI-Powered Social Media Optimizer</p>
    </div>
  );
};