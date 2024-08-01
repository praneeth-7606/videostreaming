// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const LiveStreamList = () => {
//   const [liveStreams, setLiveStreams] = useState([]);

//   useEffect(() => {
//     const fetchLiveStreams = async () => {
//       const { data } = await axios.get(' http://localhost:3002/api/route/videos/live');
//       setLiveStreams(data);
//     };

//     fetchLiveStreams();
//   }, []);

//   return (
//     <div>
//       <h2>Live Streams</h2>
//       <ul>
//         {liveStreams.map((stream) => (
//           <li key={stream._id}>
//             <Link to={`/live`}>{stream.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LiveStreamList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LiveStreamList = () => {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/route/videos/live');
        setLiveStreams(response.data);
      } catch (error) {
        console.error('Error fetching live streams:', error);
      }
    };

    fetchLiveStreams();
  }, []);

  return (
    <div>
      <h2>Live Streams</h2>
      <ul>
        {liveStreams.map(stream => (
          <li key={stream._id}>
            <Link to={`/live/${stream._id}`}>{stream.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveStreamList;
