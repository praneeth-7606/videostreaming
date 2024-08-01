import { exec } from 'child_process';

exec('ffmpeg -version', (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing FFmpeg:', stderr);
    throw error;
  }
  console.log('FFmpeg version:', stdout);
});
