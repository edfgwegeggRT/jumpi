interface PlayerOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export enum PlayerState {
  IDLE,
  RUNNING,
  JUMPING,
  FALLING,
  DAMAGED
}

export class Player {
  // Position
  x: number;
  y: number;
  
  // Dimensions
  width: number;
  height: number;
  
  // Appearance
  color: string;
  
  // Physics properties
  vx: number = 0;
  vy: number = 0;
  speed: number = 220;
  jumpForce: number = 550; // Increased jump height
  grounded: boolean = false;
  
  // Animation state
  state: PlayerState = PlayerState.IDLE;
  direction: number = 1; // 1 = right, -1 = left
  frameCount: number = 0;
  frameDuration: number = 0.1; // seconds per frame
  frameTimer: number = 0;
  
  // Invulnerability after taking damage
  invulnerable: boolean = false;
  invulnerabilityTimer: number = 0;
  invulnerabilityDuration: number = 1; // seconds
  
  // Power-up effects
  hasSpeedBoost: boolean = false;
  hasJumpBoost: boolean = false;
  powerUpTimer: number = 0;
  powerUpDuration: number = 5; // seconds
  
  constructor(options: PlayerOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }
  
  update(deltaTime: number, input: Input): void {
    // Handle horizontal movement
    if (input.left) {
      this.vx = -this.speed;
      this.direction = -1;
    } else if (input.right) {
      this.vx = this.speed;
      this.direction = 1;
    } else {
      this.vx = 0;
    }

    // Handle jumping
    if (input.jump && this.grounded) {
      this.vy = -this.jumpForce;
      this.grounded = false;
    }

    // Update position based on velocity
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    
    // Update animation frame
    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameDuration) {
      this.frameTimer = 0;
      this.frameCount = (this.frameCount + 1) % 4; // 4 frames of animation
    }
    
    // Update invulnerability timer
    if (this.invulnerable) {
      this.invulnerabilityTimer += deltaTime;
      if (this.invulnerabilityTimer >= this.invulnerabilityDuration) {
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
      }
    }
    
    // Update power-up timer
    if (this.hasSpeedBoost || this.hasJumpBoost) {
      this.powerUpTimer += deltaTime;
      if (this.powerUpTimer >= this.powerUpDuration) {
        this.hasSpeedBoost = false;
        this.hasJumpBoost = false;
        this.powerUpTimer = 0;
        this.speed = 220; // Reset to default speed
        this.jumpForce = 550; // Reset to default jump force
      }
    }
    
    // Update player state
    if (this.vy < 0) {
      this.state = PlayerState.JUMPING;
    } else if (this.vy > 0) {
      this.state = PlayerState.FALLING;
    } else if (Math.abs(this.vx) > 0) {
      this.state = PlayerState.RUNNING;
    } else {
      this.state = PlayerState.IDLE;
    }
    
    // Update facing direction
    if (this.vx > 0) {
      this.direction = 1;
    } else if (this.vx < 0) {
      this.direction = -1;
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    if (this.invulnerable && Math.floor(this.invulnerabilityTimer * 10) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    // Base body
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(0, this.hasSpeedBoost ? '#7bed9f' : '#4834d4');
    gradient.addColorStop(1, this.hasSpeedBoost ? '#2ed573' : '#686de0');
    ctx.fillStyle = gradient;
    
    // Draw rounded rectangle for body
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(this.x + radius, this.y);
    ctx.lineTo(this.x + this.width - radius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
    ctx.lineTo(this.x + this.width, this.y + this.height - radius);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height);
    ctx.lineTo(this.x + radius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - radius);
    ctx.lineTo(this.x, this.y + radius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
    ctx.closePath();
    ctx.fill();
    
    // Cape effect
    if (this.state === PlayerState.JUMPING || this.state === PlayerState.FALLING) {
      ctx.fillStyle = '#ff7675';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width * 0.5, this.y + this.height * 0.2);
      ctx.quadraticCurveTo(
        this.x + this.width * (this.direction > 0 ? -0.2 : 1.2),
        this.y + this.height * 0.5,
        this.x + this.width * 0.5,
        this.y + this.height
      );
      ctx.fill();
    }
    
    // Eyes with glow effect
    const eyeY = this.y + this.height * 0.3;
    const leftEyeX = this.x + (this.direction > 0 ? this.width * 0.3 : this.width * 0.6);
    const rightEyeX = this.x + (this.direction > 0 ? this.width * 0.6 : this.width * 0.3);
    
    // Glow
    ctx.shadowColor = '#00cec9';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#81ecec';
    const eyeSize = this.width * 0.15;
    
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Expression
    const mouthY = this.y + this.height * 0.5;
    const mouthWidth = this.width * 0.5;
    const mouthHeight = this.height * 0.1;
    
    if (this.state === PlayerState.JUMPING || this.state === PlayerState.FALLING) {
      // Surprised O mouth when jumping/falling
      ctx.beginPath();
      ctx.arc(this.x + this.width * 0.5, mouthY + mouthHeight / 2, mouthHeight, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.state === PlayerState.RUNNING) {
      // Animated mouth when running
      const mouthOffset = (this.frameCount % 2) * mouthHeight * 0.3;
      ctx.fillRect(this.x + this.width * 0.25, mouthY + mouthOffset, mouthWidth, mouthHeight);
    } else {
      // Default smile
      ctx.fillRect(this.x + this.width * 0.25, mouthY, mouthWidth, mouthHeight);
    }
    
    // Restore context state
    ctx.restore();
  }
  
  handleInput(input: { left: boolean; right: boolean; jump: boolean }): void {
    // Reset horizontal velocity
    this.vx = 0;
    
    // Move left/right
    const currentSpeed = this.hasSpeedBoost ? this.speed * 1.5 : this.speed;
    
    if (input.left) {
      this.vx = -currentSpeed;
    }
    
    if (input.right) {
      this.vx = currentSpeed;
    }
    
    // Jump only if player is on the ground
    if (input.jump && this.grounded) {
      this.vy = -this.jumpForce;
      this.grounded = false;
      // Play jump sound
      const audioManager = (window as any).audioManager;
      if (audioManager) {
        audioManager.playSound('jump');
      }
      console.log('Jump triggered', this.jumpForce);
    }
  }
  
  takeDamage(): void {
    if (!this.invulnerable) {
      this.invulnerable = true;
      this.invulnerabilityTimer = 0;
      this.state = PlayerState.DAMAGED;
      
      // Knockback effect
      this.vy = -200;
      this.vx = this.direction * -150;
    }
  }
  
  bounce(): void {
    // Bounce up after jumping on an enemy
    this.vy = -this.jumpForce * 0.7;
  }
  
  applyPowerUp(type: string): void {
    switch (type) {
      case 'speed':
        this.hasSpeedBoost = true;
        this.speed = 300; // Boosted speed
        break;
      case 'jump':
        this.hasJumpBoost = true;
        this.jumpForce = 700; // Greatly boosted jump
        break;
    }
    
    this.powerUpTimer = 0;
  }
  
  reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.state = PlayerState.IDLE;
    this.invulnerable = false;
    this.hasSpeedBoost = false;
    this.hasJumpBoost = false;
  }
}
