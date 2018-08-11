module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });

    let room = '';

    const create = err => {
      if (err) return console.error(err);
      socket.join(room);
      socket.emit('create');
    };

    // sending to all clients in the room except sender
    socket.on('message', msg => {
      console.log('socket message msg', msg)
      socket.broadcast.to(room).emit('message', msg)
    });

    socket.on('find', () => {
      const url = socket.request.headers.referer.split('/');
      room = url[url.length - 1];
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




    //
    // OLD SOCKET EVENTS FROM JERRY'S BRANCH
    // =====================================

    // socket.on('room', (room) => {
    //   socket.join(room);
    // });

    // socket.on('coding event', data => {
    //   socket.broadcast.to(data.room).emit('receive code', data.newCode);
    // });
  });
};
