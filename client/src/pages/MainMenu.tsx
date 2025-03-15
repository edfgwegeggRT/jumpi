import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { audioManager } from '@/lib/game/Audio';

export default function MainMenu() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Start background music when menu loads
    audioManager.playBackgroundMusic();

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const startGame = () => {
    audioManager.playSound('select');
    setLocation('/game');
  };

  const showControls = () => {
    audioManager.playSound('select');
    setLocation('/controls');
  };

  const showCredits = () => {
    audioManager.playSound('select');
    setLocation('/credits');
  };

  const showLevelEditor = () => {
    audioManager.playSound('select');
    setLocation('/editor');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-dark-bg font-press-start">
      <h1 className="text-4xl md:text-6xl mb-12 text-light-text text-center">
        PIXEL<span className="text-character-red">JUMPER</span>
      </h1>

      <div className="mb-16 relative">
        {/* Character sprite animation */}
        <div className="w-32 h-32 bg-character-red animate-float">
          {/* Character face details */}
          <div className="absolute top-4 left-12 w-3 h-3 bg-light-text rounded-full"></div>
          <div className="absolute top-4 right-12 w-3 h-3 bg-light-text rounded-full"></div>
          <div className="absolute top-12 left-10 right-10 h-2 bg-light-text"></div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button 
          onClick={startGame}
          className="bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          START GAME
        </button>
        <button 
          onClick={showControls}
          className="bg-platform-green hover:bg-health-green text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          CONTROLS
        </button>
        <button 
          onClick={showCredits}
          className="bg-coin-gold hover:bg-yellow-400 text-dark-bg py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          CREDITS
        </button>
      </div>

      <div className="absolute bottom-6 text-light-text text-xs text-center">
        <p>ARROWS TO MOVE • SPACE TO JUMP</p>
        <p className="mt-2">© 2023 PIXEL JUMPER</p>
      </div>
    </div>
  );
}