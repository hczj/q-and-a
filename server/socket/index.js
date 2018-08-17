module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Socket ID ${socket.id} has disconnected`);
    });

    let room = '';

    const create = err => {
      if (err) return console.error(err);
      socket.join(room);
      socket.emit('create');
    };

    // sending to all clients in the room except sender
    socket.on('message', msg => {
      socket.broadcast.to(room).emit('message', msg);
    });

    socket.on('find', () => {
      console.log('joined!');
      const url = socket.request.headers.referer.split('/');
      room = url[url.length - 1];
      console.log(room);
      const sr = io.sockets.adapter.rooms[room];
      if (sr === undefined) {
        // no room with such name is found so create it
        socket.join(room);

        socket.emit('create');
      } else if (sr.length === 1) {
        socket.emit('join');
      } else {
        // max two clients
        socket.emit('full', room);
      }
    });

    socket.on('auth', data => {
      console.log('socket auth data', data);
      data.sid = socket.id;
      // sending to all clients in the room except sender
      socket.broadcast.to(room).emit('approve', data);
    });

    socket.on('accept', id => {
      console.log('socket accept id', id);
      io.sockets.connected[id].join(room);
      // sending to all clients in the room — including sender
      io.in(room).emit('bridge');
    });

    socket.on('reject', () => socket.emit('full'));

    socket.on('leave', () => {
      // sending to all clients in the room except sender
      socket.broadcast.to(room).emit('hangup');
      socket.leave(room);
    });

    socket.on('join-whiteboard-room', whiteboardRoom => {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', whiteboardRoom);
      socket.join(whiteboardRoom);
    });

    socket.on('editor-toggle-event', () => {
      socket.broadcast.to(room).emit('editor-toggle');
    });

    socket.on('editor-text-event', text => {
      socket.broadcast.to(room).emit('editor-text', text);
    });

    socket.on('editor-mode-event', mode => {
      socket.broadcast.to(room).emit('editor-mode', mode);
    });

    socket.on('wb-toggle-event', () => {
      socket.broadcast.to(room).emit('wb-toggle');
    });

    socket.on('wb-draw-event', (start, end, color, lineWidth) => {
      const url = socket.request.headers.referer.split('/');
      room = url[url.length - 1];
      console.log(room);
      socket.broadcast.to(room).emit('wb-draw', start, end, color, lineWidth);
    });

    socket.on('wb-clear-event', () => {
      const url = socket.request.headers.referer.split('/');
      room = url[url.length - 1];
      socket.broadcast.to(room).emit('wb-clear');
    });
  });
};
