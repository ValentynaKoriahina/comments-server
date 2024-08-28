const express = require('express');
const router = express.Router();
const captcha = require('../services/captcha');

/**
 * Маршруты, связанные с обеспечением безопасности приложения.
 */

/**
 * Маршрут для генерации капчи.
 * 
 * GET /captcha - Обрабатывает запрос на создание и отправку капчи.
 */
router.get('/captcha', captcha.generateCaptcha);

/**
 * Маршрут для верификации капчи.
 * 
 * POST /verifyCaptcha - Обрабатывает запрос на проверку правильности введенной капчи.
 */
router.post('/verifyCaptcha', captcha.verifyCaptcha);


module.exports = router;
