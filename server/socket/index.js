module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(
      `A socket connection to the server has been made: ${serverSocket.id}`
    );

    let myRoom = '';

    serverSocket.on('find-room--from-client', room => {
      console.log('**** SERVER SOCKET IS LOOKING FOR A ROOM:', room);
      const socketRoom = serverSocket.adapter.rooms[room];

      if (socketRoom === undefined) {
        // no room with the name of the `room` parameter is found, so create it
        myRoom = room;
        serverSocket.join(myRoom);
        serverSocket.emit('create-room--from-server', myRoom);
        console.log('**** NO ROOM EXISTS, SO CREATE ROOM:', myRoom);
      } else if (socketRoom.length === 1) {
        // there is one client in the room, so allow another client to join
        console.log('**** THERE IS ONE PERSON IN THIS ROOM');

        myRoom = room;
        console.log('**** SERVER SOCKET HAS TOLD THE SECOND CLIENT TO JOIN:', myRoom);
        serverSocket.emit('join-room--from-server', myRoom);

      } else {
        console.log('**** THIS ROOM IS FULL AND YOU CANNOT JOIN');
        // max of two clients per room
        serverSocket.emit('room-is-full--from-server');
      }
    });

    // sending to all clients in the room except sender
    serverSocket.on('rtc-message--from-client', msg => {
      serverSocket.broadcast.to(room).emit('rtc-message--from-server', msg);
    });

    // incoming call???
    serverSocket.on('rtc-auth--from-client', data => {
      console.log('**** SERVER SOCKET AUTH DATA', data);
      data.sid = serverSocket.id;
      serverSocket.broadcast.to(room).emit('approve', data);
    });



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
