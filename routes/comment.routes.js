const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');

// Custom middleware
const uploader = require('../middleware/uploader.js');
const { validateInput } = require('../middleware/securityValidator');

/**
 * Маршрут для получения всех комментариев.
 * 
 * GET /comments - Обрабатывает запрос на получение всех комментариев.
 */
router.get('/comments', commentController.getComments);

/**
 * Маршрут для добавления нового комментария.
 * 
 * POST /comment - Обрабатывает запрос на добавление нового комментария.
 * Использует middleware `uploader.upload.single('file')` для обработки загрузки файла,
 * затем middleware `validateInput` для валидации входных данных, 
 * и, наконец, контроллер `addComment` из `commentController` для добавления комментария в базу данных.
 */
router.post('/comment', uploader.upload.single('file'), validateInput, commentController.addComment);

module.exports = router;
