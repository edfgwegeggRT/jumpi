import { Player } from './Player';
import { Platform } from './Platform';
import { Coin } from './Coin';
import { Enemy } from './Enemy';
import { Physics } from './Physics';
import { CollisionDetection } from './CollisionDetection';
import { Level, LevelData } from './Level';
import { PowerUp } from './PowerUp';
import { GameState } from './GameState';
import { Input } from './Input';
import { audioManager } from './Audio';

// Game events callbacks
interface GameEvents {
  onCoinCollect: (value: number) => void;
  onEnemyHit: () => void;
  onPowerupCollect: () => void;
  onLevelComplete: () => void;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  
  private player: Player;
  private platforms: Platform[] = [];
  private coins: Coin[] = [];
  private enemies: Enemy[] = [];
  private powerUps: PowerUp[] = [];
  private goal: { x: number, y: number, width: number, height: number };
  
  private physics: Physics;
  private collisionDetection: CollisionDetection;
  private input: Input;
  private gameState: GameState;
  private level: Level;
  
  private events: GameEvents;
  private cameraX: number = 0;
  private cameraY: number = 0;
  
  constructor(canvas: HTMLCanvasElement, events: GameEvents) {
    this.canvas = canvas;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    this.ctx = context;
    
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.events = events;
    
    // Initialize input handler
    this.input = new Input();
    
    // Start game loop
    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
    
    // Initialize physics
    this.physics = new Physics();
    
    // Initialize collision detection
    this.collisionDetection = new CollisionDetection();
    
    // Initialize game state
    this.gameState = new GameState();
    
    // Initialize level
    this.level = new Level();
    const levelData = this.level.getLevel(1);
    
    // Initialize player
    this.player = new Player({
      x: levelData.playerStart.x,
      y: levelData.playerStart.y,
      width: 32,
      height: 48,
      color: '#ff4757'
    });
    
    // Initialize level elements
    this.initializeLevel(levelData);
    
    // Goal position
    this.goal = {
      x: levelData.goal.x,
      y: levelData.goal.y,
      width: levelData.goal.width,
      height: levelData.goal.height
    };
    
    // Resize canvas to parent container
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  private resize(): void {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }
  }
  
  private initializeLevel(levelData: LevelData): void {
    // Clear previous level elements
    this.platforms = [];
    this.coins = [];
    this.enemies = [];
    this.powerUps = [];
    
    // Create ground platform (spans entire level width)
    this.platforms.push(new Platform({
      x: 0,
      y: this.level.height - 48,
      width: this.level.width,
      height: 48,
      color: '#2ed573'
    }));
    
    // Create platforms
    levelData.platforms.forEach(platformData => {
      this.platforms.push(new Platform({
        x: platformData.x,
        y: platformData.y,
        width: platformData.width,
        height: platformData.height,
        color: '#2ed573'
      }));
    });
    
    // Create coins
    levelData.coins.forEach(coinData => {
      this.coins.push(new Coin({
        x: coinData.x,
        y: coinData.y,
        width: 16,
        height: 16,
        value: 10
      }));
    });
    
    // Create enemies
    levelData.enemies.forEach(enemyData => {
      this.enemies.push(new Enemy({
        x: enemyData.x,
        y: enemyData.y,
        width: 32,
        height: 32,
        speed: enemyData.speed,
        patrolDistance: enemyData.patrolDistance
      }));
    });
    
    // Create power-ups
    levelData.powerUps.forEach(powerUpData => {
      this.powerUps.push(new PowerUp({
        x: powerUpData.x,
        y: powerUpData.y,
        width: 24,
        height: 24,
        type: powerUpData.type
      }));
    });
  }
  
  public update(deltaTime: number): void {
    // Get input state
    const input = {
      left: this.input.left,
      right: this.input.right,
      jump: this.input.jump
    };
    
    // Check if the player is on the ground using the foot sensor
    this.player.grounded = this.collisionDetection.checkGrounded(this.player, this.platforms);
    
    // Update player with input and physics
    const inputState = {
      left: this.input.left,
      right: this.input.right,
      jump: this.input.jump
    };
    this.player.update(deltaTime, inputState);
    this.physics.applyPhysics(this.player, deltaTime);
    
    // Check collisions with platforms
    this.platforms.forEach(platform => {
      if (this.collisionDetection.checkCollision(this.player, platform)) {
        this.collisionDetection.resolveCollision(this.player, platform);
      }
    });
    
    // Check collisions with coins
    this.coins = this.coins.filter(coin => {
      const collided = this.collisionDetection.checkCollision(this.player, coin);
      if (collided) {
        this.events.onCoinCollect(coin.getValue());
        return false; // Remove collected coin
      }
      return true;
    });
    
    // Update and check collisions with enemies
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime, this.platforms);
      
