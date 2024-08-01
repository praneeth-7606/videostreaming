// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';

// // // const CreateStream = () => {
// // //   const [title, setTitle] = useState('');
// // //   const [description, setDescription] = useState('');
// // //   const [file, setFile] = useState(null);
// // //   const [status, setStatus] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate= useNavigate()

// // //   const handleCreateStream = async (e) => {
// // //     e.preventDefault();

// // //     if (!title || !description || !file) {
// // //       setStatus('Please fill in all fields and select a file.');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setStatus('');

// // //     const formData = new FormData();
// // //     formData.append('title', title);
// // //     formData.append('description', description);
// // //     formData.append('file', file);

// // //     try {
// // //       const response = await axios.post('http://localhost:3002/api/route/videos/upload', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //       });
// // //       console.log(response.data);
// // //       setStatus('Video uploaded successfully!');
// // //       setTitle('');
// // //       setDescription('');
// // //       setFile(null);
// // //       // Navigate()
// // //       navigate("/live/:id")
// // //     } catch (error) {
// // //       console.error('Error uploading video:', error);
// // //       setStatus('Failed to upload video. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Create a Live Stream</h2>
// // //       <form onSubmit={handleCreateStream}>
// // //         <div>
// // //           <label>Title</label>
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label>Description</label>
// // //           <textarea
// // //             value={description}
// // //             onChange={(e) => setDescription(e.target.value)}
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label>Video File</label>
// // //           <input
// // //             type="file"
// // //             onChange={(e) => setFile(e.target.files[0])}
// // //             required
// // //           />
// // //         </div>
// // //         <button type="submit" disabled={loading}>
// // //           {loading ? 'Uploading...' : 'Create Stream'}
// // //         </button>
// // //       </form>
// // //       {status && <p>{status}</p>}
// // //     </div>
// // //   );
// // // };

// // // export default CreateStream;
// // // CreateStream.js
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // // import { useHistory } from 'react-router-dom';
// // import { useNavigate } from 'react-router-dom';

// // function CreateStream() {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [file, setFile] = useState(null);
// //   const navigate = useNavigate();

// //   const handleCreateStream = async () => {
// //     const formData = new FormData();
// //     formData.append('title', title);
// //     formData.append('description', description);
// //     formData.append('file', file);

// //     const response = await axios.post('http://localhost:3002/api/route/videos/upload', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     });
// //     const streamId = response.data._id;
// //     navigate(`/stream/${streamId}`);
// //   };

// //   return (
// //     <div>
// //       <h2>Create Stream</h2>
// //       <input
// //         type="text"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         placeholder="Stream Title"
// //       />
// //       <input
// //         type="text"
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         placeholder="Stream Description"
// //       />
// //       <input
// //         type="file"
// //         onChange={(e) => setFile(e.target.files[0])}
// //       />
// //       <button onClick={handleCreateStream}>Create Stream</button>
// //     </div>
// //   );
// // }

// // export default CreateStream;
//  import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './context/auth';

// function CreateStream() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:3002/api/route/videos/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate(`/stream/${response.data._id}`);
//     } catch (error) {
//       console.error('Error uploading video', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create a Live Stream</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Video File:</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             required
//           />
//         </div>
//         <button type="submit">Start Stream</button>
//       </form>
//     </div>
//   );
// }

// export default CreateStream;
// CreateStream.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Layout from './layout/layout';
import { useAuth } from './context/auth';

const socket = io('http://localhost:3002');

function CreateStream() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:3002/api/route/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${auth.token}`
      },
    });
    // Start streaming
    await axios.post(`http://localhost:3002/api/route/videos/start/${response.data._id}`, {}, {
      headers: { 'Authorization': `Bearer ${auth.token}` }
    });
    navigate(`/stream/${response.data._id}`);
  } catch (error) {
    console.error('Error uploading video', error);
  }
};

  return (
    <Layout>
      <h2>Create a Live Stream</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Video File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Start Stream</button>
      </form>
    </Layout>
  );
}

export default CreateStream;
