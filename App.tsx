
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInput } from './components/ChatInput';
import { GeneratingState } from './components/GeneratingState';
import { generateContentOptimization } from './services/geminiService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { OutputPage } from './components/OutputPage';
import { HistoryPage } from './components/HistoryPage';
import { AboutPage } from './components/AboutPage';
import { SettingsPage } from './components/SettingsPage';
import { HowToUsePage } from './components/HowToUsePage';
import { AppLoader } from './components/AppLoader';
import type { UserInput, OptimizationResult, HistoryEntry } from './types';

type Page = 'main' | 'privacy' | 'terms' | 'output' | 'history' | 'about' | 'settings' | 'howToUse';

// NOTE: For the free daily tier to work, this placeholder key must be replaced with a valid Google Gemini API key.
// This key will be shared among users who have not provided their own, with a daily limit.
const DEFAULT_API_KEY = ''; // Add a valid key here to enable the feature.
const MAX_DEFAULT_USES = 5;

const AdPlaceholder: React.FC = () => (
    <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-200">
      <p className="text-gray-400 font-medium text-sm tracking-wider">ADVERTISEMENT</p>
    </div>
);

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorHelpButton, setShowErrorHelpButton] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [viewingHistoryItem, setViewingHistoryItem] = useState<HistoryEntry | null>(null);
  const [currentInput, setCurrentInput] = useState<UserInput | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [defaultUsage, setDefaultUsage] = useState<{ count: number; date: string }>({ count: 0, date: new Date().toISOString().split('T')[0] });


  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 1500); // Show loader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (appIsReady) {
      try {
        const savedHistory = localStorage.getItem('growit_history');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
        const savedApiKey = localStorage.getItem('growit_apiKey');
        if (savedApiKey) {
          setApiKey(savedApiKey);
        }
        const savedUsage = localStorage.getItem('growit_default_usage');
        const today = new Date().toISOString().split('T')[0];
        if (savedUsage) {
          const parsedUsage = JSON.parse(savedUsage);
          if (parsedUsage.date === today) {
            setDefaultUsage(parsedUsage);
          } else {
            // Reset if it's a new day
            setDefaultUsage({ count: 0, date: today });
          }
        } else {
          setDefaultUsage({ count: 0, date: today });
        }
      } catch (error) {
        console.error("Failed to load data from localStorage", error);
        setHistory([]);
        setApiKey('');
        setDefaultUsage({ count: 0, date: new Date().toISOString().split('T')[0] });
      }
    }
  }, [appIsReady]);

  const handleGenerate = useCallback(async (input: UserInput) => {
    let keyToUse = apiKey;
    let isUsingDefaultKey = false;
    
    if (!apiKey) {
      if (!DEFAULT_API_KEY) {
        setError("The free daily generation service is currently unavailable. Please set your own Google Gemini API key in the settings to use the app.");
        setShowErrorHelpButton(true);
        setCurrentPage('settings');
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      let usage = defaultUsage;
      if (defaultUsage.date !== today) {
        usage = { count: 0, date: today };
      }

      if (usage.count >= MAX_DEFAULT_USES) {
        setError(`You've used all ${MAX_DEFAULT_USES} free daily generations. To continue creating, please add your own API key as explained in the guide below.`);
        setShowErrorHelpButton(true);
        setCurrentPage('howToUse');
        return;
      }

      keyToUse = DEFAULT_API_KEY;
      isUsingDefaultKey = true;
    }

    setIsLoading(true);
    setError(null);
    setShowErrorHelpButton(false);
    setResult(null);
    setShowWelcome(false);
    setViewingHistoryItem(null);
    setCurrentInput(input);

    if (isUsingDefaultKey) {
      const today = new Date().toISOString().split('T')[0];
      let usage = defaultUsage;
      if (defaultUsage.date !== today) {
          usage = { count: 0, date: today };
      }
      const newUsage = { ...usage, count: usage.count + 1 };
      setDefaultUsage(newUsage);
      localStorage.setItem('growit_default_usage', JSON.stringify(newUsage));
    }

    try {
      const optimizationResult = await generateContentOptimization(input, keyToUse);
      setResult(optimizationResult);

      const newHistoryEntry: HistoryEntry = {
        id: new Date().toISOString() + Math.random(),
        timestamp: new Date().toISOString(),
        input: input,
        result: optimizationResult,
      };
      
      setHistory(prevHistory => {
        const updatedHistory = [newHistoryEntry, ...prevHistory].slice(0, 50); // Keep last 50
        localStorage.setItem('growit_history', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

      setCurrentPage('output');
    } catch (err) {
      if (err instanceof Error) {
        setShowErrorHelpButton(false);
        switch (err.message) {
          case 'INVALID_API_KEY':
          case 'MISSING_API_KEY':
            setError("The provided API key is invalid or missing. Please check your key in the settings and refer to the guide for help.");
            setShowErrorHelpButton(true);
            setCurrentPage('howToUse');
            break;
          case 'RATE_LIMIT_EXCEEDED':
            setError("You've made too many requests in a short period. Please wait a moment and try again. This is a limit from the Gemini API.");
            break;
          case 'CONTENT_BLOCKED_SAFETY':
            setError("Your request or the AI's response was blocked due to safety settings. Please adjust your topic to be less sensitive and try again.");
            break;
          case 'CONTENT_BLOCKED':
            setError("The AI's response was blocked. This can happen for various reasons, such as generating repetitive content. Please try adjusting your prompt.");
            break;
          case 'INVALID_REQUEST':
            setError("The AI model couldn't process the request. This can be caused by an overly complex prompt or a temporary issue with the service. Please try simplifying your topic and try again.");
            break;
          case 'EMPTY_RESPONSE':
            setError("The AI returned an empty response. This might be due to a very restrictive prompt. Try adjusting your topic or target audience.");
            break;
          case 'INVALID_JSON':
             setError("The AI returned a malformed response. This is an internal error, please try generating again.");
            break;
          case 'API_ERROR':
          default:
            setError("There was an issue contacting the AI service. Please check your internet connection and try again in a few moments. If the problem persists, the service may be temporarily unavailable.");
            break;
        }
      } else {
        setError("An unknown error occurred. Please try again.");
        setShowErrorHelpButton(false);
      }
      console.error("Error generating optimization:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, defaultUsage]);
  
  const handleGenerateNew = () => {
    setCurrentPage('main');
    setResult(null);
    setShowWelcome(true);
    setViewingHistoryItem(null);
    setCurrentInput(null);
  };

  const handleShowHistory = () => setCurrentPage('history');
  
  const handleShowSettings = () => setCurrentPage('settings');
  
  const handleSaveApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem('growit_apiKey', newApiKey);
    alert("API Key saved successfully!");
    setCurrentPage('main');
  };

  const handleViewHistoryItem = (id: string) => {
    const item = history.find(entry => entry.id === id);
    if (item) {
      setResult(item.result);
      setViewingHistoryItem(item);
      setCurrentPage('output');
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire generation history? This action cannot be undone.")) {
      setHistory([]);
      localStorage.removeItem('growit_history');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'settings':
        return <SettingsPage onSave={handleSaveApiKey} onBack={() => setCurrentPage('main')} currentApiKey={apiKey} />;
      case 'howToUse':
        return <HowToUsePage onBack={() => setCurrentPage('main')} />;
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('main')} onNavigate={(page) => setCurrentPage(page)} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentPage('main')} />;
      case 'terms':
        return <TermsOfService onBack={() => setCurrentPage('main')} />;
      case 'history':
        return <HistoryPage history={history} onViewItem={handleViewHistoryItem} onClearHistory={handleClearHistory} onBack={() => setCurrentPage('main')} />;
      case 'output':
        const handleBackFromOutput = () => {
          if (viewingHistoryItem) {
            setCurrentPage('history');
            setViewingHistoryItem(null);
            setResult(null);
          } else {
            handleGenerateNew();
          }
        };
        const inputForOutput = viewingHistoryItem ? viewingHistoryItem.input : currentInput;
        return result && inputForOutput && <OutputPage result={result} input={inputForOutput} onBack={handleBackFromOutput} isViewingHistory={!!viewingHistoryItem} />;
      case 'main':
      default:
        return (
          <>
            <div className="flex-grow p-6 overflow-y-auto">
              {isLoading && currentInput ? (
                <GeneratingState input={currentInput} />
              ) : (
                <>
                  {!error && (
                    <div className="mb-6">
                      <AdPlaceholder />
                    </div>
                  )}
                  {showWelcome && <WelcomeMessage />}
                  {error && <ErrorMessage 
                              message={error}
                            />}
                </>
              )}
            </div>
            {!isLoading && 
              <>
                <div className="px-6 pb-2">
                  <AdPlaceholder />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <ChatInput onSubmit={handleGenerate} isLoading={isLoading} apiKey={apiKey} defaultUsage={defaultUsage} />
                </div>
              </>
            }
          </>
        );
    }
  };

  const footerLinks: { label: string; page: Page }[] = [
    { label: 'How to Use', page: 'howToUse' },
    { label: 'About', page: 'about' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
  ];
  
  if (!appIsReady) {
    return <AppLoader />;
  }

  return (
    <div className="min-h-screen w-full bg-[#5A7859] flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      <Header onShowHistory={handleShowHistory} onShowSettings={handleShowSettings} />
      <main className="w-full max-w-4xl flex-grow flex flex-col my-4 z-10 min-h-0">
        <div className="bg-white rounded-2xl shadow-2xl w-full flex-grow flex flex-col border border-gray-200 overflow-hidden min-h-0">
          {renderPage()}
        </div>
      </main>
      <footer className="text-center text-gray-200/80 text-sm z-10">
        <nav className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mb-2">
            {footerLinks.map((link) => (
                <button
                    key={link.page}
                    onClick={() => setCurrentPage(link.page)}
                    className={`px-2 py-1 font-medium text-gray-200 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white ${
                        showErrorHelpButton && link.page === 'howToUse' ? 'font-bold' : ''
                    }`}
                >
                    {link.label}
                </button>
            ))}
        </nav>
        <p>&copy; {new Date().getFullYear()} GROWit. Powered by AI.</p>
      </footer>
    </div>
  );
};

const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome to GROWit!</h2>
        <p className="mt-2 text-gray-600 max-w-lg">
            Your AI assistant for viral content. Describe your video idea, select your platforms, and I'll generate optimized titles, captions, hashtags, and more!
        </p>
    </div>
);

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="m-4 p-4 bg-red-500 text-white rounded-lg flex shadow-lg" role="alert">
        <div className="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <div>
            <p className="font-bold">An Error Occurred</p>
            <p className="text-sm">{message}</p>
        </div>
    </div>
);


export default App;
