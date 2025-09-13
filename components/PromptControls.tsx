
import React from 'react';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  return (
    <div className="w-full max-w-3xl p-4 bg-gray-800 bg-opacity-50 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
      <label htmlFor="prompt-input" className="block mb-2 text-sm font-medium text-cyan-300">
        Describe your 3D Brain
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          placeholder="e.g., A brain made of liquid chrome..."
          className="flex-grow p-3 bg-gray-900/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-gray-200 resize-none"
          rows={3}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-cyan-300 transition duration-300 ease-out border-2 border-cyan-500 rounded-md shadow-md group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full bg-cyan-500 group-hover:translate-x-0"></span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-0">
            {isLoading ? 'Generating...' : 'Generate'}
          </span>
          <span className="relative flex items-center">
             {isLoading ? 'Generating...' : 'Generate'}
          </span>
        </button>
      </div>
    </div>
  );
};
