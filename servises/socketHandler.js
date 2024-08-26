function getConnectedUsers(socket) {

  let onlineUsers = new Set();
  let countUsers = 0;

  socket.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      onlineUsers.add(socket.id);
      countUsers++;

      socket.emit('onlineUsers', countUsers);

      socket.on('disconnect', () => {
          console.log('User disconnected:', socket.id);
          onlineUsers.delete(socket.id);
          countUsers--;
          socket.emit('onlineUsers', countUsers);
      });
  });
};

module.exports = {
  getConnectedUsers
};

