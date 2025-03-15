import { memo } from 'react';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

const PauseMenu = memo(({ onResume, onRestart, onMainMenu }: PauseMenuProps) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-bg bg-opacity-80 font-press-start">
      <h2 className="text-5xl mb-12 text-coin-gold text-center">PAUSED</h2>
      
      <div className="flex flex-col space-y-4">
        <button 
          onClick={onResume}
          className="bg-character-red hover:bg-damage-red text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          RESUME
        </button>
        <button 
          onClick={onRestart}
          className="bg-platform-green hover:bg-health-green text-light-text py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          RESTART
        </button>
        <button 
          onClick={onMainMenu}
          className="bg-coin-gold hover:bg-yellow-400 text-dark-bg py-3 px-6 rounded-sm transition-colors duration-200 text-xl transform hover:scale-105 active:scale-95"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );
});

export default PauseMenu;
