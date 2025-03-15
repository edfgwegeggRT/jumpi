export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

export interface SpriteDefinition {
  idle: SpriteFrame[];
  run: SpriteFrame[];
  jump: SpriteFrame[];
  fall: SpriteFrame[];
  damaged: SpriteFrame[];
}

export const characterSprite: SpriteDefinition = {
  idle: [
    // 4 frames of idle animation
    { x: 0, y: 0, width: 32, height: 48, duration: 0.2 },
    { x: 32, y: 0, width: 32, height: 48, duration: 0.2 },
    { x: 64, y: 0, width: 32, height: 48, duration: 0.2 },
    { x: 96, y: 0, width: 32, height: 48, duration: 0.2 }
  ],
  run: [
    // 6 frames of running animation
    { x: 0, y: 48, width: 32, height: 48, duration: 0.1 },
    { x: 32, y: 48, width: 32, height: 48, duration: 0.1 },
    { x: 64, y: 48, width: 32, height: 48, duration: 0.1 },
    { x: 96, y: 48, width: 32, height: 48, duration: 0.1 },
    { x: 128, y: 48, width: 32, height: 48, duration: 0.1 },
    { x: 160, y: 48, width: 32, height: 48, duration: 0.1 }
  ],
  jump: [
    // Jump frame (single frame)
    { x: 0, y: 96, width: 32, height: 48, duration: 0.5 }
  ],
  fall: [
    // Fall frame (single frame)
    { x: 32, y: 96, width: 32, height: 48, duration: 0.5 }
  ],
  damaged: [
    // Damaged animation (blinking)
    { x: 64, y: 96, width: 32, height: 48, duration: 0.1 },
    { x: 96, y: 96, width: 32, height: 48, duration: 0.1 }
  ]
};

// Helper function to draw character without loading external images
export function drawCharacter(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  color: string, 
  state: string, 
  direction: number, 
  frameCount: number
): void {
  // Save context state
  ctx.save();
  
  // Apply blinking effect when damaged
  if (state === 'damaged' && frameCount % 2 === 0) {
    ctx.globalAlpha = 0.5;
  }
  
  // Draw character body
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  
  // Draw character face
  ctx.fillStyle = '#f1f2f6';
  
  // Eyes
  const eyeSize = width * 0.2;
  const eyeY = y + height * 0.2;
  const leftEyeX = x + (direction > 0 ? width * 0.25 : width * 0.55);
  const rightEyeX = x + (direction > 0 ? width * 0.55 : width * 0.25);
  
  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth
  const mouthY = y + height * 0.4;
  const mouthWidth = width * 0.5;
  const mouthHeight = height * 0.1;
  
  if (state === 'jump' || state === 'fall') {
    // Surprised O mouth when jumping/falling
    ctx.beginPath();
    ctx.arc(x + width * 0.5, mouthY + mouthHeight / 2, mouthHeight, 0, Math.PI * 2);
    ctx.fill();
  } else if (state === 'run') {
    // Animated mouth when running
    const mouthOffset = (frameCount % 2) * mouthHeight * 0.3;
    ctx.fillRect(x + width * 0.25, mouthY + mouthOffset, mouthWidth, mouthHeight);
  } else {
    // Default smile
    ctx.fillRect(x + width * 0.25, mouthY, mouthWidth, mouthHeight);
  }
  
  // Restore context state
  ctx.restore();
}
