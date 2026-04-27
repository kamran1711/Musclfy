import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  duration: { type: Number },
  audioUrl: { type: String, required: true },
  image: { type: String },
  itunesId: { type: String },
  source: { type: String, default: 'upload' },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Song', songSchema);