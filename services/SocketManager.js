const configureSocket = require('../config/socket');

/**
 * Назначение: управляет всеми аспектами работы с WebSocket-соединениями в приложении.
 * 
 * Основные задачи:
 * - Настройка и конфигурация WebSocket-сервера.
 * - Отслеживание количества активных (подключенных) пользователей.
 * - Обработка событий подключения и отключения пользователей.
 */

class SocketManager {
  /**
   * Конструктор класса `SocketManager`.
   * 
   * @param {Object} server - HTTP-сервер, который будет использоваться для настройки WebSocket.
   */
  constructor(server) {
    this.io = configureSocket(server);
    this.onlineUsers = new Set(); // Идентификаторы подключенных пользователей
    this.countUsers = 0; // Счетчик активных пользователей
    this.setupSocketEvents();
  }

  /**
   * Метод для настройки обработки событий WebSocket.
   * 
   * - Обрабатывает событие подключения пользователя.
   * - Увеличивает счетчик активных пользователей и отправляет обновленное значение всем подключенным клиентам.
   * - Обрабатывает событие отключения пользователя, уменьшает счетчик и отправляет обновленное значение.
   */
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
