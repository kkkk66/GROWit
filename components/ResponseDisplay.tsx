import React, { useState, useEffect, useMemo } from 'react';
import type { OptimizationResult, Platform, YouTubeResult, InstagramResult, FacebookResult, SnapchatResult, TikTokResult } from '../types';
import { platformIcons } from './PlatformIcons';

interface ResponseDisplayProps {
  data: OptimizationResult;
}

const CopyButton: React.FC<{ textToCopy: string; isPrimary?: boolean }> = ({ textToCopy, isPrimary = false }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy: ', err));
    };
    
    if (isPrimary) {
        return (
             <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                {isCopied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy All
                    </>
                )}
            </button>
        )
    }

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Copy to clipboard"
        >
            {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )}
        </button>
    );
};

const ResultCard: React.FC<{ title: string; icon: string; children: React.ReactNode; className?: string; copyText?: string; platform?: Platform }> = ({ title, icon, children, className = '', copyText, platform }) => (
    <div className={`rounded-xl bg-white p-4 h-full w-full relative overflow-hidden border border-gray-200 shadow-sm ${className}`}>
         {platform && platformIcons[platform] && (
            <div className="absolute -bottom-6 -right-5 text-gray-200/40 w-32 h-32 z-0" aria-hidden="true">
                {React.cloneElement(platformIcons[platform] as React.ReactElement, { className: "w-full h-full" })}
            </div>
        )}
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2 text-xl">{icon}</span>
                    {title}
                </h3>
                {copyText && <CopyButton textToCopy={copyText} />}
            </div>
            <div className="text-gray-700">{children}</div>
        </div>
    </div>
);

const Hashtags: React.FC<{tags: string[]}> = ({ tags }) => (
    <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            #{tag}
        </span>
        ))}
    </div>
);

const YouTubeDisplay: React.FC<{data: YouTubeResult; platform: 'youtube' | 'youtube_shorts'}> = ({ data, platform }) => {
    const keywordsText = data.keywords.join(', ');
    const hashtagsText = data.hashtags.map(tag => `#${tag}`).join(' ');
    const titlesText = data.titleOptions.map((title, index) => `${index + 1}. ${title}`).join('\n');
    const copyAllText = `Titles:\n${titlesText}\n\nDescription:\n${data.description}\n\nKeywords:\n${keywordsText}\n\nHashtags:\n${hashtagsText}`;

    return (
        <div className="space-y-4">
            <div className="flex justify-end -mb-2 z-10 relative">
                 <CopyButton textToCopy={copyAllText} isPrimary />
            </div>
             <ResultCard title="Title Options" icon="👑" platform={platform}>
                <ul className="space-y-3">
                    {data.titleOptions.map((title, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-gray-800 font-medium break-words pr-2">{title}</span>
                            <CopyButton textToCopy={title} />
                        </li>
                    ))}
                </ul>
            </ResultCard>
            <ResultCard title="Description" icon="📝" copyText={data.description} platform={platform}>
                <p className="whitespace-pre-wrap">{data.description}</p>
            </ResultCard>
            <ResultCard title="Keywords" icon="🔑" copyText={keywordsText} platform={platform}>
                <p className="text-gray-600 italic">{keywordsText}</p>
            </ResultCard>
            <ResultCard title="Hashtags" icon="#️⃣" copyText={hashtagsText} platform={platform}>
                <Hashtags tags={data.hashtags} />
            </ResultCard>
        </div>
    );
};

const InstagramDisplay: React.FC<{data: InstagramResult}> = ({ data }) => {
    const hashtagsText = data.hashtags.map(tag => `#${tag}`).join(' ');
    const copyAllText = `Caption:\n${data.caption}\n\nHashtags:\n${hashtagsText}`;
    return (
        <div className="space-y-4">
             <div className="flex justify-end -mb-2 z-10 relative">
                 <CopyButton textToCopy={copyAllText} isPrimary />
            </div>
            <ResultCard title="Caption" icon="✍️" copyText={data.caption} platform="instagram">
                <p className="whitespace-pre-wrap">{data.caption}</p>
            </ResultCard>
            <ResultCard title="Hashtags" icon="#️⃣" copyText={hashtagsText} platform="instagram">
                <Hashtags tags={data.hashtags} />
            </ResultCard>
        </div>
    );
};

const FacebookDisplay: React.FC<{data: FacebookResult}> = ({ data }) => {
    const hashtagsText = data.hashtags.map(tag => `#${tag}`).join(' ');
    const copyAllText = `Post Text:\n${data.postText}\n\nHashtags:\n${hashtagsText}`;
    return (
        <div className="space-y-4">
             <div className="flex justify-end -mb-2 z-10 relative">
                 <CopyButton textToCopy={copyAllText} isPrimary />
            </div>
            <ResultCard title="Post Text" icon="✍️" copyText={data.postText} platform="facebook">
                <p className="whitespace-pre-wrap">{data.postText}</p>
            </ResultCard>
            <ResultCard title="Hashtags" icon="#️⃣" copyText={hashtagsText} platform="facebook">
                <Hashtags tags={data.hashtags} />
            </ResultCard>
        </div>
    );
};

