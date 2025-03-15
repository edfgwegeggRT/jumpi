import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import PauseMenu from '@/components/PauseMenu';
import TouchControls from '@/components/TouchControls';
import { GameEngine } from '@/lib/game/Engine';
import { audioManager } from '@/lib/game/Audio';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameProps {
  score: number;
  setScore: (score: number) => void;
  coins: number;
  setCoins: (coins: number) => void;
  lives: number;
  setLives: (lives: number) => void;
  level: number;
  setCompletionTime: (time: number) => void;
}

export default function Game({ 
  score, 
  setScore, 
  coins, 
  setCoins, 
  lives,
  setLives,
  level,
  setCompletionTime
}: GameProps) {
  const [, setLocation] = useLocation();
  const [isPaused, setIsPaused] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [touchInputs, setTouchInputs] = useState({ left: false, right: false, jump: false });
  
  const isMobile = useIsMobile();
  const gameEngineRef = useRef<GameEngine | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  // Setup game engine and event handlers
  useEffect(() => {
    // Initialize game engine
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    // Create game engine instance with callbacks
    const createGameEngine = () => {
      gameEngineRef.current = new GameEngine(canvas, {
        onCoinCollect: (value: number) => {
          setCoins((prevCoins: number) => prevCoins + 1);
          setScore((prevScore: number) => prevScore + value);
          audioManager.playSound('coin');
        },
        onEnemyHit: () => {
          setLives((prevLives: number) => prevLives - 1);
          audioManager.playSound('damage');
        },
        onPowerupCollect: () => {
          setScore((prevScore: number) => prevScore + 50);
          audioManager.playSound('powerup');
        },
        onLevelComplete: () => {
          setLevelCompleted(true);
          const completionTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setCompletionTime(completionTime);
          audioManager.playSound('levelComplete');
        }
      });
      
      // Load the current level
      gameEngineRef.current.loadLevel(level);
    };
    
    createGameEngine();
    
    // Play background music on mount
    audioManager.playBackgroundMusic();
    
    // Clean up on unmount
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      audioManager.stopBackgroundMusic();
    };
  }, [level, setCoins, setScore, setLives, setCompletionTime]);
  
  // Setup game loop
  useEffect(() => {
    // Start game loop
    const gameLoop = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;
      
      if (!isPaused && gameEngineRef.current) {
        gameEngineRef.current.update(deltaTime);
        gameEngineRef.current.render();
        
        // Update game time
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setGameTime(elapsedTime);
        
        // Auto-save game state
        if (gameEngineRef.current.gameState) {
          gameEngineRef.current.gameState.saveGameState();
        }

        // Check game over condition
        if (lives <= 0 && !isGameOver) {
          setIsGameOver(true);
        }
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [isPaused, lives, isGameOver]);
  
  // Setup pause key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle game over
  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        setLocation('/gameover');
      }, 1000);
    }
  }, [isGameOver, setLocation]);

  // Handle level completion
  useEffect(() => {
    if (levelCompleted) {
      setTimeout(() => {
        setLocation('/level-complete');
      }, 1000);
    }
  }, [levelCompleted, setLocation]);

  const resumeGame = () => {
    setIsPaused(false);
    audioManager.playSound('select');
  };

  const restartLevel = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.resetLevel();
    }
    setIsPaused(false);
    startTimeRef.current = Date.now();
    audioManager.playSound('select');
  };

  const returnToMenu = () => {
    setLocation('/');
    audioManager.playSound('select');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Touch control handlers
  const handleTouchLeft = () => {
    if (gameEngineRef.current) {
      setTouchInputs(prev => ({ ...prev, left: true, right: false }));
      const input = { left: true, right: false, jump: touchInputs.jump };
      gameEngineRef.current.player.handleInput(input);
    }
  };

  const handleTouchRight = () => {
    if (gameEngineRef.current) {
      setTouchInputs(prev => ({ ...prev, left: false, right: true }));
      const input = { left: false, right: true, jump: touchInputs.jump };
      gameEngineRef.current.player.handleInput(input);
    }
  };

  const handleTouchJump = () => {
    if (gameEngineRef.current && gameEngineRef.current.player.grounded) {
      setTouchInputs(prev => ({ ...prev, jump: true }));
      const input = { left: touchInputs.left, right: touchInputs.right, jump: true };
      gameEngineRef.current.player.handleInput(input);
      audioManager.playSound('jump');
      
      // Reset jump after a short delay
      setTimeout(() => {
        setTouchInputs(prev => ({ ...prev, jump: false }));
      }, 300);
    }
  };

  const handleTouchPause = () => {
    setIsPaused(prev => !prev);
    audioManager.playSound('select');
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-dark-bg relative">
      <div className="w-full max-w-6xl aspect-video relative overflow-hidden border-4 border-light-text">
        <GameCanvas />
        <GameUI score={score} lives={lives} coins={coins} time={formatTime(gameTime)} />
        
        {isPaused && (
          <PauseMenu 
            onResume={resumeGame} 
            onRestart={restartLevel} 
            onMainMenu={returnToMenu} 
          />
        )}
        
        {isMobile && !isPaused && (
          <TouchControls
            onMoveLeft={handleTouchLeft}
            onMoveRight={handleTouchRight}
            onJump={handleTouchJump}
            onPause={handleTouchPause}
          />
        )}
      </div>
    </div>
  );
}
