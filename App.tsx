import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { generateBrainVideo } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A photorealistic 3D model of a human brain, made of dark blue metallic material, with glowing cyan micro-lights and circuit patterns pulsing and running through it. The brain slowly rotates in the dark abyss of space with distant nebulae. Seamless loop, cinematic lighting, 8k high detail.');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      const videoUrl = await generateBrainVideo(prompt);
      setGeneratedVideoUrl(videoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div 
      className="min-h-screen bg-gray-900 text-gray-100 bg-cover bg-center bg-fixed" 
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')"}}
    >
      <div className="min-h-screen bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center p-4 sm:p-6 md:p-8">
        <Header />
        <main className="w-full max-w-4xl flex-grow flex flex-col items-center justify-center container mx-auto px-4">
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <ImageDisplay
            videoUrl={generatedVideoUrl}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <footer className="w-full text-center p-4 text-xs text-gray-500 mt-auto">
          <p>Powered by Gemini AI. Videos are AI-generated and may be fictional.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;