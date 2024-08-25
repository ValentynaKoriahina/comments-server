const express = require('express');
const router = express.Router();

// Custom middleware
const { validateInput } = require('../middleware/securityValidator');


router.post('/validate/comment', validateInput, (req, res) => {
  res.status(200).json({ valid: true, message: 'Validation complete' });
});

module.exports = router;
