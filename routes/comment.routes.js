const express = require('express');
const router = express.Router();

// Custom controllers
const commentController = require('../controllers/comment.controller');


// Custom middleware
const uploader = require('../middleware/uploader.js');
const { validateInput } = require('../middleware/securityValidator');


router.get('/comments', commentController.getComments);
router.post('/comment', validateInput, uploader.upload.single('file'), commentController.addComment);

module.exports = router;
