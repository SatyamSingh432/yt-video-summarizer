function isValidYouTubeUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const videoIdFromWatch = parsedUrl.searchParams.get("v");

    if (hostname.includes("youtube.com") && videoIdFromWatch?.length === 11) {
      return videoIdFromWatch;
    }

    if (hostname.includes("youtu.be")) {
      const id = parsedUrl.pathname.slice(1);
      if (id.length === 11) {
        return id;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export { isValidYouTubeUrl };
