import React from 'react';

interface HowToUsePageProps {
    onBack: () => void;
}

const MockScreenshot: React.FC<{ children: React.ReactNode, caption: string }> = ({ children, caption }) => (
    <div className="my-6">
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-3">
            {children}
        </div>
        <p className="text-center text-sm text-gray-600 mt-2 italic">{caption}</p>
    </div>
);

export const HowToUsePage: React.FC<HowToUsePageProps> = ({ onBack }) => {
    return (
        <div className="p-6 overflow-y-auto h-full text-gray-800">
            <div className="prose max-w-full prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">How to Use GROWit ✨</h1>

                <h2 className="text-2xl font-semibold mt-6">Step 1: Set Up Your API Key</h2>
                <p>
                    To unlock the power of GROWit, you'll need a free Google Gemini API key. This is your personal key to the AI, and it's stored securely in your browser's local storage—we never see it.
                </p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>
                        <strong>Get your key:</strong> First, go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Google AI Studio</a> and create your free API key.
                    </li>
                    <li>
                        <strong>Open Settings:</strong> Come back to GROWit and click the <strong>"Settings"</strong> button (the gear icon ⚙️) in the top-right corner of the app.
                    </li>
                    <li>
                        <strong>Save your key:</strong> On the Settings page, paste your new API key into the field and click the <strong>"Save API Key"</strong> button. That's it!
                    </li>
                </ol>
                <MockScreenshot caption="Click the settings icon, then paste and save your key.">
                     <input type="password" disabled value="Your API Key Here..." className="w-full p-2 bg-white rounded-lg text-sm shadow-sm" />
                    <button className="px-5 py-2.5 w-full max-w-xs rounded-lg text-sm font-bold bg-green-500 text-white shadow-lg">Save API Key</button>
                </MockScreenshot>

                <h2 className="text-2xl font-semibold mt-6">Step 2: Describe Your Video Idea</h2>
                <p>Tell the AI what your content is about. The more specific you are, the better the results will be!</p>
                <ul>
                    <li><strong>Content Topic:</strong> The main subject of your video (e.g., "How to make sourdough bread").</li>
                    <li><strong>Target Audience:</strong> Who you want to reach (e.g., "Beginner bakers").</li>
                    <li><strong>Language:</strong> The language for the generated content.</li>
                </ul>
                <MockScreenshot caption="Fill in the details about your content.">
                    <input type="text" disabled value="Content Topic: 'How to make sourdough bread'" className="w-full p-2 bg-white rounded-lg text-sm shadow-sm" />
                    <input type="text" disabled value="Target Audience: 'Beginner bakers'" className="w-full p-2 bg-white rounded-lg text-sm shadow-sm" />
                </MockScreenshot>

                <h2 className="text-2xl font-semibold mt-6">Step 3: Select Your Platforms</h2>
                <p>Choose one or more social media platforms you want to optimize for. GROWit will tailor the content specifically for each one you select.</p>
                <MockScreenshot caption="Select all the platforms you're posting to.">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button className="px-5 py-2.5 w-28 rounded-full text-sm font-bold bg-green-500 text-white shadow-lg">YouTube</button>
                        <button className="px-5 py-2.5 w-28 rounded-full text-sm font-bold bg-green-500 text-white shadow-lg">Instagram</button>
                        <button className="px-5 py-2.5 w-28 rounded-full text-sm font-bold bg-white text-gray-700">Facebook</button>
                    </div>
                </MockScreenshot>

                 <h2 className="text-2xl font-semibold mt-6">Step 4: Generate & View Results</h2>
                 <p>Hit the "Optimize Content" button and let the AI work its magic. On the results page, you can switch between platforms using the tabs and use the copy buttons to easily grab the content you need.</p>
                <MockScreenshot caption="Click the tabs and copy buttons to get your content.">
                    <button className="w-full max-w-sm p-3 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">Optimize Content ✨</button>
                </MockScreenshot>
            </div>

            <div className="text-center mt-8">
                <button onClick={onBack} className="px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
                    &larr; Back to App
                </button>
            </div>
        </div>
    );
};