import React from 'react';
import type { HistoryEntry } from '../types';

interface HistoryPageProps {
    history: HistoryEntry[];
    onViewItem: (id: string) => void;
    onClearHistory: () => void;
    onBack: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ history, onViewItem, onClearHistory, onBack }) => {
    return (
        <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Generation History</h1>
                 {history.length > 0 && (
                    <button 
                        onClick={onClearHistory} 
                        className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label="Clear all history"
                    >
                        Clear History
                    </button>
                 )}
            </div>

            <div className="overflow-y-auto flex-grow">
                {history.length === 0 ? (
                    <div className="text-center text-gray-600 mt-10">
                        <p>You haven't generated any content yet.</p>
                        <p>Your past generations will appear here.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {history.map(item => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => onViewItem(item.id)}
                                    className="w-full text-left p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <p className="font-semibold text-gray-800 truncate">
                                        {item.input.topic}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="text-center mt-6">
                <button onClick={onBack} className="px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
                    &larr; Back to App
                </button>
            </div>
        </div>
    );
};