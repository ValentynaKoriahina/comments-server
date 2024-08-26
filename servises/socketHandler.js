function getConnectedUsers(io) {
  let onlineUsers = new Set();
  let countUsers = 0;

  io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      onlineUsers.add(socket.id);
      countUsers++;

      io.emit('onlineUsers', countUsers);

      socket.on('disconnect', () => {
          console.log('User disconnected:', socket.id);
          onlineUsers.delete(socket.id);
          countUsers--;
          io.emit('onlineUsers', countUsers);
      });
  });
}

module.exports = {
  getConnectedUsers
};
