export interface PowerUpSpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

export interface PowerUpSpriteDefinition {
  speed: PowerUpSpriteFrame[];
  jump: PowerUpSpriteFrame[];
}

export const powerupSprite: PowerUpSpriteDefinition = {
  speed: [
    // 4 frames of speed power-up animation
    { x: 0, y: 0, width: 24, height: 24, duration: 0.15 },
    { x: 24, y: 0, width: 24, height: 24, duration: 0.15 },
    { x: 48, y: 0, width: 24, height: 24, duration: 0.15 },
    { x: 72, y: 0, width: 24, height: 24, duration: 0.15 }
  ],
  jump: [
    // 4 frames of jump power-up animation
    { x: 0, y: 24, width: 24, height: 24, duration: 0.15 },
    { x: 24, y: 24, width: 24, height: 24, duration: 0.15 },
    { x: 48, y: 24, width: 24, height: 24, duration: 0.15 },
    { x: 72, y: 24, width: 24, height: 24, duration: 0.15 }
  ]
};

// Helper function to draw power-up without loading external images
export function drawPowerUp(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  type: string,
  blinkTimer: number,
  floatOffset: number
): void {
  // Apply blinking effect
  if (blinkTimer > 0.25) {
    ctx.globalAlpha = 0.6;
  }
  
  // Apply floating effect to y position
  const renderY = y + floatOffset;
  
  // Draw power-up based on type
  if (type === 'speed') {
    ctx.fillStyle = '#7bed9f';
    ctx.fillRect(x, renderY, width, height);
    
    // Draw lightning bolt symbol
    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.moveTo(x + width * 0.4, renderY + height * 0.2);
    ctx.lineTo(x + width * 0.6, renderY + height * 0.2);
    ctx.lineTo(x + width * 0.5, renderY + height * 0.5);
    ctx.lineTo(x + width * 0.7, renderY + height * 0.5);
    ctx.lineTo(x + width * 0.3, renderY + height * 0.8);
    ctx.lineTo(x + width * 0.5, renderY + height * 0.5);
    ctx.lineTo(x + width * 0.3, renderY + height * 0.5);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'jump') {
    ctx.fillStyle = '#70a1ff';
    ctx.fillRect(x, renderY, width, height);
    
    // Draw up arrow symbol
    ctx.fillStyle = '#1e90ff';
    ctx.beginPath();
    ctx.moveTo(x + width * 0.5, renderY + height * 0.2);
    ctx.lineTo(x + width * 0.2, renderY + height * 0.6);
    ctx.lineTo(x + width * 0.4, renderY + height * 0.6);
    ctx.lineTo(x + width * 0.4, renderY + height * 0.8);
    ctx.lineTo(x + width * 0.6, renderY + height * 0.8);
    ctx.lineTo(x + width * 0.6, renderY + height * 0.6);
    ctx.lineTo(x + width * 0.8, renderY + height * 0.6);
    ctx.closePath();
    ctx.fill();
  } else {
    // Generic power-up if type is unknown
    ctx.fillStyle = '#7bed9f';
    ctx.fillRect(x, renderY, width, height);
    
    // Draw star symbol
    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const starX = x + width / 2 + Math.cos(angle) * width * 0.4;
      const starY = renderY + height / 2 + Math.sin(angle) * height * 0.4;
      
      if (i === 0) {
        ctx.moveTo(starX, starY);
      } else {
        ctx.lineTo(starX, starY);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
  
  // Reset global alpha
  ctx.globalAlpha = 1;
}
