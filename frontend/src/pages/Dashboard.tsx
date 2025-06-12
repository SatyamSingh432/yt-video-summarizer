import React, { useState } from "react";

import VideoInput from "../components/VideoInput";
import VideoMetadata from "../components/VideoMetadata";

export type VideoMetadata = {
  title: string;
  thumbnail: string;
  duration: string;
};

export default function Dashboard() {
  const [metaData, setMetaData] = useState<VideoMetadata | null>(null);

  return (
    <div>
      <VideoInput setMetaData={setMetaData} />
      {metaData && (
        <VideoMetadata
          thumbnail={metaData?.thumbnail}
          title={metaData?.title}
          duration={metaData?.duration}
        />
      )}
    </div>
  );
}
