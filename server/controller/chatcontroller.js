import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';

// @desc    Fetch all chats in a room
// @route   GET /api/chats/:roomId
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ roomId: req.params.roomId }).populate('userId', 'name');
  res.json(chats);
});

// @desc    Create a chat message
// @route   POST /api/chats
// @access  Private
const createChat = asyncHandler(async (req, res) => {
  const { roomId, message } = req.body;

  const chat = new Chat({
    roomId,
    userId: req.user._id,
    message,
  });

  const createdChat = await chat.save();
  res.status(201).json(createdChat);
});

export { getChats, createChat };
