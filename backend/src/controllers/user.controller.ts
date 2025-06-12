import type { Request, Response } from "express";
import Summary from "../models/summary.model.ts";

const getUserSummaries = async (req: Request, res: Response) => {
  console.log("Fetching user summaries for user ID:", req.userId);
  try {
    const summaries = await Summary.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summaries" });
  }
};

export { getUserSummaries };
