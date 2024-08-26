const socketIo = require('socket.io');

function configureSocket(server) {
  return socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET"],
      allowedHeaders: ["X-Requested-With", "content-type"],
      credentials: true
    }
  });
}

module.exports = configureSocket;
