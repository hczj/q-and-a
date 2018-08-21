import io from 'socket.io-client';
import { mediaEvents } from './components/classroom/classroom-view';
import { whiteboardEvents } from './components/classroom/whiteboard-container';
import { editorEvents } from './components/classroom/editor-container';

const clientSocket = io(window.location.origin);
let roomName = window.location.pathname;

clientSocket.on('connect', () => {
  console.log('Socket connected!');
});

mediaEvents.on('rtc-message', message => {
  console.log('*** MEDIA EVENT ON MESSSAGE', message);
  clientSocket.emit('rtc-message--from-client', message);
});

mediaEvents.on('find-room', room => {
  clientSocket.emit('find-room--from-client', room);
});

mediaEvents.on('rtc-auth', data => {
  clientSocket.emit('rtc-auth--from-client', data);
});

mediaEvents.on('rtc-accept', data => {
  clientSocket.emit('rtc-accept--from-client', data);
});

mediaEvents.on('rtc-hangup', () => {
  clientSocket.emit('rtc-hangup--from-client');
});

whiteboardEvents.on('wb-toggle', () => {
  clientSocket.emit('wb-toggle--from-client');
});

whiteboardEvents.on('wb-draw', (start, end, color, lineWidth) => {
  clientSocket.emit('wb-draw--from-client', start, end, color, lineWidth);
});

whiteboardEvents.on('wb-clear', () => {
  clientSocket.emit('wb-clear--from-client');
});

editorEvents.on('editor-toggle', () => {
  clientSocket.emit('editor-toggle--from-client');
});

editorEvents.on('editor-content', content => {
  clientSocket.emit('editor-content--from-client', content);
});

editorEvents.on('editor-mode', mode => {
  clientSocket.emit('editor-mode--from-client', mode);
});

export default clientSocket;
