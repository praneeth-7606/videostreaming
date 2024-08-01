// // import asyncHandler from 'express-async-handler';
// // import Video from '../models/videomodel.js';
// // import path from 'path';
// // import fs from 'fs';
// // import { fileURLToPath } from 'url';
// // import { exec } from 'child_process';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const convertToHLS = (inputPath, outputPath) => {
// //   return new Promise((resolve, reject) => {
// //     const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
// //     const command = `"${ffmpegPath}" -i "${inputPath}" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_flags delete_segments+append_list -hls_segment_filename "${outputPath}/segment_%03d.ts" "${outputPath}/playlist.m3u8"`;

// //     console.log(`Executing command: ${command}`);

// //     exec(command, (error, stdout, stderr) => {
// //       if (error) {
// //         console.error('Error executing command:', stderr);
// //         reject(new Error(`FFmpeg error: ${stderr}`));
// //       } else {
// //         console.log('FFmpeg output:', stdout);
// //         resolve(stdout);
// //       }
// //     });
// //   });
// // };


// // export const uploadVideo = asyncHandler(async (req, res) => {
// //   const { title, description } = req.body;
// //   const file = req.file;

// //   if (!file) {
// //     res.status(400);
// //     throw new Error('No file uploaded');
// //   }

// //   const mp4Path = path.resolve(__dirname, '../uploads', file.filename);
// //   const hlsPath = path.resolve(__dirname, '../uploads', file.filename.replace('.mp4', '.m3u8'));

// //   try {
// //     await convertToHLS(mp4Path, hlsPath);

// //     const video = new Video({
// //       title,
// //       description,
// //       videoUrl: file.filename.replace('.mp4', '.m3u8'),
// //       isLive: true,
// //     });

// //     const createdVideo = await video.save();
// //     res.status(201).json(createdVideo);
// //   } catch (error) {
// //     res.status(500);
// //     throw new Error('Error converting video to HLS');
// //   }
// // });

// // export const startRecordedStream = asyncHandler(async (req, res) => {
// //   const { title, description, videoUrl } = req.body;

// //   const video = new Video({
// //     title,
// //     description,
// //     videoUrl,
// //     isLive: true,
// //     user: req.user._id,
// //   });

// //   await video.save();
// //   res.status(201).json({
// //     success: true,
// //     message: 'Live stream started successfully.',
// //     video: video,
// //   });
// // });

// // export const startLiveStream = async (req, res) => {
// //   try {
// //     const { title, description, videoUrl } = req.body;

// //     if (!title || !videoUrl) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Title and video URL are required.",
// //       });
// //     }

// //     const newVideo = new Video({
// //       title,
// //       description,
// //       videoUrl,
// //       // user: req.user._id,
// //     });

// //     await newVideo.save();

// //     res.status(201).json({
// //       success: true,
// //       message: "Live stream started successfully.",
// //       video: newVideo,
// //       isLive: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Error starting live stream.",
// //       error: error.message,
// //     });
// //   }
// // };

// // export const getLiveVideoById = asyncHandler(async (req, res) => {
// //   try {
// //     const video = await Video.findById(req.params.id);

// //     if (!video) {
// //       return res.status(404).json({ message: 'Stream not found' });
// //     }

// //     if (video.isLive) {
// //       res.json(video);
// //     } else {
// //       res.status(404).json({ message: 'Stream not live' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // export const getLiveVideolist = asyncHandler(async (req, res) => {
// //   const video = await Video.find({isLive:true});

// //   if (video.length > 0) {
// //     res.json(video);
// //   } else {
// //     res.status(404);
// //     throw new Error('Live video not found');
// //   }
// // });

// // export const stopLiveStream = asyncHandler(async (req, res) => {
// //   const video = await Video.findById(req.params.id);

// //   if (video && video.isLive) {
// //     video.isLive = false;
// //     await video.save();
    
// //     if (video.videoUrl) {
// //       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
// //       fs.unlink(videoPath, (err) => {
// //         if (err) {
// //           console.error('Error deleting file:', err);
// //         }
// //       });
// //     }
    
// //     res.status(200).json({ message: 'Stream stopped and video deleted' });
// //   } else {
// //     res.status(404);
// //     throw new Error('Live video not found');
// //   }
// // });

