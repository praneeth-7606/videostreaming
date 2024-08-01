import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';
import { useAuth } from './context/auth';
import Layout from './layout/layout';

function ViewStreams() {
  const [streams, setStreams] = useState([]);
  const {auth,setAuth,userId}=useAuth()

  useEffect(() => {
    const fetchStreams = async () => {
      const response = await axios.get('http://localhost:3002/api/route/videos/live');
      setStreams(response.data);
    };

    fetchStreams();
  }, []);

  return (
    <Layout>
      <h2>Live Streams</h2>
      <ul>
        {streams.map((stream) => (
          <li key={stream._id}>
            <Link to={`/viewstream/${stream._id}`}>{stream.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default ViewStreams;
