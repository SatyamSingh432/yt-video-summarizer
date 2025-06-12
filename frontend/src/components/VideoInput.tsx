import React, { useState } from "react";

type VideoInputProps = {
  getVideoMetaData: (
    e: React.FormEvent<HTMLFormElement>,
    url: string
  ) => Promise<void>;
};

export default function VideoInput({ getVideoMetaData }: VideoInputProps) {
  const [url, setUrl] = useState("");

  return (
    <div className="max-w-xl mx-auto p-6">
      <form
        onSubmit={(e) => {
          getVideoMetaData(e, url);
          setUrl("");
        }}
        className="space-y-4"
      >
        <label
          htmlFor="youtube-url"
          className="block text-sm font-medium text-gray-700"
        >
          Input YouTube URL
        </label>
        <input
          id="youtube-url"
          type="text"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Data
        </button>
      </form>
    </div>
  );
}
