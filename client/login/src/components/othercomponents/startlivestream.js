import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import LiveStream from './LiveStream';
import LiveStream from './livestream';

const StartLiveStream = () => {
  const { id } = useParams();
  const [streamStarted, setStreamStarted] = useState(false);

  const startStream = async () => {
    try {
      await axios.post(`http://localhost:3002/api/route/videos/start-live/${id}`);
      setStreamStarted(true);
    } catch (error) {
      console.error('Error starting live stream:', error);
    }
  };

  useEffect(() => {
    startStream();
  }, [id]);

  return (
    <div>
      <h2>Start Live Stream</h2>
      {streamStarted ? (
        <LiveStream videoId={id} />
      ) : (
        <p>Starting stream...</p>
      )}
    </div>
  );
};

export default StartLiveStream;
