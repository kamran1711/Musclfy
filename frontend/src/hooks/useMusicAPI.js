import { useState, useRef } from "react";

export const useMusicAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef({});

  const fetchItunesSongs = async (query) => {
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();

      return (data.results || [])
        .filter(track => track.previewUrl)
        .map(track => ({
          id: `itunes-${track.trackId}`,
          title: track.trackName,
          artist: track.artistName,
          audioUrl: track.previewUrl,
          image: track.artworkUrl100?.replace("100x100bb", "500x500bb"),
          source: "iTunes"
        }));
    } catch {
      return [];
    }
  };

  const fetchAllSongs = async (query) => {
    if (cache.current[query]) {
      console.log("Cache hit");
      return cache.current[query];
    }

    setIsLoading(true);

    try {
      const itunes = await fetchItunesSongs(query);
      cache.current[query] = itunes;
      return itunes;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchAllSongs, fetchItunesSongs };
};