const SnapchatDisplay: React.FC<{data: SnapchatResult}> = ({ data }) => {
    const copyAllText = `Caption:\n${data.caption}\n\nTrending Sounds:\n${data.trendingSounds.join(', ')}`;
    return (
        <div className="space-y-4">
            <div className="flex justify-end -mb-2 z-10 relative">
                 <CopyButton textToCopy={copyAllText} isPrimary />
            </div>
            <ResultCard title="Caption" icon="👻" copyText={data.caption} platform="snapchat">
                <p className="whitespace-pre-wrap">{data.caption}</p>
            </ResultCard>
            <ResultCard title="Trending Sounds" icon="🎵" copyText={data.trendingSounds.join(', ')} platform="snapchat">
                 <p className="text-gray-600 italic">{data.trendingSounds.join(', ')}</p>
            </ResultCard>
        </div>
    );
};

const TikTokDisplay: React.FC<{data: TikTokResult}> = ({ data }) => {
    const hashtagsText = data.hashtags.map(tag => `#${tag}`).join(' ');
    const copyAllText = `Caption:\n${data.caption}\n\nHashtags:\n${hashtagsText}\n\nTrending Sounds:\n${data.trendingSounds.join(', ')}`;
    return (
        <div className="space-y-4">
             <div className="flex justify-end -mb-2 z-10 relative">
                 <CopyButton textToCopy={copyAllText} isPrimary />
            </div>
            <ResultCard title="Caption" icon="🕺" copyText={data.caption} platform="tiktok">
                <p className="whitespace-pre-wrap">{data.caption}</p>
            </ResultCard>
            <ResultCard title="Trending Sounds" icon="🎵" copyText={data.trendingSounds.join(', ')} platform="tiktok">
                 <p className="text-gray-600 italic">{data.trendingSounds.join(', ')}</p>
            </ResultCard>
            <ResultCard title="Hashtags" icon="#️⃣" copyText={hashtagsText} platform="tiktok">
                <Hashtags tags={data.hashtags} />
            </ResultCard>
        </div>
    );
};

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ data }) => {
  const availablePlatforms = useMemo(() => Object.keys(data).filter(k => k !== 'shared') as Platform[], [data]);
  const [activeTab, setActiveTab] = useState<Platform | null>(null);

  useEffect(() => {
    if (availablePlatforms.length > 0 && !availablePlatforms.includes(activeTab as Platform)) {
      setActiveTab(availablePlatforms[0]);
    }
  }, [availablePlatforms, activeTab]);
  
  const renderContent = () => {
    switch (activeTab) {
        case 'youtube': return data.youtube && <YouTubeDisplay data={data.youtube} platform="youtube" />;
        case 'youtube_shorts': return data.youtube_shorts && <YouTubeDisplay data={data.youtube_shorts} platform="youtube_shorts" />;
        case 'instagram': return data.instagram && <InstagramDisplay data={data.instagram} />;
        case 'facebook': return data.facebook && <FacebookDisplay data={data.facebook} />;
        case 'snapchat': return data.snapchat && <SnapchatDisplay data={data.snapchat} />;
        case 'tiktok': return data.tiktok && <TikTokDisplay data={data.tiktok} />;
        default: return null;
    }
  };

  return (
    <div className="space-y-6">
        <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800 text-center">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard title="Trending Score" icon="📈">
                    <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                            <div 
                                className="bg-gradient-to-r from-blue-400 to-green-500 h-4 rounded-full"
                                style={{ width: `${data.shared.trendingScore}%` }}
                            ></div>
                        </div>
                        <span className="font-bold text-lg text-gray-800">{data.shared.trendingScore}%</span>
                    </div>
                </ResultCard>
                <ResultCard title="Best Time to Post" icon="⏰">
                    <p className="font-medium text-gray-800">{data.shared.bestTimeToPost}</p>
                </ResultCard>
            </div>
        </div>

        {availablePlatforms.length > 0 && (
            <div className="border-b border-gray-200">
                <div className="flex items-center justify-start sm:justify-center overflow-x-auto">
                    {availablePlatforms.map(platform => (
                        <button
                            key={platform}
                            onClick={() => setActiveTab(platform)}
                            className={`px-4 py-2 text-sm sm:text-base font-semibold capitalize transition-colors duration-200 focus:outline-none whitespace-nowrap ${
                                activeTab === platform
                                    ? 'border-b-2 border-green-600 text-green-700'
                                    : 'text-gray-500 hover:text-green-600'
                            }`}
                        >
                            {platform.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        )}
        
        <div className="mt-4">
            {renderContent()}
        </div>
    </div>
  );
};