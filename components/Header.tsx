
import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mb-8 text-center">
      <div className="flex items-center justify-center gap-4">
        <BrainCircuitIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
          3D Metallic Brain Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-300">
        Craft your vision of a futuristic AI consciousness.
      </p>
    </header>
  );
};
