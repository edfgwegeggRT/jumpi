export class GameState {
  private score: number = 0;
  private lives: number = 3;
  private coins: number = 0;
  private level: number = 1;
  private gameTime: number = 0;
  
  constructor() {
    // Initialize game state
  }
  
  updateScore(points: number): void {
    this.score += points;
  }
  
  getScore(): number {
    return this.score;
  }
  
  updateLives(change: number): void {
    this.lives += change;
  }
  
  getLives(): number {
    return this.lives;
  }
  
  updateCoins(count: number): void {
    this.coins += count;
  }
  
  getCoins(): number {
    return this.coins;
  }
  
  setLevel(level: number): void {
    this.level = level;
  }
  
  getLevel(): number {
    return this.level;
  }
  
  updateGameTime(deltaTime: number): void {
    this.gameTime += deltaTime;
  }
  
  getGameTime(): number {
    return this.gameTime;
  }
  
  resetGameState(): void {
    this.score = 0;
    this.lives = 3;
    this.coins = 0;
    this.gameTime = 0;
  }
}
