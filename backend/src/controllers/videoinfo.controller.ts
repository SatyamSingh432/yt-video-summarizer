import axios from "axios";
import type { Request, Response } from "express";
import OpenAI from "openai";

import Summary from "../models/summary.model.js";
import User from "../models/user.model.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export const getVideoInfo = async (req: Request, res: Response) => {
  const { videoId } = req.body;
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet,contentDetails",
          id: videoId,
          key: apiKey,
        },
      }
    );

    const video = response.data.items[0];

    if (!video) res.status(404).json({ error: "Video not found" });

    const { title, thumbnails, description, tags } = video.snippet;

    const duration = video.contentDetails.duration;

    res.json({
      title,
      thumbnail: thumbnails.medium.url,
      duration,
      description,
      tags,
    });
  } catch (err) {
    console.log("Error fetching video info:", err);
    res.status(500).json({ error: "Failed to fetch video info" });
  }
};

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const getVideoSummary = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { transcript, videoTitle } = req.body;
  const userId = req.userId;

  if (!transcript || !videoTitle || !userId) {
    res.status(400).json({ error: "Missing fields" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL_NAME!,
      messages: [
        {
          role: "system",
          content: `Summarize the following video transcript. ${transcript}`,
        },
        { role: "user", content: transcript },
      ],
    });

    const summaryText = completion.choices[0].message.content;

    const summary = new Summary({
      user: userId,
      title: videoTitle,
      text: summaryText,
    });
    await summary.save();

    await User.findByIdAndUpdate(userId, { $push: { summaries: summary._id } });

    res.json({ summary: summaryText });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
