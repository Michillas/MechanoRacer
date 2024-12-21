import io from 'socket.io-client';
const socket = io('https://mechanoracer-back.vercel.app');
export default socket;