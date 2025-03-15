export interface FlagSpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

export const flagSprite: FlagSpriteFrame[] = [
  // 4 frames of flag waving animation
  { x: 0, y: 0, width: 40, height: 32, duration: 0.2 },
  { x: 40, y: 0, width: 40, height: 32, duration: 0.2 },
  { x: 80, y: 0, width: 40, height: 32, duration: 0.2 },
  { x: 120, y: 0, width: 40, height: 32, duration: 0.2 }
];

// Helper function to draw flag without loading external images
export function drawFlag(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  frameCount: number
): void {
  // Save context state
  ctx.save();
  
  // Draw flag pole
  ctx.fillStyle = '#1e272e';
  ctx.fillRect(x, y - height, 8, height);
  
  // Draw flag with wave effect
  ctx.fillStyle = '#ff4757';
  
  // Calculate wave effect
  const waveOffset = Math.sin(frameCount * 0.2) * 4;
  
  ctx.beginPath();
  ctx.moveTo(x + 8, y - height);
  ctx.lineTo(x + 8, y - height + 32);
  ctx.lineTo(x + 40, y - height + 16 + waveOffset);
  ctx.closePath();
  ctx.fill();
  
  // Restore context state
  ctx.restore();
}
