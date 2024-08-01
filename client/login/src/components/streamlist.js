// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function StreamList() {
//   const [streams, setStreams] = useState([]);

//   useEffect(() => {
//     const fetchStreams = async () => {
//       const response = await axios.get('http://localhost:3002/api/route/videos/live');
//       setStreams(response.data);
//     };

//     fetchStreams();
//   }, []);

//   return (
//     <div>
//       <h2>Live Streams</h2>
//       <ul>
//         {streams.map((stream) => (
//           <li key={stream._id}>
//             <Link to={`/stream/`}>{stream.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default StreamList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from './layout/layout';

function StreamList() {
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/route/videos/live');
        setStreams(response.data);
        setError(''); // Clear error if successful
      } catch (error) {
        console.error('Error fetching live streams:', error.response ? error.response.data : error.message);
        setStreams([]); // Clear streams if error occurs
        setError('No live streams available'); // Set error message
      }
    };

    fetchStreams();
  }, []);

  return (
    <Layout>
      <h2>Live Streams</h2>
      {error ? (
        <p>{error}</p> // Show error message if any
      ) : streams.length === 0 ? (
        <p>No live streams available</p> // Show message if no streams
      ) : (
        <ul>
          {streams.map((stream) => (
            <li key={stream._id}>
              <Link to={`/stream/${stream._id}`}>{stream.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export default StreamList;
