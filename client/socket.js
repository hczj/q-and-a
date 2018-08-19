import io from 'socket.io-client';
import { whiteboardEvent } from './components/classroom/whiteboard-container';
const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

whiteboardEvent.on('wb-join-room', room => {
  socket.emit('wb-join-room', room);
});
whiteboardEvent.on('wb-draw-event', (start, end, color, lineWidth) => {
  socket.emit('wb-draw-event', start, end, color, lineWidth);
});

whiteboardEvent.on('wb-clear-event', () => {
  socket.emit('wb-clear-event');
});

export default socket;
