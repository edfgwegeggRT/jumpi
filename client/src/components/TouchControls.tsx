import React from 'react';

interface TouchControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onPause: () => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onJump,
  onPause
}) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 pointer-events-none">
      {/* Movement controls */}
      <div className="flex gap-4 pointer-events-auto">
        <button
          className="w-16 h-16 bg-gray-800/70 text-white rounded-full flex items-center justify-center text-2xl"
          onTouchStart={onMoveLeft}
          aria-label="Move Left"
        >
          ←
        </button>
        <button
          className="w-16 h-16 bg-gray-800/70 text-white rounded-full flex items-center justify-center text-2xl"
          onTouchStart={onMoveRight}
          aria-label="Move Right"
        >
          →
        </button>
      </div>
      
      {/* Action controls */}
      <div className="flex gap-4 pointer-events-auto">
        <button
          className="w-16 h-16 bg-gray-800/70 text-white rounded-full flex items-center justify-center text-lg"
          onTouchStart={onPause}
          aria-label="Pause"
        >
          II
        </button>
        <button
          className="w-16 h-16 bg-gray-800/70 text-white rounded-full flex items-center justify-center text-2xl"
          onTouchStart={onJump}
          aria-label="Jump"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default TouchControls;