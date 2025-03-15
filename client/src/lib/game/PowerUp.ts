interface PowerUpOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

export class PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  private type: string;
  private blinkTimer: number = 0;
  private floatTimer: number = 0;
  private floatOffset: number = 0;
  
  constructor(options: PowerUpOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.type = options.type;
  }
  
  update(deltaTime: number): void {
    // Blink effect
    this.blinkTimer += deltaTime;
    if (this.blinkTimer > 0.5) {
      this.blinkTimer = 0;
    }
    
    // Float effect
    this.floatTimer += deltaTime;
    this.floatOffset = Math.sin(this.floatTimer * 4) * 5;
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    // Apply blinking effect
    if (this.blinkTimer > 0.25) {
      ctx.globalAlpha = 0.6;
    }
    
    // Apply floating effect to y position
    const renderY = this.y + this.floatOffset;
    
    // Draw power-up based on type
    if (this.type === 'speed') {
      ctx.fillStyle = '#7bed9f';
      ctx.fillRect(this.x, renderY, this.width, this.height);
      
      // Draw lightning bolt symbol
      ctx.fillStyle = '#2ed573';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width * 0.4, renderY + this.height * 0.2);
      ctx.lineTo(this.x + this.width * 0.6, renderY + this.height * 0.2);
      ctx.lineTo(this.x + this.width * 0.5, renderY + this.height * 0.5);
      ctx.lineTo(this.x + this.width * 0.7, renderY + this.height * 0.5);
      ctx.lineTo(this.x + this.width * 0.3, renderY + this.height * 0.8);
      ctx.lineTo(this.x + this.width * 0.5, renderY + this.height * 0.5);
      ctx.lineTo(this.x + this.width * 0.3, renderY + this.height * 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'jump') {
      ctx.fillStyle = '#70a1ff';
      ctx.fillRect(this.x, renderY, this.width, this.height);
      
      // Draw up arrow symbol
      ctx.fillStyle = '#1e90ff';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width * 0.5, renderY + this.height * 0.2);
      ctx.lineTo(this.x + this.width * 0.2, renderY + this.height * 0.6);
      ctx.lineTo(this.x + this.width * 0.4, renderY + this.height * 0.6);
      ctx.lineTo(this.x + this.width * 0.4, renderY + this.height * 0.8);
      ctx.lineTo(this.x + this.width * 0.6, renderY + this.height * 0.8);
      ctx.lineTo(this.x + this.width * 0.6, renderY + this.height * 0.6);
      ctx.lineTo(this.x + this.width * 0.8, renderY + this.height * 0.6);
      ctx.closePath();
      ctx.fill();
    } else {
      // Generic power-up if type is unknown
      ctx.fillStyle = '#7bed9f';
      ctx.fillRect(this.x, renderY, this.width, this.height);
      
      // Draw star symbol
      ctx.fillStyle = '#2ed573';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x = this.x + this.width / 2 + Math.cos(angle) * this.width * 0.4;
        const y = renderY + this.height / 2 + Math.sin(angle) * this.height * 0.4;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1;
  }
  
  getType(): string {
    return this.type;
  }
}
