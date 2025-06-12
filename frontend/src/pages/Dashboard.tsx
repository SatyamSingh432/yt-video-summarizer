import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { checkYouTubeVideoExists } from "../utils/checkYouTubeVideoExists";
import { isValidYouTubeUrl } from "../utils/isValidYouTubeUrl";
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
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <VideoInput getVideoMetaData={getVideoMetaData} />
      {metaData && (
        <div className="mt-6">
          <VideoMetadata
            getVideoSummary={getVideoSummary}
            thumbnail={metaData?.thumbnail}
            title={metaData?.title}
            duration={metaData?.duration}
            loading={loading}
          />
        </div>
      )}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {summary && (
        <div className="mt-8 bg-white rounded-xl shadow p-4 text-gray-800 whitespace-pre-line">
          <h4 className="text-lg font-semibold mb-2">Summary</h4>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
