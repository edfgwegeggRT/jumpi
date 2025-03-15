import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const highScores = pgTable("high_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  score: integer("score").notNull(),
  coins: integer("coins").notNull(),
  level: integer("level").notNull(),
  completionTime: integer("completion_time").notNull(),
  date: text("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHighScoreSchema = createInsertSchema(highScores).pick({
  userId: true,
  score: true,
  coins: true,
  level: true,
  completionTime: true,
  date: true,
});

// Player profile schema for storing game progress
export const playerProfiles = pgTable("player_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  maxLevel: integer("max_level").notNull().default(1),
  totalCoins: integer("total_coins").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  livesUpgrade: integer("lives_upgrade").notNull().default(0),
  speedUpgrade: integer("speed_upgrade").notNull().default(0),
  jumpUpgrade: integer("jump_upgrade").notNull().default(0),
});

export const insertPlayerProfileSchema = createInsertSchema(playerProfiles).pick({
  userId: true,
  maxLevel: true,
  totalCoins: true,
  totalScore: true,
  livesUpgrade: true,
  speedUpgrade: true,
  jumpUpgrade: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type HighScore = typeof highScores.$inferSelect;
export type InsertHighScore = z.infer<typeof insertHighScoreSchema>;
export type PlayerProfile = typeof playerProfiles.$inferSelect;
export type InsertPlayerProfile = z.infer<typeof insertPlayerProfileSchema>;
