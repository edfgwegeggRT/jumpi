import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import PauseMenu from '@/components/PauseMenu';
import { GameEngine } from '@/lib/game/Engine';
import { audioManager } from '@/lib/game/Audio';

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
  
  const gameEngineRef = useRef<GameEngine | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Initialize game engine
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    // Create game engine instance
    gameEngineRef.current = new GameEngine(canvas, {
      onCoinCollect: (value) => {
        setCoins(prev => prev + 1);
        setScore(prev => prev + value);
        audioManager.playSound('coin');
      },
      onEnemyHit: () => {
        setLives(prev => prev - 1);
        audioManager.playSound('damage');
      },
      onPowerupCollect: () => {
        setScore(prev => prev + 50);
        audioManager.playSound('powerup');
      },
      onLevelComplete: () => {
        setLevelCompleted(true);
        const completionTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCompletionTime(completionTime);
        audioManager.playSound('levelComplete');
      }
    });
    
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

        // Check game over condition
        if (lives <= 0 && !isGameOver) {
          setIsGameOver(true);
        }
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    // Set up event listeners for pausing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Play background music
    audioManager.playBackgroundMusic();
    
    return () => {
      // Clean up
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      audioManager.stopBackgroundMusic();
    };
  }, [isPaused, lives]);

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
      </div>
    </div>
  );
}
