import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { audioManager } from '@/lib/game/Audio';

export default function Controls() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        returnToMenu();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const returnToMenu = () => {
    audioManager.playSound('select');
    setLocation('/');
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-bg font-press-start">
      <h2 className="text-4xl mb-12 text-light-text text-center">CONTROLS</h2>
      
      <div className="bg-sky-blue p-8 rounded-sm max-w-md">
        <ul className="space-y-6 text-dark-bg">
          <li className="flex justify-between items-center">
            <span>←→</span>
            <span>MOVE</span>
          </li>
          <li className="flex justify-between items-center">
            <span>SPACE</span>
            <span>JUMP</span>
          </li>
          <li className="flex justify-between items-center">
            <span>P</span>
            <span>PAUSE</span>
          </li>
          <li className="flex justify-between items-center">
            <span>M</span>
            <span>MUTE</span>
          </li>
          <li className="flex justify-between items-center">
            <span>ESC</span>
            <span>MENU</span>
          </li>
        </ul>
      </div>
      
      <button 
        onClick={returnToMenu}
        className="mt-12 bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
      >
        BACK
      </button>
    </div>
  );
}
