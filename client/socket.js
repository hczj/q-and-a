import io from 'socket.io-client';
import { mediaEvents } from './components/classroom/classroom-view';
import {
  whiteboardEvents,
  editorEvents
} from './components/classroom/control-container';
import { notificationEvents } from './components/dashboard/dashboard';

const clientSocket = io(window.location.origin);

clientSocket.on('connect', () => {
  console.log('Socket connected!');
});

mediaEvents.on('rtc-message', message => {
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

whiteboardEvents.on('wb-draw', (start, end, color, lineWidth, eraser) => {
  clientSocket.emit(
    'wb-draw--from-client',
    start,
    end,
    color,
    lineWidth,
    eraser
  );
});

whiteboardEvents.on('wb-clear', () => {
  clientSocket.emit('wb-clear--from-client');
});

whiteboardEvents.on('wb-fullscreen', () => {
  clientSocket.emit('wb-fullscreen--from-client');
});

editorEvents.on('editor-toggle', () => {
  clientSocket.emit('editor-toggle--from-client');
});

editorEvents.on('editor-content', content => {
  clientSocket.emit('editor-content--from-client', content);
});

editorEvents.on('editor-mode', (mode, name) => {
  clientSocket.emit('editor-mode--from-client', mode, name);
});

notificationEvents.on('notification-join-room', userId => {
  clientSocket.emit('notification-join-room--from-client', userId);
});

notificationEvents.on('notification-to-student', roomUrl => {
  clientSocket.emit('notification-to-student--from-client', roomUrl);
});

export default clientSocket;
