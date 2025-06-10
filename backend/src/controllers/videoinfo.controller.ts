import axios from "axios";
export const getVideoInfo = async (req: any, res: any) => {
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
    if (!video) return res.status(404).json({ error: "Video not found" });

    const { title, thumbnails } = video.snippet;
    const duration = video.contentDetails.duration;

    res.json({
      title,
      thumbnail: thumbnails.medium.url,
      duration,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video info" });
  }
};
