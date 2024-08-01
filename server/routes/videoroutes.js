
import express from 'express';
import multer from 'multer';
import {
  // startLiveStream,
  startRecordedStream,
  getLiveVideoById,
  stopLiveStream,
  deleteVideo,
  getLiveVideolist,
  uploadVideo,startStream, 
  getStreamPosition, 
  updateStreamPosition
} from '../controller/videocontroller.js';
import { requireSignIn, isAdmin } from '../middleware/authmiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// router.post('/live', startLiveStream);
router.post('/recorded', requireSignIn, startRecordedStream);
router.get('/live/:id', getLiveVideoById);
router.get('/live', getLiveVideolist);
router.post('/stop/:id', requireSignIn, stopLiveStream);
router.delete('/delete/:id', requireSignIn, deleteVideo);
router.post('/upload', requireSignIn, upload.single('file'), uploadVideo);
router.post('/start/:id', startStream);

// Get current position of the stream
router.get('/position/:id', getStreamPosition);

// Update current position of the stream
router.post('/update-position/:id', updateStreamPosition)

export default router;