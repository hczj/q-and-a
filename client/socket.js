import io from 'socket.io-client';
import { mediaEvents } from './components/classroom/classroom-view';
import { whiteboardEvents } from './components/classroom/whiteboard-container';

const clientSocket = io(window.location.origin);
let roomName = window.location.pathname;

clientSocket.on('connect', () => {
  console.log('Socket connected!');
});

mediaEvents.on('find-room', room => {
  console.log('HEY LETS FIND A ROOM NOW OK???????');
  clientSocket.emit('find-room--from-client', room);
});

mediaEvents.on('join-room', room => {
  console.log('CREATING A BRAND NEW ROOM NOW:', room)
});

mediaEvents.on('join-room', room => {
  console.log('OK OK OK, LETS JOIN THIS ROOM:', room)
});

mediaEvents.on('rtc-auth', () => {
  console.log('THE STUDENT HAS STARTED THE CALL');
  clientSocket.emit('rtc-auth--from-client');
})

mediaEvents.on('message', () => {
  console.log('*** MEDIA EVENT ON MESSSAGE -- client/socket.js');
  clientSocket.emit('message');
});

mediaEvents.on('hangup', () => {
  console.log('*** MEDIA EVENT ON HANGUP -- client/socket.js');
  clientSocket.emit('hangup');
});









whiteboardEvents.on('wb-join-room', room => {
  clientSocket.emit('wb-join-room', room);
});
whiteboardEvents.on('wb-draw-event', (start, end, color, lineWidth) => {
  clientSocket.emit('wb-draw-event', start, end, color, lineWidth);
});

whiteboardEvents.on('wb-clear-event', () => {
  clientSocket.emit('wb-clear-event');
});

export default clientSocket;
