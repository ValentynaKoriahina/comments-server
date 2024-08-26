const configureSocket = require('../config/socket');

class SocketManager {
  constructor(server) {
    this.io = configureSocket(server);
    this.onlineUsers = new Set();
    this.countUsers = 0;
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      this.onlineUsers.add(socket.id);
      this.countUsers++;
      this.io.emit('onlineUsers', this.countUsers);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        this.onlineUsers.delete(socket.id);
        this.countUsers--;
        this.io.emit('onlineUsers', this.countUsers);
      });
    });
  }
}

module.exports = SocketManager;
