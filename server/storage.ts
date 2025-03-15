import { 
  users, 
  type User, 
  type InsertUser, 
  highScores, 
  type HighScore, 
  type InsertHighScore,
  playerProfiles,
  type PlayerProfile,
  type InsertPlayerProfile
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // High score methods
  getHighScores(): Promise<HighScore[]>;
  getHighScoresByUser(userId: number): Promise<HighScore[]>;
  addHighScore(highScore: InsertHighScore): Promise<HighScore>;
  
  // Player profile methods
  getPlayerProfile(userId: number): Promise<PlayerProfile | undefined>;
  createPlayerProfile(profile: InsertPlayerProfile): Promise<PlayerProfile>;
  updatePlayerProfile(userId: number, profile: InsertPlayerProfile): Promise<PlayerProfile | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private highScores: Map<number, HighScore>;
  private profiles: Map<number, PlayerProfile>;
  currentId: number;
  highScoreId: number;
  profileId: number;

  constructor() {
    this.users = new Map();
    this.highScores = new Map();
    this.profiles = new Map();
    this.currentId = 1;
    this.highScoreId = 1;
    this.profileId = 1;
    
    // Add some demo users and high scores
    this.initializeDemoData();
  }
  
  private initializeDemoData(): void {
    // Create some demo users
    this.createUser({ username: "player1", password: "password123" });
    this.createUser({ username: "player2", password: "password123" });
    this.createUser({ username: "player3", password: "password123" });
    
    // Add some high scores
    this.addHighScore({
      userId: 1,
      score: 1250,
      coins: 8,
      level: 1,
      completionTime: 120,
      date: new Date().toISOString()
    });
    
    this.addHighScore({
      userId: 2,
      score: 980,
      coins: 6,
      level: 1,
      completionTime: 145,
      date: new Date().toISOString()
    });
    
    this.addHighScore({
      userId: 3,
      score: 1500,
      coins: 10,
      level: 2,
      completionTime: 180,
      date: new Date().toISOString()
    });
    
    // Add some player profiles
    this.createPlayerProfile({
      userId: 1,
      maxLevel: 2,
      totalCoins: 15,
      totalScore: 1250,
      livesUpgrade: 1,
      speedUpgrade: 0,
      jumpUpgrade: 1
    });
    
    this.createPlayerProfile({
      userId: 2,
      maxLevel: 1,
      totalCoins: 6,
      totalScore: 980,
      livesUpgrade: 0,
      speedUpgrade: 1,
      jumpUpgrade: 0
    });
    
    this.createPlayerProfile({
      userId: 3,
      maxLevel: 3,
      totalCoins: 25,
      totalScore: 2200,
      livesUpgrade: 2,
      speedUpgrade: 1,
      jumpUpgrade: 1
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getHighScores(): Promise<HighScore[]> {
    // Return all high scores sorted by score in descending order
    return Array.from(this.highScores.values())
      .sort((a, b) => b.score - a.score);
  }
  
  async getHighScoresByUser(userId: number): Promise<HighScore[]> {
    // Return all high scores for a specific user
    return Array.from(this.highScores.values())
      .filter(score => score.userId === userId)
      .sort((a, b) => b.score - a.score);
  }
  
  async addHighScore(highScore: InsertHighScore): Promise<HighScore> {
    const id = this.highScoreId++;
    const newHighScore: HighScore = { ...highScore, id };
    this.highScores.set(id, newHighScore);
    return newHighScore;
  }
  
  async getPlayerProfile(userId: number): Promise<PlayerProfile | undefined> {
    return Array.from(this.profiles.values()).find(
      (profile) => profile.userId === userId
    );
  }
  
  async createPlayerProfile(profile: InsertPlayerProfile): Promise<PlayerProfile> {
    const id = this.profileId++;
    const newProfile: PlayerProfile = { ...profile, id };
    this.profiles.set(id, newProfile);
    return newProfile;
  }
  
  async updatePlayerProfile(userId: number, updatedProfile: InsertPlayerProfile): Promise<PlayerProfile | undefined> {
    // Find the profile for this user
    const existingProfile = await this.getPlayerProfile(userId);
    
    if (!existingProfile) {
      return undefined;
    }
    
    // Update the profile with new values
    const updated: PlayerProfile = { 
      ...existingProfile, 
      ...updatedProfile,
      userId // Ensure userId remains the same
    };
    
    this.profiles.set(existingProfile.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
