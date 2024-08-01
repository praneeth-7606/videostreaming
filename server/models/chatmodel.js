import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
