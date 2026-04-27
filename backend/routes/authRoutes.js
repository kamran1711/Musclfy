import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/authController.js';
import { updateLikedSongs, updatePlaylists, getUserData } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/data', protect, getUserData);
router.put('/liked-songs', protect, updateLikedSongs);
router.put('/playlists', protect, updatePlaylists);

export default router;
