/**
 * Модуль для настройки и инициализации сокет-сервера с использованием Socket.IO.
 * 
 * Использует переменные окружения для задания параметров CORS, таких как разрешенные источники, методы и заголовки.
 * 
 * Настройка CORS включает разрешение GET-запросов, передачу заголовков и использование куки для аутентификации.
 */

require('dotenv').config();
const socketIo = require('socket.io');

function configureSocket(server) {
  return socketIo(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET"],
      allowedHeaders: ["X-Requested-With", "content-type"],
      credentials: true
    }
  });
}

module.exports = configureSocket;
