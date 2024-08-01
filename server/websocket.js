import WebSocket, { WebSocketServer } from 'ws';
// import { WebSocketServer } from 'ws';

let currentTime = 0;  // Initialize currentTime
let interval;

// Function to broadcast current time to all clients
const broadcastCurrentTime = () => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'time-update', currentTime }));
      }
    });
  }
};

// Function to start the video stream
const startStream = () => {
  interval = setInterval(() => {
    currentTime += 1; // Increment time every second
    broadcastCurrentTime();
  }, 1000);
};

// Function to set up the WebSocket server
// export const setupWebSocketServer = (server) => {
//     const wss = new WebSocketServer({ server });
  
//     wss.on('connection', (socket) => {
//       console.log('New client connected');
  
//       // Broadcast updates to all clients
//       socket.on('update-position', (data) => {
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: 'position-update', ...data }));
//           }
//         });
//       });
      
//       socket.on('startStream', (data) => {
//         console.log('Stream started:', data);
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: 'stream-update', ...data }));
//           }
//         });
//       });
  
//       socket.on('close', () => {
//         console.log('Client disconnected');
//       });
//     });
//   };

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });
  
    wss.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('message', (message) => {
        console.log('Received message:', message);
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
  
      socket.on('close', (code, reason) => {
        console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
      });
  
      socket.on('error', (error) => {
        console.error('WebSocket error:', error.message);
      });
    });
  };