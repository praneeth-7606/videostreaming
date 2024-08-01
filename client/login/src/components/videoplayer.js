// // import React, { useEffect, useRef, useState } from 'react';
// // import Hls from 'hls.js';

// // const VideoPlayer = ({ videoUrl }) => {
// //   const videoRef = useRef(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (videoUrl && videoRef.current) {
// //       const video = videoRef.current;
// //       let hls;

// //       // Ensure the path is correct and formatted properly
// //       if (Hls.isSupported()) {
// //         hls = new Hls();
// //         hls.loadSource(videoUrl);
// //         hls.attachMedia(video);
// //         hls.on(Hls.Events.MANIFEST_PARSED, () => {
// //           if (isPlaying) {
// //             video.play().catch((error) => {
// //               console.error('Play error:', error);
// //             });
// //           }
// //         });
// //         hls.on(Hls.Events.ERROR, (event, data) => {
// //           console.error('HLS.js error:', data);
// //           if (data.fatal) {
// //             setError(`HLS.js error: ${data.details}`);
// //           }
// //         });
// //       } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
// //         video.src = videoUrl;
// //         if (isPlaying) {
// //           video.play().catch((error) => {
// //             console.error('Play error:', error);
// //           });
// //         }
// //       }

// //       return () => {
// //         if (hls) {
// //           hls.destroy();
// //         }
// //       };
// //     }
// //   }, [isPlaying, videoUrl]);

// //   const handlePlay = () => {
// //     setIsPlaying(true);
// //     videoRef.current.play().catch((error) => {
// //       console.error('Play error:', error);
// //     });
// //   };

// //   return (
// //     <div>
// //       <video ref={videoRef} controls width="600" height="400"></video>
// //       {!isPlaying && (
// //         <button onClick={handlePlay}>Play Video</button>
// //       )}
// //       {error && <div className="error">{error}</div>}
// //     </div>
// //   );
// // };

// // export default VideoPlayer;
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isPlaying) {
            video.play().catch((error) => {
              console.error('Play error:', error);
            });
          }
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js error:', data);
          if (data.fatal) {
            setError(`HLS.js error: ${data.details}`);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        if (isPlaying) {
          video.play().catch((error) => {
            console.error('Play error:', error);
          });
        }
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [isPlaying, videoUrl]);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current.play().catch((error) => {
      console.error('Play error:', error);
    });
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) { // Firefox
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div style={{ textAlign:"center"}}>
      <video ref={videoRef} controls width="70%" height="auto" className="mb-2"></video>
      {!isPlaying && (
        <Button onClick={handlePlay}>Play Video</Button>
      )}
      <br></br>
      <Button onClick={handleFullScreen} className="mt-2">Full Screen</Button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default VideoPlayer;



// import React, { useEffect, useRef, useState } from 'react';
// import Hls from 'hls.js';
// import axios from 'axios'; // for making HTTP requests

// const VideoPlayer = ({ videoUrl, streamId }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [error, setError] = useState(null);
//   const [playbackPosition, setPlaybackPosition] = useState(0);

//   useEffect(() => {
//     const fetchPlaybackPosition = async () => {
//       try {
//         const response = await axios.get(`/api/get-playback-position/${streamId}`);
//         setPlaybackPosition(response.data.position || 0);
//       } catch (error) {
//         console.error('Error fetching playback position:', error);
//       }
//     };

//     fetchPlaybackPosition();
//   }, [streamId]);

//   useEffect(() => {
//     if (videoUrl && videoRef.current) {
//       const video = videoRef.current;
//       let hls;

//       if (Hls.isSupported()) {
//         hls = new Hls();
//         hls.loadSource(videoUrl);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           video.currentTime = playbackPosition;
//           if (isPlaying) {
//             video.play().catch((error) => {
//               console.error('Play error:', error);
//             });
//           }
//         });
//         hls.on(Hls.Events.ERROR, (event, data) => {
//           console.error('HLS.js error:', data);
//           if (data.fatal) {
//             setError(`HLS.js error: ${data.details}`);
//           }
//         });
//       } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//         video.src = videoUrl;
//         video.currentTime = playbackPosition;
//         if (isPlaying) {
//           video.play().catch((error) => {
//             console.error('Play error:', error);
//           });
//         }
//       }

//       return () => {
//         if (hls) {
//           hls.destroy();
//         }
//       };
//     }
//   }, [isPlaying, videoUrl, playbackPosition]);

//   useEffect(() => {
//     const savePlaybackPosition = () => {
//       if (videoRef.current) {
//         const position = videoRef.current.currentTime;
//         axios.post('/api/save-playback-position', { streamId, position })
//           .catch((error) => {
//             console.error('Error saving playback position:', error);
//           });
//       }
//     };

//     const interval = setInterval(savePlaybackPosition, 5000); // Save position every 5 seconds
//     return () => clearInterval(interval);
//   }, [streamId]);

//   const handlePlay = () => {
//     setIsPlaying(true);
//     videoRef.current.play().catch((error) => {
//       console.error('Play error:', error);
//     });
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     videoRef.current.pause();
//   };

//   return (
//     <div>
//       <video ref={videoRef} controls={false} autoPlay={true} muted={true} />
//       <div>
//         <button onClick={handlePlay}>Play</button>
//         <button onClick={handlePause}>Pause</button>
//       </div>
//       {error && <div>{error}</div>}
//     </div>
//   );
// };

// export default VideoPlayer;
