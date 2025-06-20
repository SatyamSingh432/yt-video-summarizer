import type { Request, Response } from "express";
import Summary from "../models/summary.model.js";
import User from "../models/user.model.js";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const getUserSummaries = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const summaries = await Summary.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summaries" });
  }
};

const getAllUsersData = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "email role createdAt");
    const summaryCounts = await Summary.aggregate([
      { $group: { _id: "$user", count: { $sum: 1 } } },
    ]);

    const usageMap = summaryCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const userData = users.map((user) => ({
      ...user.toObject(),
      usageCount: usageMap[user._id.toString()] || 0,
    }));

    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getUserSummaries, getAllUsersData };
