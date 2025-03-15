
export class GameState {
  private score: number = 0;
  private lives: number = 3;
  private coins: number = 0;
  private level: number = 1;
  private gameTime: number = 0;
  
  constructor() {
    this.loadGameState();
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
    this.saveGameState();
  }

  saveGameState(): void {
    const gameState = {
      score: this.score,
      lives: this.lives,
      coins: this.coins,
      level: this.level,
      gameTime: this.gameTime
    };
    localStorage.setItem('pixelJumperSave', JSON.stringify(gameState));
  }

  loadGameState(): boolean {
    const savedState = localStorage.getItem('pixelJumperSave');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.score = state.score;
      this.lives = state.lives;
      this.coins = state.coins;
      this.level = state.level;
      this.gameTime = state.gameTime;
      return true;
    }
    return false;
  }
}
