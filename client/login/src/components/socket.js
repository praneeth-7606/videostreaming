// src/socket.js
import { io } from 'socket.io-client';

// Replace with your server URL
const socket = io('http://localhost:3002');

export default socket;
