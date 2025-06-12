type VideoMetadataProps = {
  title: string | undefined;
  thumbnail: string | undefined;
  duration: string | undefined;
  getVideoSummary: () => void;
  loading: boolean;
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
  getVideoSummary,
  loading,
}: VideoMetadataProps) {
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
        disabled={loading}
        onClick={() => {
          console.log("Summarizing video:", title);
          getVideoSummary();
        }}
      >
        Summarize
      </button>
    </div>
  );
}
