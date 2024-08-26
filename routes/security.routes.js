const express = require('express');
const router = express.Router();
const captcha = require('../services/captcha');

router.get('/captcha', captcha.generateCaptcha);
router.post('/verifyCaptcha', captcha.verifyCaptcha);

module.exports = router;
