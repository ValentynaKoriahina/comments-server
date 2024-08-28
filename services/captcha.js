const svgCaptcha = require('svg-captcha');

/**
 * Назначение: для генерации и верификации CAPTCHA с использованием библиотеки `svg-captcha`.
 * (ввести текст с изображения).
 */

/**
 * Функция для генерации CAPTCHA.
 * 
 * - Создает новое изображение CAPTCHA с помощью библиотеки `svg-captcha`.
 * - Сохраняет текст CAPTCHA в сессии пользователя для последующей верификации.
 * - Отправляет изображение CAPTCHA в формате SVG в ответ на запрос.
 * 
 */
function generateCaptcha(req, res) {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  res.type('svg');
  res.status(200).send(captcha.data);
}

/**
 * Функция для верификации CAPTCHA.
 * 
 * - Сравнивает введенный пользователем текст CAPTCHA с текстом, сохраненным в сессии.
 * - Если тексты совпадают, возвращает положительный ответ, иначе - ошибку.
 * 
 */
function verifyCaptcha(req, res) {
  const userCaptcha = req.body.captcha;

  // Проверяем, совпадает ли введенная CAPTCHA с сохраненной в сессии
  if (userCaptcha === req.session.captcha) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false, message: 'CAPTCHA неверная, попробуйте снова.' });
  }
}

module.exports = {
  generateCaptcha,
  verifyCaptcha
};
