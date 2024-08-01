// LiveStream.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const LiveStream = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [controls, setControls] = useState({ pause: false });
  const [socket, setSocket] = useState(null);
  const [videoError, setVideoError] = useState('');

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io('http://localhost:3002');
    setSocket(socketInstance);

    // Join the room corresponding to the video ID
    socketInstance.emit('join-room', id);

    // Listen for control updates from the server
    socketInstance.on('control-update', (control) => {
      if (videoRef.current) {
        if (control === 'pause') {
          videoRef.current.pause();
        } else if (control === 'resume') {
          videoRef.current.play().catch((error) => {
            console.error('Error resuming video:', error);
          });
        }
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
        setVideoError('Error playing video. Please try again.');
      });
      setStreaming(true);
      socket.emit('control-update', 'play');
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      socket.emit('control-update', 'pause');
      setControls({ ...controls, pause: true });
    }
  };

  const handleResume = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error resuming video:', error);
        setVideoError('Error resuming video. Please try again.');
      });
      socket.emit('control-update', 'resume');
      setControls({ ...controls, pause: false });
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      socket.emit('control-update', 'stop');
      setControls({ pause: false });
      setStreaming(false);
    }
  };

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} style={{ width: '100%' }} onError={() => setVideoError('Failed to load video')}>
        <source src={`http://localhost:3002/uploads/${id}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {videoError && <p>{videoError}</p>}
      <div>
        {!streaming && <button onClick={handlePlay}>Start Stream</button>}
        {streaming && !controls.pause && <button onClick={handlePause}>Pause Stream</button>}
        {controls.pause && <button onClick={handleResume}>Resume Stream</button>}
        <button onClick={handleStop}>Stop Stream</button>
      </div>
    </div>
  );
};

export default LiveStream;
