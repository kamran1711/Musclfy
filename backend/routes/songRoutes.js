import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllSongs, uploadSong, deleteSong } from '../controllers/songController.js';

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('File MIME type:', file.mimetype);
    console.log('File original name:', file.originalname);
    // Allow audio files and common audio extensions
    if (file.mimetype.startsWith('audio/') ||
        file.originalname.match(/\.(mp3|wav|flac|aac|ogg|m4a)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

// Routes
router.get('/', getAllSongs);
router.post('/upload', upload.single('audio'), uploadSong);
router.delete('/:id', deleteSong);

export default router;