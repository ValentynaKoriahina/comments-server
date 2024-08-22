const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');


// Custom middleware
router.get('/comments', commentController.getComments);
router.post('/comment', commentController.addComment);

module.exports = router;
