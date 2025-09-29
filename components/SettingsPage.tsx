import React, { useState } from 'react';

interface SettingsPageProps {
    onSave: (apiKey: string) => void;
    onBack: () => void;
    currentApiKey: string;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onSave, onBack, currentApiKey }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(apiKey);
    };

    const isKeySaved = currentApiKey;
    const isKeyMasked = currentApiKey && currentApiKey.length > 8;
    const maskedKey = isKeyMasked ? `${currentApiKey.substring(0, 4)}...${currentApiKey.substring(currentApiKey.length - 4)}` : currentApiKey;

    return (
        <div className="p-6 overflow-y-auto h-full text-gray-800">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Settings</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="api-key" className="block text-lg font-semibold text-gray-700">
                        Google Gemini API Key
                    </label>
                    <p className="text-sm text-gray-600 mt-1 mb-2">
                        For unlimited use, add your own API key. You can get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Google AI Studio</a>.
                    </p>
                    <input
                        id="api-key"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={isKeySaved ? `Using saved key: ${maskedKey}` : "Enter your API key"}
                        className="w-full p-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-green-500 focus:ring-green-500 focus:outline-none transition placeholder-gray-500"
                        required
                    />
                    {isKeySaved && (
                        <p className="text-xs text-gray-500 mt-1">Enter a new key to update it.</p>
                    )}
                </div>
                
                <button
                    type="submit"
                    disabled={!apiKey.trim() || apiKey === currentApiKey}
                    className="w-full p-3 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                >
                    Save API Key
                </button>
            </form>

            <div className="text-center mt-8">
                <button onClick={onBack} className="px-6 py-2 font-semibold text-gray-700 hover:text-green-600 transition-colors">
                    &larr; Back to App
                </button>
            </div>
        </div>
    );
};