// // export const deleteVideo = asyncHandler(async (req, res) => {
// //   const video = await Video.findById(req.params.id);

// //   if (video) {
// //     if (video.videoUrl) {
// //       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
// //       fs.unlink(videoPath, (err) => {
// //         if (err) {
// //           console.error('Error deleting file:', err);
// //         }
// //       });
// //     }

// //     await Video.deleteOne({ _id: req.params.id });
// //     res.status(200).json({ message: 'Video deleted' });
// //   } else {
// //     res.status(404);
// //     throw new Error('Video not found');
// //   }
// // });

// import asyncHandler from 'express-async-handler';
// import Video from '../models/videomodel.js';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { exec } from 'child_process';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const convertToHLS = (inputPath, outputPath) => {
//   return new Promise((resolve, reject) => {
//     const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
//     const command = `"${ffmpegPath}" -i "${inputPath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -hls_segment_filename "${outputPath}/segment_%03d.ts" "${outputPath}/playlist.m3u8"`;

//     console.log(`Executing command: ${command}`);

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error('Error executing command:', stderr);
//         reject(new Error(`FFmpeg error: ${stderr}`));
//       } else {
//         console.log('FFmpeg output:', stdout);
//         resolve(stdout);
//       }
//     });
//   });
// };

// export const uploadVideo = asyncHandler(async (req, res) => {
//   const { title, description } = req.body;
//   const file = req.file;

//   if (!file) {
//     res.status(400);
//     throw new Error('No file uploaded');
//   }

//   const mp4Path = path.resolve(__dirname, '../uploads', file.filename);
//   const hlsDir = path.resolve(__dirname, '../uploads', file.filename.replace('.mp4', ''));

//   try {
//     // Create the output directory if it doesn't exist
//     if (!fs.existsSync(hlsDir)) {
//       fs.mkdirSync(hlsDir);
//     }

//     await convertToHLS(mp4Path, hlsDir);

//     const video = new Video({
//       title,
//       description,
//       videoUrl: path.join(file.filename.replace('.mp4', ''), 'playlist.m3u8'),
//       isLive: true,
//     });

//     const createdVideo = await video.save();
//     res.status(201).json(createdVideo);
//   } catch (error) {
//     res.status(500);
//     throw new Error('Error converting video to HLS');
//   }
// });

// // The rest of the functions remain unchanged
// export const startRecordedStream = asyncHandler(async (req, res) => {
//   const { title, description, videoUrl } = req.body;

//   const video = new Video({
//     title,
//     description,
//     videoUrl,
//     isLive: true,
//     user: req.user._id,
//   });

//   await video.save();
//   res.status(201).json({
//     success: true,
//     message: 'Live stream started successfully.',
//     video: video,
//   });
// });

// export const startLiveStream = async (req, res) => {
//   try {
//     const { title, description, videoUrl } = req.body;

//     if (!title || !videoUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and video URL are required.",
//       });
//     }

//     const newVideo = new Video({
//       title,
//       description,
//       videoUrl,
//       // user: req.user._id,
//     });

//     await newVideo.save();

//     res.status(201).json({
//       success: true,
//       message: "Live stream started successfully.",
//       video: newVideo,
//       isLive: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error starting live stream.",
//       error: error.message,
//     });
//   }
// };

// export const getLiveVideoById = asyncHandler(async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);

//     if (!video) {
//       return res.status(404).json({ message: 'Stream not found' });
//     }

//     if (video.isLive) {
//       res.json(video);
//     } else {
//       res.status(404).json({ message: 'Stream not live' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export const getLiveVideolist = asyncHandler(async (req, res) => {
//   const video = await Video.find({isLive:true});

//   if (video.length > 0) {
//     res.json(video);
//   } else {
//     res.status(404);
//     throw new Error('Live video not found');
//   }
// });

// export const stopLiveStream = asyncHandler(async (req, res) => {
//   const video = await Video.findById(req.params.id);

//   if (video && video.isLive) {
//     video.isLive = false;
//     await video.save();
    
//     if (video.videoUrl) {
//       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
//       fs.unlink(videoPath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         }
//       });
//     }
    
