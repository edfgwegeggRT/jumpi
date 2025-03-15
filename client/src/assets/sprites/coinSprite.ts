export interface CoinSpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

export const coinSprite: CoinSpriteFrame[] = [
  // 6 frames of coin spinning animation
  { x: 0, y: 0, width: 16, height: 16, duration: 0.1 },
  { x: 16, y: 0, width: 16, height: 16, duration: 0.1 },
  { x: 32, y: 0, width: 16, height: 16, duration: 0.1 },
  { x: 48, y: 0, width: 16, height: 16, duration: 0.1 },
  { x: 64, y: 0, width: 16, height: 16, duration: 0.1 },
  { x: 80, y: 0, width: 16, height: 16, duration: 0.1 }
];

// Helper function to draw coin without loading external images
export function drawCoin(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  rotationAngle: number
): void {
  // Save context state
  ctx.save();
  
  // Calculate scale for "squash and stretch" animation
  const scale = Math.abs(Math.cos(rotationAngle));
  
  // Draw coin
  ctx.fillStyle = '#ffa502'; // Gold color
  
  // Center of coin
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  // Draw using scaled ellipse for 3D rotation effect
  ctx.beginPath();
  ctx.ellipse(
    centerX, 
    centerY, 
    width / 2, // Radius X 
    height / 2 * scale, // Radius Y (scaled for rotation)
    0, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Add shine detail
  ctx.fillStyle = '#ffd43b'; // Lighter gold for shine
  ctx.beginPath();
  ctx.ellipse(
    centerX - width * 0.1, 
    centerY - height * 0.1,
    width * 0.2,
    height * 0.1 * scale,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  // Restore context state
  ctx.restore();
}
