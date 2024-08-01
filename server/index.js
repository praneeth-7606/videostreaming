// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import database from "./config/db.js";
// import authroutes from "./routes/authroutes.js";
// import videoroutes from "./routes/videoroutes.js";
// import cors from "cors";
// import path from "path";
// import NodeMediaServer from 'node-media-server';

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin :'*',
//   },
// });

// app.use(cors());
// app.use(express.json());

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// app.use("/api/route/auth", authroutes);
// app.use("/api/route/videos", videoroutes);
// app.get("/", (req, res) => {
//   res.send("<h1>Hi, hello, good morning darling</h1>");
// });

// database();

// // Node Media Server setup for HLS streaming
// const config = {
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 30,
//     ping_timeout: 60,
//   },
//   http: {
//     port: 8000,  // Ensure this port is correct
//     allow_origin: '*',
//     mediaroot: path.join(path.resolve(), 'uploads')
//   },
//   trans: {
//     ffmpeg: 'C:/ffmpeg/bin/ffmpeg.exe',
//     tasks: [
//       {
//         app: 'live',
//         vc: "copy",
//         ac: "copy",
//         hls: true,
//         hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments+append_list]',
//       },
//     ],
//   },
// };
// const nms = new NodeMediaServer(config);
// nms.run();

// io.on("connection", (socket) => {
//   console.log("New client connected", socket.id);

//   socket.on("join-room", (roomId, userId) => {
//     socket.join(roomId);
//     socket.to(roomId).broadcast.emit("user-connected", userId);

//     socket.on("disconnect", () => {
//       socket.to(roomId).broadcast.emit("user-disconnected", userId);
//     });
//   });
// });

// app.use((req, res, next) => {
//   console.log(`Requested URL: ${req.url}`);
//   next();
// });

// const port = 3002;
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });









// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authroutes from './routes/authroutes.js';
// import videoroutes from './routes/videoroutes.js';
// import cors from 'cors';
// import path from 'path';


// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// app.use(cors());
// app.use(express.json());

// // Database Connection
// connectDB();

// // Define routes
// app.use('/api/route/auth', authroutes);
// app.use('/api/route/videos', videoroutes);

// // Serve static files
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // Socket.io connections
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('startStream', (data) => {
//     console.log('Stream started:', data);
//     socket.broadcast.emit('streamStarted', data);
//   });

//   socket.on('stopStream', () => {
//     console.log('Stream stopped');
//     socket.broadcast.emit('streamStopped');
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// const PORT = process.env.PORT || 3002;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authroutes from './routes/authroutes.js';
import videoroutes from './routes/videoroutes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Define routes
app.use('/api/route/auth', authroutes);
app.use('/api/route/videos', videoroutes);

// Serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Socket.io connections
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('startStream', (data) => {
    console.log('Stream started:', data);
    socket.broadcast.emit('streamStarted', data);
  });

  socket.on('stopStream', () => {
    console.log('Stream stopped');
    socket.broadcast.emit('streamStopped');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
