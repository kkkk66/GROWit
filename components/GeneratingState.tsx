import React, { useState, useEffect } from 'react';
import type { UserInput } from '../types';

// FIX: Define GeneratingStateProps interface for the component's props.
interface GeneratingStateProps {
  input: UserInput;
}

const steps = [
  'Analyzing your content idea...',
  'Consulting viral trends database...',
  'Crafting catchy YouTube titles...',
  'Writing an engaging Instagram caption...',
  'Finding the perfect hashtags...',
  'Calculating the trending score...',
  'Finalizing your optimization plan...'
];

export const GeneratingState: React.FC<GeneratingStateProps> = ({ input }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prevStep => (prevStep + 1) % steps.length);
    }, 2000); // Cycle steps every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div 
                className="absolute inset-0 border-4 border-t-blue-500 border-l-blue-500 border-b-green-500 border-r-green-500 rounded-full animate-spin"
                style={{ animationDuration: '1.5s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
                ✨
            </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">GROWit is Working its Magic...</h2>
        
        <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full max-w-md">
            <p className="text-sm text-gray-600 font-medium">Your request:</p>
            <p className="font-semibold text-gray-800 break-words">"{input.topic}"</p>
            {input.targetAudience && <p className="text-xs text-gray-500 mt-1">for {input.targetAudience}</p>}
        </div>

        <div className="w-full max-w-md mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="h-6">
                <p className="text-gray-600 transition-opacity duration-500">
                    {steps[currentStep]}
                </p>
            </div>
        </div>
    </div>
  );
};