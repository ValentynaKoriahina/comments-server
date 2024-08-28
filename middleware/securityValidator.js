const xss = require('xss');

/**
 * Назначение: для валидации и защиты входных данных, поступающих от пользователя.
 * 
 * Основные задачи:
 * - Защита от XSS-атак путем удаления недопустимых HTML-тегов и атрибутов из пользовательского ввода.
 * - Проверка корректности формата E-mail и URL.
 * - Обеспечение соответствия имени пользователя допустимым символам.
 * 
 * Этот модуль используется в маршрутах, где требуется проверка данных перед их дальнейшей обработкой или сохранением,
 * обеспечивая тем самым безопасность и целостность приложения.
 */

/**
 * Функция проверяет обязательные поля формы (username, email, content) на наличие XSS-атак,
 * валидирует формат E-mail и URL, а также проверяет, что имя пользователя содержит только допустимые символы.
 * 
 * В случае неудачни валижации останавливает дальнейшую обработку запроса.
 */
function validateInput(req, res, next) {
    const { username, email, homepage, content } = req.body;

    // Проверка на наличие обязательных полей
    if (!username || !email || !content) {
        return res.status(400).json({ valid: false, message: 'Все обязательные поля должны быть заполнены.' });
    }

    // Проверка полей на XSS-атаки
    const allowedTags = ['a', 'code', 'i', 'strong']; // Разрешенные HTML-теги
    const xssOptions = {
        whiteList: allowedTags.reduce((acc, tag) => {
            acc[tag] = ['href', 'title']; // Разрешенные атрибуты для каждого тега
            return acc;
        }, {}),
        stripIgnoreTag: true, // Удалять неразрешенные теги
        stripIgnoreTagBody: ['script'], // Удалять содержимое скриптов
    };

    const hasXSS = (input) => {
        const sanitized = xss(input, xssOptions);
        return input !== sanitized; // Если input не равен sanitized, то были недопустимые теги
    };

    if (hasXSS(username) || hasXSS(email) || hasXSS(homepage) || hasXSS(content)) {
        return res.status(400).json({ valid: false, message: 'Обнаружены недопустимые HTML-теги' });
    }

    // Регулярное выражение для проверки формата E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Регулярное выражение для проверки формата URL
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    // Регулярное выражение для проверки имени пользователя (только буквы и цифры)
    const urlUsername = /^[a-zA-Z0-9]+$/;

    // Проверка формата E-mail
    if (!emailRegex.test(email)) {
        return res.status(400).json({ valid: false, message: 'Некорретный E-mail.' });
    }

    // Проверка формата URL, если поле homepage не пустое
    if (homepage && !urlRegex.test(homepage)) {
        return res.status(400).json({ valid: false, message: 'Некорретный URL.' });
    }

    // Проверка имени пользователя на соответствие допустимым символам
    if (!urlUsername.test(username)) {
        return res.status(400).json({ valid: false, message: 'Некорретное имя пользователя.' });
    }

    next();
}

module.exports = { validateInput };
