import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertHighScoreSchema, 
  insertPlayerProfileSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for high scores
  app.get("/api/highscores", async (req, res) => {
    try {
      const highScores = await storage.getHighScores();
      res.json(highScores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch high scores" });
    }
  });

  app.post("/api/highscores", async (req, res) => {
    try {
      const highScore = insertHighScoreSchema.parse(req.body);
      const newHighScore = await storage.addHighScore(highScore);
      res.status(201).json(newHighScore);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to add high score" });
      }
    }
  });

  // API routes for player profiles
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const profile = await storage.getPlayerProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch player profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const profile = insertPlayerProfileSchema.parse(req.body);
      const newProfile = await storage.createPlayerProfile(profile);
      res.status(201).json(newProfile);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to create player profile" });
      }
    }
  });

  app.put("/api/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const profile = insertPlayerProfileSchema.parse(req.body);
      const updatedProfile = await storage.updatePlayerProfile(userId, profile);
      
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(updatedProfile);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to update player profile" });
      }
    }
  });

  // Authentication routes for users
  app.post("/api/users/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser({ username, password });
      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
