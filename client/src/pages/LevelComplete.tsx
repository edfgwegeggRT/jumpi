import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { audioManager } from '@/lib/game/Audio';
import { Level } from '@/lib/game/Level';

interface LevelCompleteProps {
  score: number;
  coins: number;
  level: number;
  setLevel: (level: number) => void;
  completionTime: number;
}

export default function LevelComplete({ 
  score, 
  coins, 
  level, 
  setLevel, 
  completionTime 
}: LevelCompleteProps) {
  const [, setLocation] = useLocation();
  const [isMaxLevel, setIsMaxLevel] = useState(false);
  const levelManager = new Level();
  
  useEffect(() => {
    // Check if current level is the maximum level
    if (level >= levelManager.getLevelCount()) {
      setIsMaxLevel(true);
    }
  }, [level]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        nextLevel();
      } else if (e.key === 'Escape') {
        returnToMenu();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const nextLevel = () => {
    setLevel(level + 1);
    audioManager.playSound('select');
    setLocation('/game');
  };

  const returnToMenu = () => {
    audioManager.playSound('select');
    setLocation('/');
  };

  const restartGame = () => {
    setLevel(1);
    audioManager.playSound('select');
    setLocation('/game');
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-bg bg-opacity-80 font-press-start">
      <h2 className="text-5xl mb-8 text-health-green text-center">
        {isMaxLevel ? 'GAME COMPLETE!' : 'LEVEL COMPLETE!'}
      </h2>
      <div className="mb-8">
        <p className="text-2xl text-light-text">SCORE: {score.toString().padStart(4, '0')}</p>
        <p className="text-2xl text-light-text">COINS: {coins}/10</p>
        <p className="text-2xl text-light-text">TIME: {formatTime(completionTime)}</p>
      </div>
      
      <div className="flex flex-col space-y-4">
        {isMaxLevel ? (
          <>
            <p className="text-xl text-character-red mb-2">You've completed all levels!</p>
            <button 
              onClick={restartGame}
              className="bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
            >
              PLAY AGAIN
            </button>
          </>
        ) : (
          <button 
            onClick={nextLevel}
            className="bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
          >
            NEXT LEVEL
          </button>
        )}
        <button 
          onClick={returnToMenu}
          className="bg-platform-green hover:bg-health-green text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );
}
