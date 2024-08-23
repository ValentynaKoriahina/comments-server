const Comment = require('../models/comment'); // Импорт модели

async function getComments(req, res, next) {
  try {
    const commentTree = await Comment.getAllCommentsWithReplies();
    res.status(200).json({
      comments: commentTree,
    });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

async function addComment(req, res, next) {
  const { username, email, content, parentId } = req.body;

  if (!username || !email || !content) {
    return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
  }

  try {
    const newComment = await Comment.addComment({ username, email, content, parentId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

module.exports = {
  getComments,
  addComment
};

