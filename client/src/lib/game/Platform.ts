interface PlatformOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export class Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  
  constructor(options: PlatformOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    // Draw platform
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw bottom edge to give depth
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(this.x, this.y + this.height, this.width, 4);
  }
}
