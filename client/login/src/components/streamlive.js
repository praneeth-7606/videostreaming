import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from 'axios';
import io from 'socket.io-client';
import { useAuth } from './context/auth';
import Layout from './layout/layout';

// Initialize WebSocket connection
const socket = io('http://localhost:3002'); // Adjust the URL according to your backend server

function Stream() {
  const { id } = useParams();
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/route/videos/live/${id}`);
        setStream(response.data);
      } catch (error) {
        console.error('Error fetching stream:', error);
      }
    };

    fetchStream();
  }, [id]);

  useEffect(() => {
    if (stream) {
      const player = videojs('video-player', {
        autoplay: true,
        controls: true,
        sources: [{
          src: `${stream.videoUrl}`,
          type: 'application/x-mpegURL'
        }]
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [stream]);

  useEffect(() => {
    // Listen for stream updates
    socket.on('streamUpdate', (data) => {
      if (data.streamId === id) {
        setIsStreaming(data.isStreaming);
      }
    });

    return () => {
      socket.off('streamUpdate');
    };
  }, [id]);

  const handleStartStream = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/api/route/videos/start/${id}`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log('Start stream response:', response.data);
      setIsStreaming(true);

      // Emit event to server
      socket.emit('startStream', { streamId: id, userId: auth.user._id });
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const handleDeleteStream = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/route/videos/delete/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      window.location.href = '/streams';

      // Emit event to server
      socket.emit('stopStream', { streamId: id, userId: auth.user._id });
    } catch (error) {
      console.error('Error deleting stream:', error);
    }
  };

  return (
    <Layout>
      {stream && (
        <>
          <h2>{stream.title}</h2>
          <video
            id="video-player"
            className="video-js vjs-default-skin"
            controls
            preload="auto"
            width="640"
            height="360"
          >
            <source src={`http://localhost:3002/uploads/${stream.videoUrl}`} type="application/x-mpegURL" />
          </video>
          {auth?.user && auth.user.role === 1 && (
            <>
              <button onClick={handleStartStream} disabled={isStreaming}>
                Start Stream
              </button>
              <button onClick={handleDeleteStream}>Delete Stream</button>
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default Stream;
