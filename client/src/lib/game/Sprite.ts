interface SpriteFrameOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
}

interface SpriteOptions {
  frames: SpriteFrameOptions[];
  loop: boolean;
}

export class Sprite {
  private frames: SpriteFrameOptions[];
  private currentFrame: number = 0;
  private frameTimer: number = 0;
  private loop: boolean;
  private isPlaying: boolean = false;
  private isComplete: boolean = false;
  
  constructor(options: SpriteOptions) {
    this.frames = options.frames;
    this.loop = options.loop;
  }
  
  play(): void {
    this.isPlaying = true;
    this.isComplete = false;
    this.currentFrame = 0;
    this.frameTimer = 0;
  }
  
  stop(): void {
    this.isPlaying = false;
  }
  
  reset(): void {
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.isComplete = false;
  }
  
  update(deltaTime: number): void {
    if (!this.isPlaying || this.frames.length === 0) return;
    
    this.frameTimer += deltaTime;
    
    if (this.frameTimer >= this.frames[this.currentFrame].duration) {
      this.frameTimer = 0;
      this.currentFrame++;
      
      if (this.currentFrame >= this.frames.length) {
        if (this.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = this.frames.length - 1;
          this.isPlaying = false;
          this.isComplete = true;
        }
      }
    }
  }
  
  getCurrentFrame(): SpriteFrameOptions {
    return this.frames[this.currentFrame];
  }
  
  isFinished(): boolean {
    return this.isComplete;
  }
}
