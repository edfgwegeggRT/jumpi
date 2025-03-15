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
  width: number = 2500; // Increased total level width
  height: number = 600; // Keep the original height
  
  private levels: Record<number, LevelData> = {
    // Level 1: Basic tutorial level
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
    
    // Level 2: Stair climb
    2: {
      playerStart: { x: 50, y: 500 },
      platforms: [
        { x: 200, y: 450, width: 150, height: 30 },
        { x: 400, y: 400, width: 150, height: 30 },
        { x: 600, y: 350, width: 150, height: 30 },
        { x: 800, y: 300, width: 150, height: 30 },
        { x: 1000, y: 250, width: 150, height: 30 },
        { x: 1200, y: 200, width: 150, height: 30 },
        { x: 1400, y: 250, width: 150, height: 30 },
        { x: 1600, y: 300, width: 150, height: 30 },
        { x: 1800, y: 350, width: 150, height: 30 },
        { x: 2000, y: 400, width: 150, height: 30 }
      ],
      coins: [
        { x: 225, y: 400 },
        { x: 425, y: 350 },
        { x: 625, y: 300 },
        { x: 825, y: 250 },
        { x: 1025, y: 200 },
        { x: 1225, y: 150 },
        { x: 1425, y: 200 },
        { x: 1625, y: 250 },
        { x: 1825, y: 300 },
        { x: 2025, y: 350 }
      ],
      enemies: [
        { x: 250, y: 418, speed: 50, patrolDistance: 100 },
        { x: 650, y: 318, speed: 60, patrolDistance: 100 },
        { x: 1050, y: 218, speed: 70, patrolDistance: 100 },
        { x: 1450, y: 218, speed: 70, patrolDistance: 100 },
        { x: 1850, y: 318, speed: 60, patrolDistance: 100 }
      ],
      powerUps: [
        { x: 825, y: 200, type: 'jump' },
        { x: 1625, y: 200, type: 'speed' }
      ],
      goal: { x: 2200, y: 410, width: 40, height: 150 }
    },
    
    // Level 3: Downward slopes
    3: {
      playerStart: { x: 50, y: 250 },
      platforms: [
        { x: 150, y: 250, width: 200, height: 30 },
        { x: 400, y: 280, width: 200, height: 30 },
        { x: 650, y: 310, width: 200, height: 30 },
        { x: 900, y: 340, width: 200, height: 30 },
        { x: 1150, y: 370, width: 200, height: 30 },
        { x: 1400, y: 400, width: 200, height: 30 },
        { x: 1650, y: 430, width: 200, height: 30 },
        { x: 1900, y: 460, width: 200, height: 30 }
      ],
      coins: [
        { x: 200, y: 200 },
        { x: 250, y: 200 },
        { x: 450, y: 230 },
        { x: 500, y: 230 },
        { x: 700, y: 260 },
        { x: 750, y: 260 },
        { x: 950, y: 290 },
        { x: 1000, y: 290 },
        { x: 1200, y: 320 },
        { x: 1250, y: 320 },
        { x: 1450, y: 350 },
        { x: 1500, y: 350 },
        { x: 1700, y: 380 },
        { x: 1750, y: 380 },
        { x: 1950, y: 410 }
      ],
      enemies: [
        { x: 220, y: 218, speed: 60, patrolDistance: 130 },
        { x: 700, y: 278, speed: 70, patrolDistance: 150 },
        { x: 1200, y: 338, speed: 80, patrolDistance: 150 },
        { x: 1700, y: 398, speed: 90, patrolDistance: 150 }
      ],
      powerUps: [
        { x: 500, y: 180, type: 'speed' },
        { x: 1000, y: 240, type: 'jump' },
        { x: 1500, y: 300, type: 'speed' }
      ],
      goal: { x: 2100, y: 470, width: 40, height: 150 }
    },
    
    // Level 4: Vertical challenge
    4: {
      playerStart: { x: 50, y: 500 },
      platforms: [
        { x: 200, y: 500, width: 150, height: 30 },
        { x: 400, y: 450, width: 150, height: 30 },
        { x: 200, y: 400, width: 150, height: 30 },
        { x: 400, y: 350, width: 150, height: 30 },
        { x: 200, y: 300, width: 150, height: 30 },
        { x: 400, y: 250, width: 150, height: 30 },
        { x: 200, y: 200, width: 150, height: 30 },
        { x: 400, y: 150, width: 400, height: 30 },
        { x: 850, y: 200, width: 150, height: 30 },
        { x: 1050, y: 250, width: 150, height: 30 },
        { x: 1250, y: 300, width: 150, height: 30 },
        { x: 1450, y: 350, width: 150, height: 30 },
        { x: 1650, y: 400, width: 300, height: 30 }
      ],
      coins: [
        { x: 225, y: 450 },
        { x: 425, y: 400 },
        { x: 225, y: 350 },
        { x: 425, y: 300 },
        { x: 225, y: 250 },
        { x: 425, y: 200 },
        { x: 225, y: 150 },
        { x: 550, y: 100 },
        { x: 875, y: 150 },
        { x: 1075, y: 200 },
        { x: 1275, y: 250 },
        { x: 1475, y: 300 },
        { x: 1750, y: 350 }
      ],
      enemies: [
        { x: 250, y: 468, speed: 50, patrolDistance: 100 },
        { x: 225, y: 368, speed: 50, patrolDistance: 100 },
        { x: 225, y: 268, speed: 50, patrolDistance: 100 },
        { x: 225, y: 168, speed: 50, patrolDistance: 100 },
        { x: 550, y: 118, speed: 90, patrolDistance: 200 },
        { x: 1300, y: 268, speed: 60, patrolDistance: 100 },
        { x: 1700, y: 368, speed: 70, patrolDistance: 200 }
      ],
      powerUps: [
        { x: 425, y: 100, type: 'jump' },
        { x: 700, y: 100, type: 'speed' },
        { x: 1700, y: 300, type: 'jump' }
      ],
      goal: { x: 1900, y: 410, width: 40, height: 150 }
    },
    
    // Level 5: Gap jumping
    5: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        { x: 150, y: 450, width: 200, height: 30 },
        { x: 450, y: 450, width: 200, height: 30 },
        { x: 750, y: 450, width: 200, height: 30 },
        { x: 1050, y: 450, width: 200, height: 30 },
        { x: 1350, y: 450, width: 200, height: 30 },
        { x: 1650, y: 450, width: 200, height: 30 },
        { x: 1950, y: 450, width: 200, height: 30 },
        
        // Higher platforms
        { x: 300, y: 350, width: 100, height: 30 },
        { x: 600, y: 350, width: 100, height: 30 },
        { x: 900, y: 350, width: 100, height: 30 },
        { x: 1200, y: 350, width: 100, height: 30 },
        { x: 1500, y: 350, width: 100, height: 30 },
        { x: 1800, y: 350, width: 100, height: 30 }
      ],
      coins: [
        { x: 350, y: 300 },
        { x: 650, y: 300 },
        { x: 950, y: 300 },
        { x: 1250, y: 300 },
        { x: 1550, y: 300 },
        { x: 1850, y: 300 },
        
        // Challenging coins in gaps
        { x: 375, y: 400 },
        { x: 675, y: 400 },
        { x: 975, y: 400 },
        { x: 1275, y: 400 },
        { x: 1575, y: 400 },
        { x: 1875, y: 400 }
      ],
      enemies: [
        { x: 200, y: 418, speed: 70, patrolDistance: 150 },
        { x: 500, y: 418, speed: 70, patrolDistance: 150 },
        { x: 800, y: 418, speed: 70, patrolDistance: 150 },
        { x: 1100, y: 418, speed: 70, patrolDistance: 150 },
        { x: 1400, y: 418, speed: 70, patrolDistance: 150 },
        { x: 1700, y: 418, speed: 70, patrolDistance: 150 },
        
        // Enemies on higher platforms
        { x: 325, y: 318, speed: 50, patrolDistance: 75 },
        { x: 625, y: 318, speed: 50, patrolDistance: 75 },
        { x: 925, y: 318, speed: 50, patrolDistance: 75 },
        { x: 1225, y: 318, speed: 50, patrolDistance: 75 },
        { x: 1525, y: 318, speed: 50, patrolDistance: 75 },
        { x: 1825, y: 318, speed: 50, patrolDistance: 75 }
      ],
      powerUps: [
        { x: 375, y: 300, type: 'jump' },
        { x: 975, y: 300, type: 'speed' },
        { x: 1575, y: 300, type: 'jump' }
      ],
      goal: { x: 2100, y: 460, width: 40, height: 150 }
    },
    
    // Level 6: Staggered platforms
    6: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        { x: 150, y: 450, width: 150, height: 30 },
        { x: 350, y: 400, width: 150, height: 30 },
        { x: 550, y: 350, width: 150, height: 30 },
        { x: 750, y: 300, width: 150, height: 30 },
        { x: 950, y: 250, width: 150, height: 30 },
        { x: 1150, y: 300, width: 150, height: 30 },
        { x: 1350, y: 350, width: 150, height: 30 },
        { x: 1550, y: 400, width: 150, height: 30 },
        { x: 1750, y: 450, width: 150, height: 30 },
        { x: 1950, y: 400, width: 150, height: 30 },
        { x: 2150, y: 350, width: 150, height: 30 }
      ],
      coins: [
        { x: 175, y: 400 },
        { x: 375, y: 350 },
        { x: 575, y: 300 },
        { x: 775, y: 250 },
        { x: 975, y: 200 },
        { x: 1175, y: 250 },
        { x: 1375, y: 300 },
        { x: 1575, y: 350 },
        { x: 1775, y: 400 },
        { x: 1975, y: 350 },
        { x: 2175, y: 300 }
      ],
      enemies: [
        { x: 200, y: 418, speed: 50, patrolDistance: 100 },
        { x: 600, y: 318, speed: 60, patrolDistance: 100 },
        { x: 1000, y: 218, speed: 70, patrolDistance: 100 },
        { x: 1400, y: 318, speed: 60, patrolDistance: 100 },
        { x: 1800, y: 418, speed: 50, patrolDistance: 100 },
        { x: 2000, y: 368, speed: 60, patrolDistance: 100 }
      ],
      powerUps: [
        { x: 775, y: 200, type: 'jump' },
        { x: 1575, y: 300, type: 'speed' },
        { x: 2175, y: 250, type: 'jump' }
      ],
      goal: { x: 2300, y: 360, width: 60, height: 200 }
    },
    
    // Level 7: Maze-like level
    7: {
      playerStart: { x: 50, y: 500 },
      platforms: [
        // Bottom row
        { x: 150, y: 500, width: 300, height: 30 },
        { x: 600, y: 500, width: 300, height: 30 },
        { x: 1050, y: 500, width: 300, height: 30 },
        { x: 1500, y: 500, width: 300, height: 30 },
        { x: 1950, y: 500, width: 300, height: 30 },
        
        // Middle row
        { x: 300, y: 350, width: 300, height: 30 },
        { x: 750, y: 350, width: 300, height: 30 },
        { x: 1200, y: 350, width: 300, height: 30 },
        { x: 1650, y: 350, width: 300, height: 30 },
        
        // Top row
        { x: 150, y: 200, width: 300, height: 30 },
        { x: 600, y: 200, width: 300, height: 30 },
        { x: 1050, y: 200, width: 300, height: 30 },
        { x: 1500, y: 200, width: 300, height: 30 },
        { x: 1950, y: 200, width: 300, height: 30 },
        
        // Vertical connectors
        { x: 250, y: 380, width: 30, height: 120 },
        { x: 850, y: 230, width: 30, height: 120 },
        { x: 1200, y: 380, width: 30, height: 120 },
        { x: 1700, y: 230, width: 30, height: 120 }
      ],
      coins: [
        { x: 200, y: 450 },
        { x: 300, y: 450 },
        { x: 700, y: 450 },
        { x: 800, y: 450 },
        { x: 1150, y: 450 },
        { x: 1250, y: 450 },
        { x: 1600, y: 450 },
        { x: 1700, y: 450 },
        { x: 2050, y: 450 },
        
        { x: 350, y: 300 },
        { x: 450, y: 300 },
        { x: 800, y: 300 },
        { x: 900, y: 300 },
        { x: 1250, y: 300 },
        { x: 1350, y: 300 },
        { x: 1700, y: 300 },
        { x: 1800, y: 300 },
        
        { x: 200, y: 150 },
        { x: 300, y: 150 },
        { x: 700, y: 150 },
        { x: 800, y: 150 },
        { x: 1150, y: 150 },
        { x: 1250, y: 150 },
        { x: 1600, y: 150 },
        { x: 1700, y: 150 },
        { x: 2050, y: 150 }
      ],
      enemies: [
        { x: 250, y: 468, speed: 80, patrolDistance: 200 },
        { x: 700, y: 468, speed: 80, patrolDistance: 200 },
        { x: 1150, y: 468, speed: 80, patrolDistance: 200 },
        { x: 1600, y: 468, speed: 80, patrolDistance: 200 },
        
        { x: 350, y: 318, speed: 70, patrolDistance: 200 },
        { x: 800, y: 318, speed: 70, patrolDistance: 200 },
        { x: 1250, y: 318, speed: 70, patrolDistance: 200 },
        { x: 1700, y: 318, speed: 70, patrolDistance: 200 },
        
        { x: 250, y: 168, speed: 60, patrolDistance: 200 },
        { x: 700, y: 168, speed: 60, patrolDistance: 200 },
        { x: 1150, y: 168, speed: 60, patrolDistance: 200 },
        { x: 1600, y: 168, speed: 60, patrolDistance: 200 }
      ],
      powerUps: [
        { x: 400, y: 300, type: 'jump' },
        { x: 900, y: 150, type: 'speed' },
        { x: 1500, y: 300, type: 'jump' },
        { x: 2000, y: 150, type: 'speed' }
      ],
      goal: { x: 2100, y: 210, width: 40, height: 150 }
    },
    
    // Level 8: Timing challenges
    8: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        { x: 150, y: 450, width: 150, height: 30 },
        { x: 400, y: 450, width: 100, height: 30 },
        { x: 600, y: 450, width: 100, height: 30 },
        { x: 800, y: 450, width: 100, height: 30 },
        { x: 1000, y: 450, width: 100, height: 30 },
        { x: 1200, y: 450, width: 100, height: 30 },
        { x: 1400, y: 450, width: 100, height: 30 },
        { x: 1600, y: 450, width: 100, height: 30 },
        { x: 1800, y: 450, width: 100, height: 30 },
        { x: 2000, y: 450, width: 200, height: 30 }
      ],
      coins: [
        { x: 400, y: 400 },
        { x: 600, y: 400 },
        { x: 800, y: 400 },
        { x: 1000, y: 400 },
        { x: 1200, y: 400 },
        { x: 1400, y: 400 },
        { x: 1600, y: 400 },
        { x: 1800, y: 400 },
        { x: 2000, y: 400 },
        { x: 2100, y: 400 }
      ],
      enemies: [
        { x: 450, y: 418, speed: 50, patrolDistance: 50 },
        { x: 650, y: 418, speed: 60, patrolDistance: 50 },
        { x: 850, y: 418, speed: 70, patrolDistance: 50 },
        { x: 1050, y: 418, speed: 80, patrolDistance: 50 },
        { x: 1250, y: 418, speed: 90, patrolDistance: 50 },
        { x: 1450, y: 418, speed: 100, patrolDistance: 50 },
        { x: 1650, y: 418, speed: 110, patrolDistance: 50 },
        { x: 1850, y: 418, speed: 120, patrolDistance: 50 },
        { x: 2050, y: 418, speed: 130, patrolDistance: 150 }
      ],
      powerUps: [
        { x: 500, y: 400, type: 'speed' },
        { x: 1100, y: 400, type: 'jump' },
        { x: 1700, y: 400, type: 'speed' }
      ],
      goal: { x: 2150, y: 460, width: 40, height: 150 }
    },
    
    // Level 9: Speed run
    9: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        { x: 0, y: 450, width: 2500, height: 30 },
        
        // Obstacles on the ground
        { x: 300, y: 400, width: 30, height: 50 },
        { x: 500, y: 400, width: 30, height: 50 },
        { x: 700, y: 400, width: 30, height: 50 },
        { x: 900, y: 400, width: 30, height: 50 },
        { x: 1100, y: 400, width: 30, height: 50 },
        { x: 1300, y: 400, width: 30, height: 50 },
        { x: 1500, y: 400, width: 30, height: 50 },
        { x: 1700, y: 400, width: 30, height: 50 },
        { x: 1900, y: 400, width: 30, height: 50 },
        { x: 2100, y: 400, width: 30, height: 50 }
      ],
      coins: [
        { x: 200, y: 400 },
        { x: 400, y: 400 },
        { x: 600, y: 400 },
        { x: 800, y: 400 },
        { x: 1000, y: 400 },
        { x: 1200, y: 400 },
        { x: 1400, y: 400 },
        { x: 1600, y: 400 },
        { x: 1800, y: 400 },
        { x: 2000, y: 400 }
      ],
      enemies: [
        { x: 350, y: 418, speed: 100, patrolDistance: 100 },
        { x: 550, y: 418, speed: 100, patrolDistance: 100 },
        { x: 750, y: 418, speed: 100, patrolDistance: 100 },
        { x: 950, y: 418, speed: 100, patrolDistance: 100 },
        { x: 1150, y: 418, speed: 100, patrolDistance: 100 },
        { x: 1350, y: 418, speed: 100, patrolDistance: 100 },
        { x: 1550, y: 418, speed: 100, patrolDistance: 100 },
        { x: 1750, y: 418, speed: 100, patrolDistance: 100 },
        { x: 1950, y: 418, speed: 100, patrolDistance: 100 },
        { x: 2150, y: 418, speed: 100, patrolDistance: 100 }
      ],
      powerUps: [
        { x: 150, y: 350, type: 'speed' },
        { x: 450, y: 350, type: 'jump' },
        { x: 1050, y: 350, type: 'speed' },
        { x: 1650, y: 350, type: 'jump' }
      ],
      goal: { x: 2300, y: 460, width: 40, height: 150 }
    },
    
    // Level 11: Boss Battle Arena
    11: {
      playerStart: { x: 50, y: 500 },
      platforms: [
        // Main arena floor
        { x: 0, y: 530, width: 2500, height: 30 },
        
        // Battle platforms
        { x: 300, y: 400, width: 200, height: 30 },
        { x: 700, y: 400, width: 200, height: 30 },
        { x: 1100, y: 400, width: 200, height: 30 },
        { x: 1500, y: 400, width: 200, height: 30 },
        { x: 1900, y: 400, width: 200, height: 30 }
      ],
      coins: [
        { x: 400, y: 350 },
        { x: 800, y: 350 },
        { x: 1200, y: 350 },
        { x: 1600, y: 350 },
        { x: 2000, y: 350 }
      ],
      enemies: [
        // Boss enemy with larger size and slower but wider patrol
        { x: 1200, y: 460, speed: 40, patrolDistance: 800, width: 64, height: 64 }
      ],
      powerUps: [
        { x: 300, y: 350, type: 'speed' },
        { x: 2000, y: 350, type: 'jump' }
      ],
      goal: { x: 2300, y: 460, width: 40, height: 150 }
    },
    
    // Level 10: Super challenge
    10: {
      playerStart: { x: 50, y: 500 },
      platforms: [
        // Bottom area
        { x: 100, y: 530, width: 200, height: 30 },
        { x: 400, y: 530, width: 200, height: 30 },
        
        // First ascent
        { x: 650, y: 480, width: 150, height: 30 },
        { x: 850, y: 430, width: 150, height: 30 },
        { x: 650, y: 380, width: 150, height: 30 },
        { x: 850, y: 330, width: 150, height: 30 },
        
        // Middle section
        { x: 1050, y: 330, width: 300, height: 30 },
        
        // Second ascent
        { x: 1400, y: 380, width: 150, height: 30 },
        { x: 1600, y: 430, width: 150, height: 30 },
        { x: 1400, y: 480, width: 150, height: 30 },
        
        // Final platforms
        { x: 1800, y: 480, width: 150, height: 30 },
        { x: 2000, y: 430, width: 150, height: 30 },
        { x: 2200, y: 380, width: 150, height: 30 }
      ],
      coins: [
        { x: 150, y: 480 },
        { x: 200, y: 480 },
        { x: 450, y: 480 },
        { x: 500, y: 480 },
        
        { x: 700, y: 430 },
        { x: 900, y: 380 },
        { x: 700, y: 330 },
        { x: 900, y: 280 },
        
        { x: 1100, y: 280 },
        { x: 1200, y: 280 },
        { x: 1300, y: 280 },
        
        { x: 1450, y: 330 },
        { x: 1650, y: 380 },
        { x: 1450, y: 430 },
        
        { x: 1850, y: 430 },
        { x: 2050, y: 380 },
        { x: 2250, y: 330 }
      ],
      enemies: [
        { x: 150, y: 498, speed: 80, patrolDistance: 150 },
        { x: 450, y: 498, speed: 80, patrolDistance: 150 },
        
        { x: 700, y: 448, speed: 70, patrolDistance: 100 },
        { x: 900, y: 398, speed: 70, patrolDistance: 100 },
        { x: 700, y: 348, speed: 70, patrolDistance: 100 },
        { x: 900, y: 298, speed: 70, patrolDistance: 100 },
        
        { x: 1150, y: 298, speed: 150, patrolDistance: 200 },
        
        { x: 1450, y: 348, speed: 70, patrolDistance: 100 },
        { x: 1650, y: 398, speed: 70, patrolDistance: 100 },
        { x: 1450, y: 448, speed: 70, patrolDistance: 100 },
        
        { x: 1850, y: 448, speed: 80, patrolDistance: 100 },
        { x: 2050, y: 398, speed: 90, patrolDistance: 100 },
        { x: 2250, y: 348, speed: 100, patrolDistance: 100 }
      ],
      powerUps: [
        { x: 500, y: 430, type: 'jump' },
        { x: 900, y: 230, type: 'speed' },
        { x: 1200, y: 230, type: 'jump' },
        { x: 1650, y: 330, type: 'speed' },
        { x: 2250, y: 280, type: 'jump' }
      ],
      goal: { x: 2300, y: 390, width: 40, height: 150 }
    },
    
    // Level 11: Bonus level - Coin collector
    11: {
      playerStart: { x: 50, y: 400 },
      platforms: [
        // Main ground
        { x: 0, y: 450, width: 2500, height: 30 },
        
        // Floating platforms
        { x: 200, y: 350, width: 100, height: 30 },
        { x: 400, y: 300, width: 100, height: 30 },
        { x: 600, y: 250, width: 100, height: 30 },
        { x: 800, y: 200, width: 100, height: 30 },
        { x: 1000, y: 150, width: 500, height: 30 },
        { x: 1600, y: 200, width: 100, height: 30 },
        { x: 1800, y: 250, width: 100, height: 30 },
        { x: 2000, y: 300, width: 100, height: 30 },
        { x: 2200, y: 350, width: 100, height: 30 }
      ],
      coins: [
        // Path along the ground
        { x: 100, y: 400 },
        { x: 150, y: 400 },
        { x: 300, y: 400 },
        { x: 350, y: 400 },
        { x: 500, y: 400 },
        { x: 550, y: 400 },
        { x: 700, y: 400 },
        { x: 750, y: 400 },
        { x: 900, y: 400 },
        { x: 950, y: 400 },
        
        // Upward path
        { x: 250, y: 300 },
        { x: 450, y: 250 },
        { x: 650, y: 200 },
        { x: 850, y: 150 },
        
        // Top platform coins
        { x: 1050, y: 100 },
        { x: 1100, y: 100 },
        { x: 1150, y: 100 },
        { x: 1200, y: 100 },
        { x: 1250, y: 100 },
        { x: 1300, y: 100 },
        { x: 1350, y: 100 },
        { x: 1400, y: 100 },
        { x: 1450, y: 100 },
        
        // Downward path
        { x: 1650, y: 150 },
        { x: 1850, y: 200 },
        { x: 2050, y: 250 },
        { x: 2250, y: 300 }
      ],
      enemies: [
        { x: 500, y: 418, speed: 100, patrolDistance: 400 },
        { x: 1500, y: 418, speed: 100, patrolDistance: 400 },
        
        // Platform enemies
        { x: 225, y: 318, speed: 50, patrolDistance: 50 },
        { x: 425, y: 268, speed: 50, patrolDistance: 50 },
        { x: 625, y: 218, speed: 50, patrolDistance: 50 },
        { x: 825, y: 168, speed: 50, patrolDistance: 50 },
        
        // Top platform enemies
        { x: 1100, y: 118, speed: 80, patrolDistance: 300 },
        { x: 1400, y: 118, speed: 80, patrolDistance: 300 },
        
        // Platform enemies (downward)
        { x: 1625, y: 168, speed: 50, patrolDistance: 50 },
        { x: 1825, y: 218, speed: 50, patrolDistance: 50 },
        { x: 2025, y: 268, speed: 50, patrolDistance: 50 },
        { x: 2225, y: 318, speed: 50, patrolDistance: 50 }
      ],
      powerUps: [
        { x: 400, y: 400, type: 'jump' },
        { x: 1250, y: 400, type: 'speed' },
        { x: 1250, y: 100, type: 'jump' },
        { x: 2000, y: 400, type: 'speed' }
      ],
      goal: { x: 2300, y: 460, width: 40, height: 150 }
    }
  };
  
  getLevel(levelNumber: number): LevelData {
    // Default to level 1 if requested level doesn't exist
    return this.levels[levelNumber] || this.levels[1];
  }
  
  getLevelCount(): number {
    return Object.keys(this.levels).length;
  }
}
