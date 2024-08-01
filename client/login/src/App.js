// import logo from './logo.svg';
import { Route ,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Homepage from './components/homepage';
import { Layout } from 'antd';
import StreamList from './components/streamlist';
import CreateStream from './components/createstream';
import Forgot from './components/forgot';
import Stream from './components/streamlive';
import VideoPlayer from './components/videoplayer';
import ViewStream from './components/viewstream';
import ViewStreams from './components/viewstreams';
// import LiveStream from './components/videoplayer';
function App() {
  return (
  <>
  <Routes>
  <Route path ="/login" element={<Login/>}/>
  <Route path ="/" element={<Homepage/>}/>
  <Route path ="/forgot" element={<Forgot/>}/>
  <Route path ="/signup" element={<Signup/>}/>
  
  <Route path="/create" element={<CreateStream/>} />
  <Route path="/streams" element={<StreamList />} />
  <Route path="/stream/:id" element={<Stream />} />
  <Route path="/viewstreams" element={<ViewStreams/>} />
  <Route path="/viewstream/:id" element={<ViewStream />} />
  

  </Routes>
  </>
  );

}

export default App;