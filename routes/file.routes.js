const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');

/**
 * Маршрут для получения файла, связанного с комментарием.
 * 
 * GET /commentFile/:filename - Обрабатывает запрос на получение файла комментария по его имени.
 * 
 * Параметры:
 * - `:filename` - Имя файла, который требуется получить.
 */
router.get('/commentFile/:filename', commentController.getCommentFile);

module.exports = router;
