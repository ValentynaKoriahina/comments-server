const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');


// Custom middleware
router.get('/comments', commentController.getComments);


module.exports = router;
