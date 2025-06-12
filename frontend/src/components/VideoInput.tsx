import React, { useState } from "react";

type VideoInputProps = {
  getVideoMetaData: (
    e: React.FormEvent<HTMLFormElement>,
    url: string
  ) => Promise<void>;
  loading: boolean;
};

export default function VideoInput({
  getVideoMetaData,
  loading,
}: VideoInputProps) {
  const [url, setUrl] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          getVideoMetaData(e, url);
          setUrl("");
        }}
      >
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
