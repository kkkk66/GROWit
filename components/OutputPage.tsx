
import React from 'react';
import { ResponseDisplay } from './ResponseDisplay';
import type { OptimizationResult, UserInput } from '../types';

interface OutputPageProps {
  result: OptimizationResult;
  onBack: () => void;
  isViewingHistory: boolean;
  input: UserInput;
}

const AdPlaceholder: React.FC = () => (
  <div className="my-6 w-full max-w-2xl mx-auto">
    <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-200">
      {/* Google AdSense code can be integrated here */}
      <p className="text-gray-400 font-medium text-sm tracking-wider">ADVERTISEMENT</p>
    </div>
  </div>
);

export const OutputPage: React.FC<OutputPageProps> = ({ result, input, onBack, isViewingHistory }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 overflow-y-auto flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {isViewingHistory ? '📜 Viewing Past Generation' : '🚀 Your Optimized Content is Ready!'}
        </h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Request Summary</h3>
          <div className="space-y-2 text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <p><strong className="font-medium text-gray-800">Topic:</strong> {input.topic}</p>
            {input.targetAudience && <p><strong className="font-medium text-gray-800">Audience:</strong> {input.targetAudience}</p>}
            <p><strong className="font-medium text-gray-800">Language:</strong> {input.language}</p>
            <p className="sm:col-span-2"><strong className="font-medium text-gray-800">Platforms:</strong> {input.platforms.map(p => p.replace(/_/g, ' ')).join(', ')}</p>
          </div>
        </div>

        <ResponseDisplay data={result} />
        <AdPlaceholder />
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isViewingHistory ? '← Back to History' : 'Generate New Content'}
        </button>
      </div>
    </div>
  );
};
