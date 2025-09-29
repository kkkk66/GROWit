import React from 'react';

interface AboutPageProps {
    onBack: () => void;
    onNavigate: (page: 'privacy' | 'terms') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="p-6 overflow-y-auto h-full text-gray-800">
            <div className="prose max-w-full prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">About GROWit 🌱</h1>
                
                <h2 className="text-2xl font-semibold mt-6">What is GROWit?</h2>
                <p>GROWit is your personal AI-powered social media strategist, designed to help you create viral content effortlessly. Whether you're a seasoned creator or just starting, GROWit provides the tools you need to optimize your posts for maximum reach and engagement across all major platforms.</p>

                <h2 className="text-2xl font-semibold mt-6">Key Features</h2>
                <ul>
                    <li><strong>Multi-Platform Optimization:</strong> Get tailored content suggestions for YouTube, Instagram, Facebook, Snapchat, and TikTok from a single prompt.</li>
                    <li><strong>Comprehensive Content Generation:</strong> We generate everything you need, including catchy titles, SEO-friendly descriptions, engaging captions, relevant keywords, and trending hashtags.</li>
                    <li><strong>Actionable Insights:</strong> Discover the single best time to post and get a "Trending Score" to gauge your topic's viral potential.</li>
                    <li><strong>Creative Assistance:</strong> Leverage the power of AI to overcome creative blocks and generate fresh ideas for your content.</li>
                    <li><strong>History Tracking:</strong> Easily access and review all your previous content generations to track what works best.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">How It Works</h2>
                <p>GROWit uses Google's advanced Gemini AI model. When you provide a topic, target audience, and language, our AI analyzes your request and acts as a world-class social media expert. It generates creative, data-driven content suggestions specifically designed to perform well on each platform's unique algorithm.</p>
                
                <p className="mt-4">We are committed to transparency and protecting your data. For more detailed information, please review our <button onClick={() => onNavigate('terms')} className="text-green-600 hover:underline font-semibold">Terms of Service</button> and <button onClick={() => onNavigate('privacy')} className="text-green-600 hover:underline font-semibold">Privacy Policy</button>.</p>
            </div>
            <div className="text-center mt-8">
                <button onClick={onBack} className="px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
                    &larr; Back to App
                </button>
            </div>
        </div>
    );
};