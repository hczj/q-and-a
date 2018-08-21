module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(
      `A socket connection to the server has been made: ${serverSocket.id}`
    );

    let room = '';
    let userId = '';
    const create = err => {
      if (err) return console.log('*** CREATE ERROR', err);
      console.log('============> WHY AM I IN THIS FUNCTION?');
      serverSocket.join(room);
      serverSocket.emit('create-room--from-server');
    };

    serverSocket.on('rtc-message--from-client', msg => {
      console.log('**** SERVER SOCKET HAS RECEIVED A MESSAGE', msg);
      serverSocket.broadcast.to(room).emit('rtc-message--from-server', msg);
    });

    serverSocket.on('find-room--from-client', newRoom => {
      console.log('**** SERVER SOCKET IS LOOKING FOR A ROOM:', newRoom);
      const socketRoom = serverSocket.adapter.rooms[newRoom];
      console.log(socketRoom);
      if (socketRoom === undefined) {
        // the passed in room doesn't exist, so create it
        room = newRoom;
        serverSocket.join(room);
        serverSocket.emit('create-room--from-server', room);
        console.log('**** NO ROOM EXISTS, SO CREATE ROOM:', room);
      } else if (socketRoom.length === 1) {
        // there is one client in the room, so allow another client to join
        room = newRoom;
        console.log(
          '**** SERVER SOCKET HAS TOLD THE SECOND CLIENT TO JOIN:',
          room
        );
        serverSocket.emit('join-room--from-server', room);
      } else {
        console.log('**** THIS ROOM IS FULL AND YOU CANNOT JOIN');
        // max of two clients per room
        serverSocket.emit('room-is-full--from-server');
      }
    });

    // incoming call???
    serverSocket.on('rtc-auth--from-client', data => {
      console.log('**** SERVER SOCKET AUTH DATA', data);
      data.sid = serverSocket.id;
      serverSocket.broadcast.to(room).emit('rtc-approve--from-server', data);
    });

    serverSocket.on('rtc-accept--from-client', id => {
      console.log('**** SERVER SOCKET HAS ACCEPTED ID:', id);
      io.sockets.connected[id].join(room);
      io.in(room).emit('rtc-bridge--from-server');
    });

    serverSocket.on('rtc-reject--from-client', () => {
      console.log('**** SERVER SOCKET HAS REJECTED THE REQUEST TO JOIN');
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
      console.log('students id', studentId);
      userId = studentId.toString;
      serverSocket.join(userId);
    });

    serverSocket.on('notification-to-student--from-client', roomUrl  => {
      serverSocket.broadcast.to(userId).emit('connected', roomUrl);
    });

    //
    // WHITEBOARD EVENTS
    // =================
    serverSocket.on('wb-toggle--from-client', () => {
      serverSocket.broadcast.to(room).emit('wb-toggle--from-server');
    });

    serverSocket.on('wb-draw--from-client', (start, end, color, lineWidth) => {
      console.log('**** SERVER SOCKET WANT TO DRAW FROM CLIENT');
      serverSocket.broadcast
        .to(room)
        .emit('wb-draw--from-server', start, end, color, lineWidth);
    });

    serverSocket.on('wb-clear--from-client', () => {
      serverSocket.broadcast.to(room).emit('wb-clear--from-server');
    });

    //
    // EDITOR EVENTS
    // =============
    serverSocket.on('editor-toggle--from-client', () => {
      serverSocket.broadcast.to(room).emit('editor-toggle--from-server');
    });

    serverSocket.on('editor-content--from-client', content => {
      serverSocket.broadcast
        .to(room)
        .emit('editor-content--from-server', content);
    });

    serverSocket.on('editor-mode--from-client', mode => {
      serverSocket.broadcast.to(room).emit('editor-mode--from-server', mode);
    });

    //
    // DISCONNECT
    // ==========
    serverSocket.on('disconnect', () => {
      console.log(`socket ID ${serverSocket.id} has disconnected`);
    });

    // let room = '';

    // const create = err => {
    //   if (err) return console.error(err);
    //   serverSocket.join(room);
    //   serverSocket.emit('create');
    // };

    // // sending to all clients in the room except sender
    // serverSocket.on('message', msg => {
    //   serverSocket.broadcast.to(room).emit('message', msg);
    // });

    // serverSocket.on('find', () => {
    //   console.log('joined!');
    // const url = serverSocket.request.headers.referer.split('/');
    // room = url[url.length - 1];
    // console.log(room);
    //   const sr = io.serverSockets.adapter.rooms[room];
    //   if (sr === undefined) {
    //     // no room with such name is found so create it
    //     serverSocket.join(room);

    //     serverSocket.emit('create');
    //   } else if (sr.length === 1) {
    //     serverSocket.emit('join');
    //   } else {
    //     // max two clients
    //     serverSocket.emit('full', room);
    //   }
    // });

    // serverSocket.on('auth', data => {
    //   console.log('serverSocket auth data', data);
    //   data.sid = serverSocket.id;
    //   // sending to all clients in the room except sender
    //   serverSocket.broadcast.to(room).emit('approve', data);
    // });

    // serverSocket.on('accept', id => {
    //   console.log('serverSocket accept id', id);
    //   io.serverSockets.connected[id].join(room);
    //   // sending to all clients in the room — including sender
    //   io.in(room).emit('bridge');
    // });

    // serverSocket.on('reject', () => serverSocket.emit('full'));

    // serverSocket.on('leave', () => {
    //   // sending to all clients in the room except sender
    //   serverSocket.broadcast.to(room).emit('hangup');
    //   serverSocket.leave(room);
    // });

    //
    // EDITOR EVENTS
    // =============
    // serverSocket.on('editor-toggle-event', () => {
    //   serverSocket.broadcast.to(room).emit('editor-toggle');
    // });

    // serverSocket.on('editor-text-event', text => {
    //   serverSocket.broadcast.to(room).emit('editor-text', text);
    // });

    // serverSocket.on('editor-mode-event', mode => {
    //   serverSocket.broadcast.to(room).emit('editor-mode', mode);
    // });

    //
    // WHITEBOARD EVENTS
    // =================
    // serverSocket.on('wb-join-room', whiteboardRoom => {
    //   console.log('****** WHITEBOARD ROOM', whiteboardRoom);
    //   serverSocket.join(whiteboardRoom);
    // });

    // serverSocket.on('wb-toggle-event', () => {
    //   serverSocket.broadcast.to(room).emit('wb-toggle');
    // });

    // serverSocket.on('wb-draw-event', (start, end, color, lineWidth) => {
    //   const url = serverSocket.request.headers.referer.split('/');
    //   room = url[url.length - 1];
    //   console.log(room);
    //   serverSocket.broadcast.to(room).emit('wb-draw', start, end, color, lineWidth);
    // });

    // serverSocket.on('wb-clear-event', () => {
    //   const url = serverSocket.request.headers.referer.split('/');
    //   room = url[url.length - 1];
    //   serverSocket.broadcast.to(room).emit('wb-clear');
    // });
  });
};
