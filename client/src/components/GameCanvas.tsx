import { useRef, useEffect } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Canvas is initialized and controlled by the Game component
    // This just ensures the canvas is ready
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false; // Keep the pixelated look
      }
      
      // Set canvas dimensions
      const resize = () => {
        if (canvasRef.current) {
          const container = canvasRef.current.parentElement;
          if (container) {
            canvasRef.current.width = container.clientWidth;
            canvasRef.current.height = container.clientHeight;
          }
        }
      };
      
      resize();
      window.addEventListener('resize', resize);
      
      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, []);
  
  return (
    <canvas 
      id="game-canvas" 
      ref={canvasRef} 
      className="absolute inset-0 bg-sky-blue"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
