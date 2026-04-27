import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import songRoutes from './routes/songRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aura-player';
app.locals.isDbConnected = false;

console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.locals.isDbConnected = true;
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  
  // Specific check for SSL/Whitelisting errors (Atlas often throws Alert 80 for IP mismatch)
  if (err.message.includes('tlsv1 alert internal error') || err.message.includes('80')) {
    console.error('\n🛑 CONNECTION REJECTED BY ATLAS');
    console.error('👉 This is usually because your current IP is not whitelisted.');
    console.error('👉 Go to MongoDB Atlas > Security > Network Access and add your current IP.');
  }

  app.locals.isDbConnected = false;
  console.warn('⚠️  App will run in "Demo Mode" without database persistence.');
});

// Routes
app.use('/api/songs', songRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', dbConnected: app.locals.isDbConnected });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});