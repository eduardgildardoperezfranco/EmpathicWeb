import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageDisplayProps {
  videoUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "Conjuring cosmic energy...",
  "AI is sculpting the neural pathways...",
  "Rendering metallic textures...",
  "Animating micro-light patterns...",
  "This can take a few minutes, please wait...",
  "Finalizing the cinematic loop...",
];

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ videoUrl, isLoading, error }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let messageIndex = 0;
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setCurrentMessage(loadingMessages[messageIndex]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="w-full max-w-4xl mt-8 aspect-video bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center p-4 transition-all duration-300 min-h-[250px] sm:min-h-[400px]">
      {isLoading && (
        <div className="text-center text-cyan-300">
          <SpinnerIcon className="w-16 h-16 animate-spin mx-auto mb-4" />
          <p className="text-lg">{currentMessage}</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-400">
          <p className="font-bold">Generation Failed</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      )}
      {!isLoading && !error && !videoUrl && (
        <div className="text-center text-gray-500">
          <p>Your generated brain animation will appear here.</p>
        </div>
      )}
      {videoUrl && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative group">
           <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl shadow-cyan-500/20 animate-fade-in"
              style={{ animation: 'fadeIn 0.5s ease-in-out' }}
           />
           <a
             href={videoUrl}
             download="3d-metallic-brain.mp4"
             className="absolute bottom-4 right-4 bg-cyan-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-cyan-400 transition-all duration-300 transform opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
           >
             <DownloadIcon className="w-5 h-5" />
             Download
           </a>
           <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
           `}</style>
        </div>
      )}
    </div>
  );
};