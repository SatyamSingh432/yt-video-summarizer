import React, { useState } from "react";
import { api } from "../lib/api";

import type { VideoMetadata } from "../pages/Dashboard";

export default function VideoInput({
  setMetaData,
}: {
  setMetaData: React.Dispatch<React.SetStateAction<VideoMetadata | null>>;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkYouTubeVideoExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(
          url
        )}&format=json`
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  function isValidYouTubeUrl(url: string): string | null {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const videoIdFromWatch = parsedUrl.searchParams.get("v");

      if (hostname.includes("youtube.com") && videoIdFromWatch?.length === 11) {
        return videoIdFromWatch;
      }

      if (hostname.includes("youtu.be")) {
        const id = parsedUrl.pathname.slice(1);
        if (id.length === 11) {
          return id;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  const handleGetData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const videoId = isValidYouTubeUrl(url);

    if (videoId !== null) {
      const videoExist = await checkYouTubeVideoExists(url);

      if (videoExist && videoId) {
        const { data } = await api.post("/video/videoinfo", { videoId });
        setMetaData(data);
        setUrl("");
      }
    } else {
      console.error("Invalid url, video didn't exist");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleGetData}>
        <label htmlFor="youtube-url">Input Youtube URL</label>
        <input
          id="youtube-url"
          type="text"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Get Data</button>
      </form>

      {loading && <div>Loading.....</div>}
    </div>
  );
}
