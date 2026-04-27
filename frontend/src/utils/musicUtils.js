// Utility functions for the music player

export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === null) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getTruncatedArtist = (artist) => {
  if (!artist) return '';
  const artists = artist.split(',').map(a => a.trim());
  return artists.slice(0, 2).join(', ');
};