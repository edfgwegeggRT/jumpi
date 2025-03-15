import { Platform } from './Platform';

interface EnemyOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  patrolDistance: number;
}

export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  private speed: number;
  private direction: number = 1; // 1 = right, -1 = left
  private patrolDistance: number;
  private startX: number;
  private defeated: boolean = false;
  private frameCount: number = 0;
  private frameDuration: number = 0.15; // seconds per frame
  private frameTimer: number = 0;
  
  constructor(options: EnemyOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.speed = options.speed;
    this.patrolDistance = options.patrolDistance;
    this.startX = options.x;
  }
  
  update(deltaTime: number, platforms: Platform[]): void {
    if (this.defeated) return;
    
    // Update animation frame
    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameDuration) {
      this.frameTimer = 0;
      this.frameCount = (this.frameCount + 1) % 4; // 4 frames of animation
    }
    
    // Move in current direction
    this.x += this.direction * this.speed * deltaTime;
    
    // Check if enemy has reached patrol boundaries
    if (this.direction > 0 && this.x > this.startX + this.patrolDistance) {
      this.direction = -1;
    } else if (this.direction < 0 && this.x < this.startX) {
      this.direction = 1;
    }
    
    // Check if enemy is about to fall off platform
    this.checkPlatformEdges(platforms);
  }
  
  private checkPlatformEdges(platforms: Platform[]): void {
    // Look ahead in the direction the enemy is moving
    const lookAheadX = this.x + (this.direction * (this.width / 2 + 5));
    const feetY = this.y + this.height;
    
    // Check if there's a platform below the look-ahead position
    let hasGround = false;
    
    for (const platform of platforms) {
      // Check if enemy is above this platform
      if (lookAheadX >= platform.x && 
          lookAheadX <= platform.x + platform.width &&
          feetY <= platform.y && 
          feetY + 10 >= platform.y) {
        hasGround = true;
        break;
      }
    }
    
    // If there's no ground ahead, turn around
    if (!hasGround) {
      this.direction *= -1;
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    if (this.defeated) return;
    
    ctx.save();
    
    // Crystal-like body
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
    gradient.addColorStop(0, '#e056fd');
    gradient.addColorStop(0.5, '#686de0');
    gradient.addColorStop(1, '#ff6b81');
    
    ctx.fillStyle = gradient;
    
    // Crystalline shape
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height * 0.3);
    ctx.lineTo(this.x + this.width, this.y + this.height * 0.7);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height * 0.7);
    ctx.lineTo(this.x, this.y + this.height * 0.3);
    ctx.closePath();
    ctx.fill();
    
    // Glowing core
    const coreGradient = ctx.createRadialGradient(
      this.x + this.width / 2, this.y + this.height / 2, 0,
      this.x + this.width / 2, this.y + this.height / 2, this.width * 0.3
    );
    coreGradient.addColorStop(0, 'rgba(255, 107, 129, 0.8)');
    coreGradient.addColorStop(1, 'rgba(255, 107, 129, 0)');
    
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Evil eyes with glow
    ctx.shadowColor = '#ff4757';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ff6b81';
    
    const eyeSize = this.width * 0.15;
    const eyeY = this.y + this.height * 0.4;
    const leftEyeX = this.x + (this.direction > 0 ? this.width * 0.3 : this.width * 0.7);
    const rightEyeX = this.x + (this.direction > 0 ? this.width * 0.7 : this.width * 0.3);
    
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw angry eyebrows
    ctx.fillStyle = '#1e272e';
    ctx.beginPath();
    if (this.direction > 0) {
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
    const mouthY = this.y + this.height * 0.6;
    
    ctx.fillStyle = '#1e272e';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width * 0.3, mouthY);
    ctx.lineTo(this.x + this.width * 0.7, mouthY);
    ctx.lineTo(this.x + this.width * 0.5, mouthY + this.height * 0.15);
    ctx.closePath();
    ctx.fill();
    
    // Draw some spikes on top to make it look menacing
    const spikes = 3;
    const spikeWidth = this.width / spikes;
    
    ctx.fillStyle = '#ff6b81';
    for (let i = 0; i < spikes; i++) {
      const spikeHeight = this.height * 0.2 * (1 + 0.5 * Math.sin(this.frameCount + i));
      ctx.beginPath();
      ctx.moveTo(this.x + i * spikeWidth, this.y);
      ctx.lineTo(this.x + (i + 0.5) * spikeWidth, this.y - spikeHeight);
      ctx.lineTo(this.x + (i + 1) * spikeWidth, this.y);
      ctx.closePath();
      ctx.fill();
    }
    
    // Restore context state
    ctx.restore();
  }
  
  defeat(): void {
    this.defeated = true;
  }
  
  isDefeated(): boolean {
    return this.defeated;
  }
}
