import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  isLive: {
    type: Boolean,
    default: true,
  },
  currentStreamPosition: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);
export default Video;

