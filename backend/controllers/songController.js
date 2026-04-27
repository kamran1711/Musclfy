import Song from '../models/Song.js';

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ uploadedAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const { title, artist, album, itunesId } = req.body;

    const song = new Song({
      title,
      artist,
      album,
      itunesId,
      audioUrl: `/uploads/${req.file.filename}`,
      source: 'upload'
    });

    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};