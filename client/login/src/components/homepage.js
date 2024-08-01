// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from "./context/auth";
// import Layout from './layout/layout';
// import VideoPlayer from './videoplayer';
// import axios from 'axios';
// import WebSocket from 'ws';

// function Home() {
//   const { auth } = useAuth();
//   const [streams, setStreams] = useState([]);

//   useEffect(() => {
//     const fetchStreams = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3002/api/route/videos/live');
//         setStreams(data);
//       } catch (error) {
//         console.error('Error fetching live streams:', error);
//       }
//     };

//     fetchStreams();
//   }, []);

//   return (
//     <Layout>
//       <h1>Live Streaming App</h1>
//       {auth?.user && auth.user.role === 1 && (
//         <>
//           <div>
//             <Link to="/create">Create Stream</Link>
//           </div>
//           <div>
//             <Link to="/streams">Manage Streams</Link>
//           </div>
//         </>
//       )}
//       {auth?.user && auth.user.role !== 1 && (
//         <div>
//           <Link to="/viewstreams">View Streams</Link>
//         </div>
//       )}
//       {streams.length > 0 && streams.map(stream => (
//         <div key={stream._id}>
//           <h2>{stream.title}</h2>
//           <VideoPlayer videoUrl={`${stream.videoUrl}`} />
//         </div>
//       ))}
//     </Layout>
//   );
// }

// export default Home;

// src/components/Home.js
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3002'); // Adjust the URL if necessary

// const Home = () => {
//   const [liveStreams, setLiveStreams] = useState([]);

//   useEffect(() => {
//     socket.on('streamStarted', (data) => {
//       // Fetch the updated list of live streams
//       fetchLiveStreams();
//     });

//     socket.on('streamStopped', (data) => {
//       // Fetch the updated list of live streams
//       fetchLiveStreams();
//     });

//     // Clean up on unmount
//     return () => {
//       socket.off('streamStarted');
//       socket.off('streamStopped');
//     };
//   }, []);

//   const fetchLiveStreams = async () => {
//     const response = await fetch('http://localhost:3002/api/route/videos/live');
//     const streams = await response.json();
//     setLiveStreams(streams);
//   };

//   useEffect(() => {
//     fetchLiveStreams();
//   }, []);

//   return (
//     <div>
//       <h1>Live Streams</h1>
//       <ul>
//         {liveStreams.map(stream => (
//           <li key={stream._id}>
//             <a href={`/view-stream/${stream._id}`}>{stream.title}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from './context/auth';
// import Layout from './layout/layout';
// import VideoPlayer from './videoplayer';
// import axios from 'axios';
// import io from 'socket.io-client';

// function Home() {
//   const { auth } = useAuth();
//   const [streams, setStreams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const socket = io('http://localhost:3002');

//   useEffect(() => {
//     const fetchStreams = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3002/api/route/videos/live');
//         setStreams(data);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching live streams');
//         setLoading(false);
//       }
//     };

//     fetchStreams();

//     socket.on('startStream', (data) => {
//       setStreams(prevStreams => [...prevStreams, data]);
//     });

//     socket.on('stopStream', ({ videoId }) => {
//       setStreams(prevStreams => prevStreams.filter(stream => stream._id !== videoId));
//     });

//     // Clean up on unmount
//     return () => {
//       socket.off('startStream');
//       socket.off('stopStream');
//     };
//   }, []);

//   return (
//     <Layout>
//       <h1>Live Streaming App</h1>
//       {auth?.user && auth.user.role === 1 && (
//         <>
//           <div>
//             <Link to="/create">Create Stream</Link>
//           </div>
//           <div>
//             <Link to="/streams">Manage Streams</Link>
//           </div>
//         </>
//       )}
//       {auth?.user && auth.user.role !== 1 && (
//         <div>
//           <Link to="/viewstreams">View Streams</Link>
//         </div>
//       )}
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         streams.length > 0 ? (
//           streams.map(stream => (
//             <div key={stream._id}>
//               <h2>{stream.title}</h2>
//               <VideoPlayer videoUrl={`${stream.videoUrl}`} />
//             </div>
//           ))
//         ) : (
//           <p>No live streams available</p>
//         )
//       )}
//     </Layout>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/auth';
import Layout from './layout/layout';
import VideoPlayer from './videoplayer';
import axios from 'axios';
import io from 'socket.io-client';
import { Container, Row, Col, Button, Alert, Modal, Spinner } from 'react-bootstrap';

const socket = io('http://localhost:3002');

function Home() {
  const { auth } = useAuth();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const { data } = await axios.get('http://localhost:3002/api/route/videos/live');
        setStreams(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching live streams');
        setLoading(false);
      }
    };

    fetchStreams();

    socket.on('startStream', (data) => {
      setStreams(prevStreams => [...prevStreams, data]);
    });

    socket.on('stopStream', ({ videoId }) => {
      setStreams(prevStreams => prevStreams.filter(stream => stream._id !== videoId));
    });

    // Clean up on unmount
    return () => {
      socket.off('startStream');
      socket.off('stopStream');
    };
  }, []);

  const handleShow = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVideoUrl('');
  };

  return (
    <Layout>
      <Container>
        <h1 className="my-4">Live Streaming App</h1>

        {auth?.user && auth.user.role === 1 && (
          <Row className="mb-3">
            <Col>
              <Link to="/create">
                <Button variant="primary">Create Stream</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/streams">
                <Button variant="secondary">Manage Streams</Button>
              </Link>
            </Col>
          </Row>
        )}

        {auth?.user && auth.user.role !== 1 && (
          <Row className="mb-3">
            <Col>
              <Link to="/viewstreams">
                <Button variant="info">View Streams</Button>
              </Link>
            </Col>
          </Row>
        )}

        {loading ? (
          <Row className="justify-content-center">
            <Col className="text-center">
              <Spinner animation="border" />
              <p>Loading...</p>
            </Col>
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col className="text-center">
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        ) : (
          streams.length > 0 ? (
            <Row>
              {streams.map(stream => (
                <Col key={stream._id} md={4} className="mb-4">
                  <Button 
                    variant="light" 
                    className="w-100 text-start p-3 d-flex align-items-center"
                    onClick={() => handleShow(stream.videoUrl)}
                    style={{ backgroundImage: `url(${stream.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="overlay d-flex align-items-center justify-content-center">
                      <span>{stream.title}</span>
                    </div>
                  </Button>
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col className="text-center">
                <p>No live streams available</p>
              </Col>
            </Row>
          )
        )}
      </Container>

      {/* Modal for Video Playback */}
      <Modal show={showModal} onHide={handleClose} size="lg" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Video Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VideoPlayer videoUrl={selectedVideoUrl} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default Home;
