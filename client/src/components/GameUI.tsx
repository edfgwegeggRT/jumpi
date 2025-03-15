import { memo } from 'react';

interface GameUIProps {
  score: number;
  lives: number;
  coins: number;
  time: string;
}

const GameUI = memo(({ score, lives, coins, time }: GameUIProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 font-press-start">
      <div className="flex items-center space-x-2">
        {/* Character head icon for lives */}
        <div className="w-8 h-8 bg-character-red">
          <div className="absolute top-1 left-1 w-1 h-1 bg-light-text rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-light-text rounded-full"></div>
          <div className="absolute top-3 left-1 right-1 h-1 bg-light-text"></div>
        </div>
        <span className="text-light-text text-xl">x{lives}</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-light-text text-xl">SCORE: {score.toString().padStart(4, '0')}</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-light-text text-xl mr-4">TIME: {time}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Coin icon */}
        <div className="w-8 h-8 bg-coin-gold rounded-full animate-spin"></div>
        <span className="text-light-text text-xl">x{coins}</span>
      </div>
    </div>
  );
});

export default GameUI;