//     res.status(200).json({ message: 'Stream stopped and video deleted' });
//   } else {
//     res.status(404);
//     throw new Error('Live video not found');
//   }
// });

// export const deleteVideo = asyncHandler(async (req, res) => {
//   const video = await Video.findById(req.params.id);

//   if (video) {
//     if (video.videoUrl) {
//       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
//       fs.unlink(videoPath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         }
//       });
//     }

//     await Video.deleteOne({ _id: req.params.id });
//     res.status(200).json({ message: 'Video deleted' });
//   } else {
//     res.status(404);
//     throw new Error('Video not found');
//   }
// });

// import asyncHandler from 'express-async-handler';
// import Video from '../models/videomodel.js';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { exec } from 'child_process';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const convertToHLS = (inputPath, outputPath) => {
//   return new Promise((resolve, reject) => {
//     const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe'; // Update with your ffmpeg path
//     const command = `${ffmpegPath} -i ${inputPath} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -hls_segment_filename ${outputPath}/segment_%03d.ts ${outputPath}/playlist.m3u8`;

//     console.log(`Executing command: ${command}`);

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error('Error executing command:', stderr);
//         reject(new Error(`FFmpeg error: ${stderr}`));
//       } else {
//         console.log('FFmpeg output:', stdout);
//         resolve(stdout);
//       }
//     });
//   });
// };

// export const uploadVideo = asyncHandler(async (req, res) => {
//   const { title, description } = req.body;
//   const file = req.file;

//   if (!file) {
//     res.status(400);
//     throw new Error('No file uploaded');
//   }

//   const mp4Path = path.resolve(__dirname, '../uploads', file.filename);
//   const hlsDir = path.resolve(__dirname, '../uploads', file.filename.replace('.mp4', ''));

//   try {
//     if (!fs.existsSync(hlsDir)) {
//       fs.mkdirSync(hlsDir);
//     }

//     await convertToHLS(mp4Path, hlsDir);

//     const video = new Video({
//       title,
//       description,
//       videoUrl: path.join(file.filename.replace('.mp4', ''), 'playlist.m3u8'),
//       isLive: true,
//     });

//     const createdVideo = await video.save();
//     res.status(201).json(createdVideo);
//   } catch (error) {
//     res.status(500);
//     throw new Error('Error converting video to HLS');
//   }
// });

// export const startRecordedStream = asyncHandler(async (req, res) => {
//   const { title, description, videoUrl } = req.body;

//   const video = new Video({
//     title,
//     description,
//     videoUrl,
//     isLive: true,
//     user: req.user._id,
//   });

//   await video.save();
//   res.status(201).json({
//     success: true,
//     message: 'Live stream started successfully.',
//     video: video,
//   });
// });

// export const startLiveStream = async (req, res) => {
//   try {
//     const { title, description, videoUrl } = req.body;

//     if (!title || !videoUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and video URL are required.",
//       });
//     }

//     const newVideo = new Video({
//       title,
//       description,
//       videoUrl,
//       isLive: true,
//     });

//     await newVideo.save();

//     res.status(201).json({
//       success: true,
//       message: "Live stream started successfully.",
//       video: newVideo,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error starting live stream.",
//       error: error.message,
//     });
//   }
// };

// export const getLiveVideoById = asyncHandler(async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);

//     if (!video) {
//       return res.status(404).json({ message: 'Stream not found' });
//     }

//     if (video.isLive) {
//       res.json(video);
//     } else {
//       res.status(404).json({ message: 'Stream not live' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export const getLiveVideolist = asyncHandler(async (req, res) => {
//   const video = await Video.find({ isLive: true });

//   if (video.length > 0) {
//     res.json(video);
//   } else {
//     res.status(404).json({ message: 'Live video not found' });
//   }
// });

// export const stopLiveStream = asyncHandler(async (req, res) => {
//   const video = await Video.findById(req.params.id);

//   if (video && video.isLive) {
//     video.isLive = false;
//     await video.save();

//     if (video.videoUrl) {
//       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
//       fs.unlink(videoPath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         }
//       });
//     }

//     res.status(200).json({ message: 'Stream stopped and video deleted' });
//   } else {
//     res.status(404).json({ message: 'Live video not found' });
//   }
// });

