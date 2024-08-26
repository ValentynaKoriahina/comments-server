const svgCaptcha = require('svg-captcha');

function generateCaptcha(req, res) {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  res.type('svg');
  res.status(200).send(captcha.data);
}

function verifyCaptcha(req, res) {
  const userCaptcha = req.body.captcha;

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
