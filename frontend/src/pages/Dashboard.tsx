import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { checkYouTubeVideoExists } from "../utils/checkYouTubeVideoExists.ts";
import { isValidYouTubeUrl } from "../utils/isValidYouTubeUrl.ts";

import VideoInput from "../components/VideoInput";
import VideoMetadata from "../components/VideoMetadata";
import { api } from "../lib/api";

export type VideoMetadata = {
  title: string;
  thumbnail: string;
  duration: string;
};

export default function Dashboard() {
  const [metaData, setMetaData] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const { token } = useAuth();

  const getVideoMetaData = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string
  ) => {
    e.preventDefault();
    setLoading(true);
    const videoId = isValidYouTubeUrl(url);

    if (videoId !== null) {
      const videoExist = await checkYouTubeVideoExists(url);

      if (videoExist && videoId) {
        const { data } = await api.post(
          "/video/videoinfo",
          { videoId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMetaData(data);
      }
    } else {
      console.error("Invalid url, video didn't exist");
    }
    setLoading(false);
  };

  const getVideoSummary = async () => {
    setLoading(true);
    const { data } = await api.post(
      "video/summarize",
      {
        transcript: metaData?.title,
        videoTitle: metaData?.title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div>
      <VideoInput loading={loading} getVideoMetaData={getVideoMetaData} />
      {metaData && (
        <VideoMetadata
          getVideoSummary={getVideoSummary}
          thumbnail={metaData?.thumbnail}
          title={metaData?.title}
          duration={metaData?.duration}
          loading={loading}
        />
      )}

      {summary}
    </div>
  );
}
