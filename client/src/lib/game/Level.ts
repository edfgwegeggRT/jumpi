interface PlatformData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CoinData {
  x: number;
  y: number;
}

interface EnemyData {
  x: number;
  y: number;
  speed: number;
  patrolDistance: number;
}

interface PowerUpData {
  x: number;
  y: number;
  type: string;
}

interface GoalData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LevelData {
  playerStart: { x: number; y: number };
  platforms: PlatformData[];
  coins: CoinData[];
  enemies: EnemyData[];
  powerUps: PowerUpData[];
  goal: GoalData;
}

export class Level {
  width: number = 2000; // Total level width
  height: number = 600; // Total level height
  
  private levels: Record<number, LevelData> = {
    1: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        // Ground is handled separately in rendering
        // Platform layout
        { x: 200, y: 450, width: 200, height: 30 },
        { x: 500, y: 400, width: 150, height: 30 },
        { x: 700, y: 350, width: 200, height: 30 },
        { x: 1000, y: 400, width: 150, height: 30 },
        { x: 1200, y: 350, width: 100, height: 30 },
        { x: 1400, y: 300, width: 200, height: 30 },
        { x: 1700, y: 350, width: 200, height: 30 }
      ],
      coins: [
        { x: 250, y: 400 },
        { x: 300, y: 400 },
        { x: 550, y: 350 },
        { x: 800, y: 300 },
        { x: 1050, y: 350 },
        { x: 1230, y: 300 },
        { x: 1450, y: 250 },
        { x: 1500, y: 250 },
        { x: 1780, y: 300 },
        { x: 1830, y: 300 }
      ],
      enemies: [
        { x: 300, y: 518, speed: 50, patrolDistance: 150 },
        { x: 800, y: 318, speed: 60, patrolDistance: 150 },
        { x: 1500, y: 268, speed: 70, patrolDistance: 150 }
      ],
      powerUps: [
        { x: 600, y: 350, type: 'speed' },
        { x: 1300, y: 300, type: 'jump' }
      ],
      goal: { x: 1900, y: 510, width: 40, height: 150 }
    },
    // Additional levels can be added here
  };
  
  getLevel(levelNumber: number): LevelData {
    // Default to level 1 if requested level doesn't exist
    return this.levels[levelNumber] || this.levels[1];
  }
  
  getLevelCount(): number {
    return Object.keys(this.levels).length;
  }
}