// export const deleteVideo = asyncHandler(async (req, res) => {
//   const video = await Video.findById(req.params.id);

//   if (video) {
//     if (video.videoUrl) {
//       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
//       fs.unlink(videoPath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         }
//       });
//     }

//     await Video.deleteOne({ _id: req.params.id });
//     res.status(200).json({ message: 'Video deleted' });
//   } else {
//     res.status(404).json({ message: 'Video not found' });
//   }
// });


import asyncHandler from 'express-async-handler';
import Video from '../models/videomodel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToHLS = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe'; // Update with your ffmpeg path
    const command = `"${ffmpegPath}" -i "${inputPath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -hls_segment_filename "${outputPath}/segment_%03d.ts" "${outputPath}/playlist.m3u8"`;

    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', stderr);
        reject(new Error(`FFmpeg error: ${stderr}`));
      } else {
        console.log('FFmpeg output:', stdout);
        resolve(stdout);
      }
    });
  });
};

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  console.log('Authenticated User ID:', req.user._id);

  const mp4Path = path.resolve(__dirname, '../uploads', file.filename);
  const hlsDir = path.resolve(__dirname, '../uploads', file.filename.replace('.mp4', ''));

  try {
    if (!fs.existsSync(hlsDir)) {
      fs.mkdirSync(hlsDir);
    }

    await convertToHLS(mp4Path, hlsDir);

    const video = new Video({
      title,
      description,
      videoUrl: `http://localhost:3002/uploads/${file.filename.replace('.mp4', '')}/playlist.m3u8`,
      isLive: true,
      userId: req.user._id
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    console.error('Error during video upload:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error converting video to HLS',
    });
  }
});

// export const startStream = async (req, res) => {
//   const videoId = req.params.id;
//   try {
//     await Video.findByIdAndUpdate(videoId, { currentStreamPosition: 0 });
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: 'Error starting stream' });
//   }
// };

// Get current position handler
export const getStreamPosition = async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findById(videoId);
    res.json({ currentStreamPosition: video.currentStreamPosition });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stream position' });
  }
};

// Update current position handler
export const updateStreamPosition = async (req, res) => {
  const videoId = req.params.id;
  const { position } = req.body;
  try {
    await Video.findByIdAndUpdate(videoId, { currentStreamPosition: position });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error updating stream position' });
  }
};












export const startRecordedStream = asyncHandler(async (req, res) => {
  const { title, description, videoUrl } = req.body;

  const video = new Video({
    title,
    description,
    videoUrl,
    isLive: true,
    user: req.user._id,
  });

  await video.save();
  res.status(201).json({
    success: true,
    message: 'Live stream started successfully.',
    video: video,
  });
});


export const startStream = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);

  if (video) {
    video.isLive = true;
    await video.save();

    // Emit startStream event
    req.io.emit('startStream', { videoId: video._id, videoUrl: video.videoUrl });

    res.json({ success: true, message: 'Stream started' });
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});

export const stopLiveStream = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video && video.isLive) {
    video.isLive = false;
    await video.save();

    // Emit stopStream event
    req.io.emit('stopStream', { videoId: video._id });

    res.status(200).json({ message: 'Stream stopped' });
  } else {
    res.status(404);
    throw new Error('Live video not found');
  }
});
export const getLiveVideoById = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    if (video.isLive) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Stream not live' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export const getLiveVideolist = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find({ isLive: true });

    if (videos.length > 0) {
      res.status(200).json(videos); // Send 200 status code with the videos
    } else {
      res.status(404).json({ message: 'Live video not found' }); // Send 404 with a message
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
});

// export const stopLiveStream = asyncHandler(async (req, res) => {
//   const video = await Video.findById(req.params.id);

//   if (video && video.isLive) {
//     video.isLive = false;
//     await video.save();

//     if (video.videoUrl) {
//       const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
//       fs.unlink(videoPath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         }
//       });
//     }

//     res.status(200).json({ message: 'Stream stopped and video deleted' });
//   } else {
//     res.status(404);
//     throw new Error('Live video not found');
//   }
// });

export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video) {
    if (video.videoUrl) {
      const videoPath = path.resolve(__dirname, '../uploads', video.videoUrl);
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    await Video.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Video deleted' });
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});
