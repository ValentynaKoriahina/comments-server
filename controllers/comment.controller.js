const Comment = require('../models/comment');
const path = require('path')


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

  const { username, email, content, parentId, homepage } = req.body;

  if (!username || !email || !content) {
    return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
  }

  let filename;

  if (req.file) {
    filename = req.file['filename'];
  }

  try {
    const newComment = await Comment.addComment({ username, email, content, parentId, homepage, filename });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

async function getCommentFile(req, res, next) {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../', 'fileStorage/commentsUploads', filename);

  res.sendFile(filePath, (err) => {
      if (err) {
          console.error('Ошибка при отправке файла:', err);
          res.status(404).send('Файл не найден');
      }
  });
};


module.exports = {
  getComments,
  addComment,
  getCommentFile
};

