import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

type VideoMetadataProps = {
  title: string | undefined;
  thumbnail: string | undefined;
  duration: string | undefined;
};

function formatDuration(isoDuration: string): string {
  const match = isoDuration?.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const minutes = parseInt(match[1] || "0", 10);
  const seconds = parseInt(match[2] || "0", 10);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function VideoMetadata({
  title,
  thumbnail,
  duration,
}: VideoMetadataProps) {
  const { token } = useAuth();
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "320px",
      }}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3 style={{ margin: "0.5rem 0" }}>{title}</h3>
      {duration && <p>Duration: {formatDuration(duration)}</p>}

      <button
        onClick={() => {
          api.post(
            "video/summarize",
            {
              transcript: title,
              videoTitle: title,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }}
      >
        Summarize
      </button>
    </div>
  );
}
