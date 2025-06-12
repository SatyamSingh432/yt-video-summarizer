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

export { checkYouTubeVideoExists };
