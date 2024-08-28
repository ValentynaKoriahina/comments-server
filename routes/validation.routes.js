const express = require('express');
const router = express.Router(); // Создаем новый роутер Express для обработки маршрутов

// Custom middleware
const { validateInput } = require('../middleware/securityValidator');

/**
 * Маршруты для проверки и валидации входных данных для обеспечения безопасности приложения.
 */

/**
 * Маршрут для валидации комментария.
 * 
 * POST /validate/comment - Обрабатывает запрос на валидацию данных комментария.
 */
router.post('/validate/comment', validateInput, (req, res) => {
  res.status(200).json({ valid: true, message: 'Validation complete' });
});

module.exports = router;
