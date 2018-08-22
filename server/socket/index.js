module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(
      `A socket connection to the server has been made: ${serverSocket.id}`
    );

    let room = '';
    let userId = '';

    serverSocket.on('rtc-message--from-client', msg => {
      serverSocket.broadcast.to(room).emit('rtc-message--from-server', msg);
    });

    serverSocket.on('find-room--from-client', newRoom => {
      const socketRoom = io.sockets.adapter.rooms[newRoom];
      if (socketRoom === undefined) {
        // the passed in room doesn't exist, so create it
        room = newRoom;
        serverSocket.join(room);
        serverSocket.emit('create-room--from-server', room);
      } else if (socketRoom.length === 1) {
        // there is one client in the room, so allow another client to join
        room = newRoom;
        serverSocket.emit('join-room--from-server', room);
      } else {
        // max of two clients per room
        serverSocket.emit('room-is-full--from-server');
      }
    });

    serverSocket.on('rtc-auth--from-client', data => {
      data.sid = serverSocket.id;
      serverSocket.broadcast.to(room).emit('rtc-approve--from-server', data);
    });

    serverSocket.on('rtc-accept--from-client', id => {
      io.sockets.connected[id].join(room);
      io.in(room).emit('rtc-bridge--from-server');
    });

    serverSocket.on('rtc-reject--from-client', () => {
      serverSocket.emit('room-is-full--from-server');
    });

    // hangup
    serverSocket.on('rtc-hangup--from-client', () => {
      serverSocket.broadcast.to(room).emit('rtc-hangup--from-server');
      serverSocket.leave(room);
    });

    //
    // NOTIFICATION EVENTS
    // =================
    serverSocket.on('notification-join-room--from-client', studentId => {
      userId = studentId.toString;
      serverSocket.join(userId);
    });

    serverSocket.on('notification-to-student--from-client', roomUrl => {
      serverSocket.broadcast.to(userId).emit('connected', roomUrl);
    });

    //
    // WHITEBOARD EVENTS
    // =================
    serverSocket.on('wb-toggle--from-client', () => {
      // send to all clients in room, including sender
      io.in(room).emit('wb-toggle--from-server');
    });

    serverSocket.on(
      'wb-draw--from-client',
      (start, end, color, lineWidth, eraser) => {
        serverSocket.broadcast
          .to(room)
          .emit('wb-draw--from-server', start, end, color, lineWidth, eraser);
      }
    );

    serverSocket.on('wb-clear--from-client', () => {
      serverSocket.broadcast.to(room).emit('wb-clear--from-server');
    });

    serverSocket.on('wb-fullscreen--from-client', () => {
      io.in(room).emit('wb-fullscreen--from-server');
    });

    //
    // EDITOR EVENTS
    // =============
    serverSocket.on('editor-toggle--from-client', () => {
      // send to all clients in room, including sender
      io.in(room).emit('editor-toggle--from-server');
    });

    serverSocket.on('editor-content--from-client', content => {
      serverSocket.broadcast
        .to(room)
        .emit('editor-content--from-server', content);
    });

    serverSocket.on('editor-mode--from-client', (mode, name) => {
      serverSocket.broadcast
        .to(room)
        .emit('editor-mode--from-server', mode, name);
    });

    //
    // DISCONNECT
    // ==========
    serverSocket.on('disconnect', () => {
      console.log(`socket ID ${serverSocket.id} has disconnected`);
    });
  });
};
