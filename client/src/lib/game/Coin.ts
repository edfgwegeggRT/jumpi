interface CoinOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}

export class Coin {
  x: number;
  y: number;
  width: number;
  height: number;
  private value: number;
  private rotationAngle: number = 0;
  
  constructor(options: CoinOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.value = options.value;
    
    // Random starting angle for animation variety
    this.rotationAngle = Math.random() * Math.PI * 2;
  }
  
  update(deltaTime: number): void {
    // Rotate coin
    this.rotationAngle += deltaTime * 4;
    if (this.rotationAngle > Math.PI * 2) {
      this.rotationAngle -= Math.PI * 2;
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    // Save context state
    ctx.save();
    
    // Calculate scale for "squash and stretch" animation
    const scale = Math.abs(Math.cos(this.rotationAngle));
    
    // Draw coin
    ctx.fillStyle = '#ffa502'; // Gold color
    
    // Center of coin
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    
    // Draw using scaled ellipse for 3D rotation effect
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      centerY, 
      this.width / 2, // Radius X 
      this.height / 2 * scale, // Radius Y (scaled for rotation)
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Add shine detail
    ctx.fillStyle = '#ffd43b'; // Lighter gold for shine
    ctx.beginPath();
    ctx.ellipse(
      centerX - this.width * 0.1, 
      centerY - this.height * 0.1,
      this.width * 0.2,
      this.height * 0.1 * scale,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Restore context state
    ctx.restore();
  }
  
  getValue(): number {
    return this.value;
  }
}
