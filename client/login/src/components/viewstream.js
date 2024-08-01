// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Hls from 'hls.js';

// function ViewStream() {
//   const { id } = useParams();
//   const videoRef = useRef(null);
//   const videoUrl = 'http://localhost:3002/live/1722021578937-nlp_case_study';

//   useEffect(() => {
//     if (videoUrl && videoRef.current) {
//       const video = videoRef.current;
//       const hls = new Hls();

//       // Use Hls.js to load the live stream
//       const hlsUrl = `${videoUrl}`;
//       hls.loadSource(hlsUrl);
//       hls.attachMedia(video);
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         video.play();
//       });

//       // Handle errors
//       hls.on(Hls.Events.ERROR, (event, data) => {
//         if (data.fatal) {
//           console.error('HLS.js error:', data);
//         }
//       });

//       return () => {
//         hls.destroy();
//       };
//     }
//   }, [videoUrl]);

//   return (
//     <div>
//       <h2>Stream Title</h2>
//       <video ref={videoRef} controls width="600" height="400"></video>
//     </div>
//   );
// }

// export default ViewStream;
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from './layout/layout';

const socket = io('http://localhost:3002');

function ViewStream() {
  const { id } = useParams(); // Assuming `id` is the stream ID
  const videoRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchStreamPosition = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/route/videos/position/${id}`);
        setCurrentPosition(response.data.currentStreamPosition);
      } catch (error) {
        console.error('Error fetching stream position:', error);
      }
    };

    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/route/videos/live/${id}`);
        const { videoUrl } = response.data; // Get the videoUrl from the response
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchStreamPosition();
    fetchVideoDetails();

    socket.on('position-update', (data) => {
      if (data.videoId === id) {
        setCurrentPosition(data.position);
      }
    });

    return () => {
      socket.off('position-update');
    };
  }, [id]);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const video = videoRef.current;
      const hls = new Hls();

      console.log(`Loading video from URL: ${videoUrl}`); // Log the URL for debugging

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = currentPosition;
        video.play().catch((error) => console.error('Play error:', error));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error:', data);
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            console.error('Network error loading the video.');
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            console.error('Media error processing the video.');
          } else if (data.type === Hls.ErrorTypes.OTHER_ERROR) {
            console.error('Other error occurred.');
          }
        }
      });

      return () => {
        hls.destroy();
      };
    }
  }, [currentPosition, videoUrl]);

  return (
    <Layout>
      <h2>Stream Title</h2>
      <video ref={videoRef} controls width="600" height="400"></video>
    </Layout>
  );
}

export default ViewStream;
