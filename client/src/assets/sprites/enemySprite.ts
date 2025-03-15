export interface EnemySpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

export interface EnemySpriteDefinition {
  walk: EnemySpriteFrame[];
  attack: EnemySpriteFrame[];
  defeated: EnemySpriteFrame[];
}

export const enemySprite: EnemySpriteDefinition = {
  walk: [
    // 4 frames of walking animation
    { x: 0, y: 0, width: 32, height: 32, duration: 0.15 },
    { x: 32, y: 0, width: 32, height: 32, duration: 0.15 },
    { x: 64, y: 0, width: 32, height: 32, duration: 0.15 },
    { x: 96, y: 0, width: 32, height: 32, duration: 0.15 }
  ],
  attack: [
    // 2 frames of attack animation
    { x: 0, y: 32, width: 32, height: 32, duration: 0.2 },
    { x: 32, y: 32, width: 32, height: 32, duration: 0.2 }
  ],
  defeated: [
    // 1 frame for defeated state
    { x: 64, y: 32, width: 32, height: 32, duration: 0.5 }
  ]
};

// Helper function to draw enemy without loading external images
export function drawEnemy(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  direction: number, 
  frameCount: number, 
  defeated: boolean = false
): void {
  if (defeated) return;
  
  // Save context state
  ctx.save();
  
  // Draw enemy body
  ctx.fillStyle = '#ff6b81';
  ctx.fillRect(x, y, width, height);
  
  // Draw enemy eyes
  ctx.fillStyle = '#f1f2f6';
  
  // Left eye with angry expression
  const eyeSize = width * 0.15;
  const eyeY = y + height * 0.25;
  const leftEyeX = x + (direction > 0 ? width * 0.25 : width * 0.6);
  const rightEyeX = x + (direction > 0 ? width * 0.6 : width * 0.25);
  
  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw angry eyebrows
  ctx.fillStyle = '#1e272e';
  ctx.beginPath();
  if (direction > 0) {
    ctx.moveTo(leftEyeX - eyeSize, eyeY - eyeSize);
    ctx.lineTo(leftEyeX + eyeSize, eyeY - eyeSize * 1.5);
    ctx.lineTo(leftEyeX + eyeSize, eyeY - eyeSize);
    ctx.closePath();
    
    ctx.moveTo(rightEyeX - eyeSize, eyeY - eyeSize * 1.5);
    ctx.lineTo(rightEyeX + eyeSize, eyeY - eyeSize);
    ctx.lineTo(rightEyeX - eyeSize, eyeY - eyeSize);
    ctx.closePath();
  } else {
    ctx.moveTo(leftEyeX - eyeSize, eyeY - eyeSize * 1.5);
    ctx.lineTo(leftEyeX + eyeSize, eyeY - eyeSize);
    ctx.lineTo(leftEyeX - eyeSize, eyeY - eyeSize);
    ctx.closePath();
    
    ctx.moveTo(rightEyeX - eyeSize, eyeY - eyeSize);
    ctx.lineTo(rightEyeX + eyeSize, eyeY - eyeSize * 1.5);
    ctx.lineTo(rightEyeX + eyeSize, eyeY - eyeSize);
    ctx.closePath();
  }
  ctx.fill();
  
  // Draw mouth
  const mouthY = y + height * 0.6;
  
  ctx.fillStyle = '#1e272e';
  ctx.beginPath();
  ctx.moveTo(x + width * 0.3, mouthY);
  ctx.lineTo(x + width * 0.7, mouthY);
  ctx.lineTo(x + width * 0.5, mouthY + height * 0.15);
  ctx.closePath();
  ctx.fill();
  
  // Draw some spikes on top to make it look menacing
  const spikes = 3;
  const spikeWidth = width / spikes;
  
  ctx.fillStyle = '#ff6b81';
  for (let i = 0; i < spikes; i++) {
    const spikeHeight = height * 0.2 * (1 + 0.5 * Math.sin(frameCount + i));
    ctx.beginPath();
    ctx.moveTo(x + i * spikeWidth, y);
    ctx.lineTo(x + (i + 0.5) * spikeWidth, y - spikeHeight);
    ctx.lineTo(x + (i + 1) * spikeWidth, y);
    ctx.closePath();
    ctx.fill();
  }
  
  // Restore context state
  ctx.restore();
}
