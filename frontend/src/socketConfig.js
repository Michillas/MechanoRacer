import io from 'socket.io-client';
const socket = io('https://mechanoracer-backend.vercel.app/');
export default socket;