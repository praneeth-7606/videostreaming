import express from 'express';
const router = express.Router();
import { getChats, createChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/:roomId').get(protect, getChats);
router.route('/').post(protect, createChat);

export default router;
