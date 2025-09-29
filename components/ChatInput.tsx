import React, { useState } from 'react';
import type { UserInput, Platform } from '../types';

interface ChatInputProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
  apiKey: string;
  defaultUsage: { count: number; date: string };
}

const languages = [
  'English', 'Hindi', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean', 'Russian', 'Arabic', 'Portuguese'
];

const platforms: { id: Platform; label: string }[] = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'youtube_shorts', label: 'YouTube Shorts' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'snapchat', label: 'Snapchat' },
  { id: 'tiktok', label: 'TikTok' },
];

const MAX_DEFAULT_USES = 5;

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading, apiKey, defaultUsage }) => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] =useState('');
  const [language, setLanguage] = useState('English');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['youtube']);

  const handlePlatformChange = (platformId: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && selectedPlatforms.length > 0) {
      onSubmit({ topic, targetAudience, language, platforms: selectedPlatforms });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const remainingUses = MAX_DEFAULT_USES - (defaultUsage.date === today ? defaultUsage.count : 0);
  const showUsage = !apiKey && defaultUsage.date === today && remainingUses > 0;
  const noUsesLeft = !apiKey && defaultUsage.date === today && remainingUses <= 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Content Topic (e.g., 'Weight Loss Tips')"
          className="w-full p-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-green-500 focus:ring-green-500 focus:outline-none transition placeholder-gray-500 text-gray-900"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Target Audience (e.g., 'Females, 18-30')"
            className="w-full p-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-green-500 focus:ring-green-500 focus:outline-none transition placeholder-gray-500 text-gray-900"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-green-500 focus:ring-green-500 focus:outline-none transition text-gray-800"
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms:</label>
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-gray-100 rounded-lg">
           {platforms.map(({ id, label }) => {
             const isSelected = selectedPlatforms.includes(id);
             return (
                <button
                  type="button"
                  key={id}
                  onClick={() => handlePlatformChange(id)}
                  className={`px-5 py-2.5 w-32 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-pressed={isSelected}
                >
                  {label}
                </button>
             );
          })}
        </div>
      </div>
      
      <div className="text-center h-5 -mt-2">
        {showUsage && (
            <p className="text-sm text-gray-600">
                You have <span className="font-bold text-green-600">{remainingUses}</span> free generation{remainingUses !== 1 ? 's' : ''} left today.
            </p>
        )}
        {noUsesLeft && (
             <p className="text-sm text-orange-600 font-medium">
                No free generations left. Add your key to continue.
            </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim() || selectedPlatforms.length === 0}
        className={`w-full flex items-center justify-center p-3 font-bold text-white bg-gradient-to-r ${noUsesLeft ? 'from-orange-500 to-yellow-500' : 'from-blue-500 to-green-500'} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-lg ${
          isLoading ? 'animate-button-pulse' : ''
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : noUsesLeft ? (
          'Learn How to Add API Key'
        ) : (
          'Optimize Content ✨'
        )}
      </button>
    </form>
  );
};