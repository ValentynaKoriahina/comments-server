const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');

router.get('/commentFile/:filename', commentController.getCommentFile);

module.exports = router;
