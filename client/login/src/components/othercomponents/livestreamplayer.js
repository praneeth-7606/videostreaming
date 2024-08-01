import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const LiveStreamPlayer = () => {
  const { id } = useParams();
  const [stream, setStream] = useState(null);
  const videoRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    const fetchStream = async () => {
      const { data } = await axios.get(`/api/videos/live/${id}`);
      setStream(data);
    };

    fetchStream();

    socketRef.current = io();
    socketRef.current.emit('join-room', id);

    return () => socketRef.current.disconnect();
  }, [id]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <h2>{stream?.title}</h2>
      <video ref={videoRef} controls autoPlay></video>
    </div>
  );
};

export default LiveStreamPlayer;
