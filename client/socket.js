import io from 'socket.io-client';
import { mediaEvents } from './components/classroom/classroom-view';
import { whiteboardEvents } from './components/classroom/whiteboard-container';

const clientSocket = io(window.location.origin);
let roomName = window.location.pathname;

clientSocket.on('connect', () => {
  console.log('Socket connected!');
});

mediaEvents.on('rtc-message', message => {
  console.log('*** MEDIA EVENT ON MESSSAGE -- client/socket.js');
  clientSocket.emit('rtc-message--from-client', message);
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

mediaEvents.on('rtc-auth', data => {
  console.log('THE STUDENT HAS STARTED THE CALL');
  clientSocket.emit('rtc-auth--from-client', data);
});

mediaEvents.on('rtc-accept', data => {
  console.log('THE TEACHER HAS ANSWERED THE CALL');
  clientSocket.emit('rtc-accept--from-client', data);
});

mediaEvents.on('rtc-hangup', () => {
  console.log('*** MEDIA EVENT ON HANGUP -- client/socket.js');
  clientSocket.emit('rtc-hangup--from-client');
});

whiteboardEvents.on('wb-draw', (start, end, color, lineWidth) => {
  clientSocket.emit('wb-draw--from-client', start, end, color, lineWidth);
});

whiteboardEvents.on('wb-clear', () => {
  clientSocket.emit('wb-clear--from-client');
});

editorEvents.on('editor-content', content => {
  clientSocket.emit('editor-content--from-client', content);
});

editorEvents.on('editor-mode', mode => {
  clientSocket.emit('editor-mode--from-client', mode);
});

export default clientSocket;
