import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { audioManager } from '@/lib/game/Audio';

interface GameOverProps {
  score: number;
  resetGame: () => void;
}

export default function GameOver({ score, resetGame }: GameOverProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    audioManager.playSound('gameOver');
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        tryAgain();
      } else if (e.key === 'Escape') {
        returnToMenu();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const tryAgain = () => {
    resetGame();
    audioManager.playSound('select');
    setLocation('/game');
  };

  const returnToMenu = () => {
    resetGame();
    audioManager.playSound('select');
    setLocation('/');
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-bg bg-opacity-80 font-press-start">
      <h2 className="text-5xl mb-8 text-damage-red text-center">GAME OVER</h2>
      <p className="text-2xl mb-12 text-light-text">SCORE: {score.toString().padStart(4, '0')}</p>
      
      <div className="flex flex-col space-y-4">
        <button 
          onClick={tryAgain}
          className="bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          TRY AGAIN
        </button>
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
