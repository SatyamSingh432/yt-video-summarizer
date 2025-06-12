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
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-4">
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-full rounded-md" />
      )}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {duration && (
        <p className="text-sm text-gray-600">
          Duration: {formatDuration(duration)}
        </p>
      )}
      <button
        disabled={loading}
        onClick={getVideoSummary}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
    </div>
  );
}
