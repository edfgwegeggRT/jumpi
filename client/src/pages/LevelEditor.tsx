import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LevelEditor() {
  const [objects, setObjects] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<'platform' | 'coin' | 'enemy' | 'powerup'>('platform');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addObject = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 50) * 50;
    const y = Math.round((e.clientY - rect.top) / 50) * 50;

    const newObject = {
      type: selectedTool,
      x,
      y,
      ...(selectedTool === 'platform' && { width: 100, height: 30 }),
      ...(selectedTool === 'coin' && { width: 20, height: 20 }),
      ...(selectedTool === 'enemy' && { width: 32, height: 32, speed: 50, patrolDistance: 100 }),
      ...(selectedTool === 'powerup' && { width: 24, height: 24, type: 'speed' })
    };

    setObjects([...objects, newObject]);

    // Visual feedback
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(x - 5, y - 5, 10, 10);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(obj => {
      ctx.fillStyle = {
        platform: '#555',
        coin: '#FFD700',
        enemy: '#FF0000',
        powerup: '#00FF00'
      }[obj.type] || '#000';

      if (obj.type === 'platform') {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      } else {
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [objects]);

  const exportLevel = () => {
    const levelData = {
      playerStart: { x: 50, y: 400 },
      platforms: objects.filter(obj => obj.type === 'platform'),
      coins: objects.filter(obj => obj.type === 'coin'),
      enemies: objects.filter(obj => obj.type === 'enemy'),
      powerUps: objects.filter(obj => obj.type === 'powerup'),
      goal: { x: 2200, y: 410, width: 40, height: 150 }
    };

    const blob = new Blob([JSON.stringify(levelData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-level.json';
    a.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Level Editor</h1>
      <div className="mb-4 space-x-4">
        {['platform', 'coin', 'enemy', 'powerup'].map(tool => (
          <button
            key={tool}
            onClick={() => setSelectedTool(tool as any)}
            className={`px-4 py-2 rounded ${selectedTool === tool ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tool.charAt(0).toUpperCase() + tool.slice(1)}
          </button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={addObject}
        className="border border-gray-300 mb-4"
      />
      <div className="space-x-4">
        <button onClick={exportLevel} className="px-4 py-2 bg-green-500 text-white rounded">
          Export Level
        </button>
        <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded">
          Back to Menu
        </Link>
      </div>
    </div>
  );
}