      if (this.collisionDetection.checkCollision(this.player, enemy)) {
        // Check if player is jumping on enemy
        if (this.player.vy > 0 && this.player.y + this.player.height < enemy.y + enemy.height / 2) {
          // Player jumped on enemy
          enemy.defeat();
          this.player.bounce();
          audioManager.playSound('enemyDefeat');
        } else {
          // Player hit by enemy
          this.events.onEnemyHit();
          this.player.takeDamage();
        }
      }
    });
    
    // Remove defeated enemies
    this.enemies = this.enemies.filter(enemy => !enemy.isDefeated());
    
    // Check collisions with power-ups
    this.powerUps = this.powerUps.filter(powerUp => {
      const collided = this.collisionDetection.checkCollision(this.player, powerUp);
      if (collided) {
        this.events.onPowerupCollect();
        this.player.applyPowerUp(powerUp.getType());
        return false; // Remove collected power-up
      }
      return true;
    });
    
    // Check if player reached the goal
    if (this.collisionDetection.checkCollision(this.player, this.goal)) {
      this.events.onLevelComplete();
    }
    
    // Update camera position to follow player
    this.updateCamera();
  }
  
  private updateCamera(): void {
    // Camera follows player
    const targetX = this.player.x - this.width / 2 + this.player.width / 2;
    const targetY = this.player.y - this.height / 2 + this.player.height / 2;
    
    // Smooth camera movement
    this.cameraX += (targetX - this.cameraX) * 0.1;
    this.cameraY += (targetY - this.cameraY) * 0.1;
    
    // Clamp camera to level boundaries
    this.cameraX = Math.max(0, Math.min(this.cameraX, this.level.width - this.width));
    this.cameraY = Math.max(0, Math.min(this.cameraY, this.level.height - this.height));
  }
  
  public render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Save context state before applying camera transform
    this.ctx.save();
    
    // Apply camera transform
    this.ctx.translate(-this.cameraX, -this.cameraY);
    
    // Draw gradient sky background
    const gradient = this.ctx.createLinearGradient(this.cameraX, this.cameraY, this.cameraX, this.cameraY + this.height);
    gradient.addColorStop(0, '#2980b9');
    gradient.addColorStop(1, '#6dd5fa');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(this.cameraX, this.cameraY, this.width, this.height);
    
    // Draw sun with glow effect
    this.ctx.save();
    this.ctx.fillStyle = '#ffa502';
    this.ctx.shadowColor = '#ff6b6b';
    this.ctx.shadowBlur = 20;
    this.ctx.beginPath();
    this.ctx.arc(this.cameraX + this.width - 50, this.cameraY + 50, 35, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    
    // Draw clouds
    this.ctx.fillStyle = '#f1f2f6';
    this.drawCloud(this.cameraX + 100, this.cameraY + 80, 60, 30);
    this.drawCloud(this.cameraX + 300, this.cameraY + 60, 80, 40);
    
    // We don't need to draw the ground here as it's already added as a platform
    
    // Draw platforms
    this.platforms.forEach(platform => platform.render(this.ctx));
    
    // Draw coins
    this.coins.forEach(coin => coin.render(this.ctx));
    
    // Draw power-ups
    this.powerUps.forEach(powerUp => powerUp.render(this.ctx));
    
    // Draw enemies
    this.enemies.forEach(enemy => enemy.render(this.ctx));
    
    // Draw goal flag
    this.drawGoalFlag(this.goal.x, this.goal.y, this.goal.width, this.goal.height);
    
    // Draw player
    this.player.render(this.ctx);
    
    // Restore context state
    this.ctx.restore();
  }
  
  private drawCloud(x: number, y: number, width: number, height: number): void {
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  private drawGoalFlag(x: number, y: number, width: number, height: number): void {
    // Draw flag pole
    this.ctx.fillStyle = '#1e272e';
    this.ctx.fillRect(x, y - height, 8, height);
    
    // Draw flag
    this.ctx.fillStyle = '#ff4757';
    this.ctx.beginPath();
    this.ctx.moveTo(x + 8, y - height);
    this.ctx.lineTo(x + 8, y - height + 32);
    this.ctx.lineTo(x + 40, y - height + 16);
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  public resetLevel(): void {
    // Get current level from game state
    const currentLevel = this.gameState.getLevel();
    const levelData = this.level.getLevel(currentLevel);
    
    // Reset player position
    this.player.reset(levelData.playerStart.x, levelData.playerStart.y);
    
    // Reinitialize level elements
    this.initializeLevel(levelData);
  }
  
  public loadLevel(levelNumber: number): void {
    // Set the level in the game state
    this.gameState.setLevel(levelNumber);
    
    // Get the level data
    const levelData = this.level.getLevel(levelNumber);
    
    // Reset player position
    this.player.reset(levelData.playerStart.x, levelData.playerStart.y);
    
    // Initialize level elements
    this.initializeLevel(levelData);
  }
  
  // Method to handle touch input for mobile controls
  public handleTouchInput(input: { left: boolean; right: boolean; jump: boolean }): void {
    if (this.player) {
      this.player.handleInput(input);
    }
  }
  
  // Method to check if player is grounded (for touch jumps)
  public isPlayerGrounded(): boolean {
    return this.player ? this.player.grounded : false;
  }
}
