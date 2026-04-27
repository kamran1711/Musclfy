import User from '../models/User.js';

// @desc    Update user liked songs
// @route   PUT /api/auth/liked-songs
// @access  Private
export const updateLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.likedSongs = req.body.likedSongs;
      await user.save();
      res.json({ message: 'Liked songs updated', likedSongs: user.likedSongs });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user playlists
// @route   PUT /api/auth/playlists
// @access  Private
export const updatePlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.playlists = req.body.playlists;
      await user.save();
      res.json({ message: 'Playlists updated', playlists: user.playlists });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user data (liked songs and playlists)
// @route   GET /api/auth/data
// @access  Private
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        likedSongs: user.likedSongs || [],
        playlists: user.playlists || []
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
