import { useState } from "react";
const Youtube = () => {
  const [url, setUrl] = useState("");
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
  function isValidYouTubeUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const videoIdFromWatch = parsedUrl.searchParams.get("v");

      if (hostname.includes("youtube.com") && videoIdFromWatch) {
        return videoIdFromWatch.length === 11;
      }

      if (hostname.includes("youtu.be")) {
        console.log(parsedUrl.pathname);
        const id = parsedUrl.pathname.slice(1);
        console.log(id);
        return id.length === 11;
      }
      return false;
    } catch {
      return false;
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidYouTubeUrl(url) === true) {
      const videoExist = await checkYouTubeVideoExists(url);
      console.log(videoExist);
    } else {
      console.error("Invalid url, video didn't exist");
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="">input</label>
        <input
          type="text"
          placeholder="enter url"
          value={url}
          onChange={changeHandler}
        />
        <button type="submit">button</button>
      </form>
    </div>
  );
};

export default Youtube;
