import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user!.password);
    if (!valid) {
      res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user!._id, role: user!.role },
      process.env.JWT_SECRET!
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const userData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
