const xss = require('xss');

function validateInput(req, res, next) {
    const { username, email, homepage, content } = req.body;

    if (!username || !email || !content) {
        return res.status(400).json({ valid: false, message: 'Все обязательные поля должны быть заполнены.' });
    }

    // Проверка полей на XSS
    const allowedTags = ['a', 'code', 'i', 'strong'];
    const xssOptions = {
        whiteList: allowedTags.reduce((acc, tag) => {
            acc[tag] = ['href', 'title'];
            return acc;
        }, {}),
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script'],
    };

    const hasXSS = (input) => {
        const sanitized = xss(input, xssOptions);
        return input !== sanitized; // Если !==, были недопустимые теги
    };

    if (hasXSS(username) || hasXSS(email) || hasXSS(homepage) || hasXSS(content)) {
        return res.status(400).json({ valid: false, message: 'Обнаружены недопустимые HTML-теги' });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const urlUsername = /^[a-zA-Z0-9]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ valid: false, message: 'Некорретный E-mail.' });
    }

    if (homepage && !urlRegex.test(homepage)) {
        return res.status(400).json({ valid: false, message: 'Некорретный URL.' });
    }

    if (!urlUsername.test(username)) {
        return res.status(400).json({ valid: false, message: 'Некорретное имя пользователя.' });
    }

    next();
}

module.exports = { validateInput };
