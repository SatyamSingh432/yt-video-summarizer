import axios from "axios";

export const api = axios.create({
  baseURL: "https://yt-video-summarizer-f538.onrender.com/api",
});
