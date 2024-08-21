const Comment = require('../models/comment'); // Импорт модели

async function getComments(req, res, next) {
  try {
    const commentTree = await Comment.getAllCommentsWithReplies(); // Вызов метода
    res.status(200).json({
      comments: commentTree,
    });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

module.exports = {
  getComments
};

