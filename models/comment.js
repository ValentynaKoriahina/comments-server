/**
 * Модель `Comment` с использованием Sequelize.
 * 
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  filename: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  homepage: {
    type: DataTypes.TEXT,
    allowNull: true
  },   
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'comments',
  timestamps: false
});

// Устанавливаем отношения "один ко многим" между комментариями для поддержки вложенных ответов
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });

/**
 * Асинхронная функция для получения комментария с его дочерними комментариями (вложенными ответами).
 * 
 * @param {number} commentId - Идентификатор комментария для поиска.
 * @returns {object} - Комментарий с его вложенными ответами.
 */
Comment.getCommentWithReplies = async function(commentId) {
  const comment = await Comment.findOne({
    where: { id: commentId },
    include: [
      {
        model: Comment,
        as: 'replies',
        order: [['createdAt', 'ASC']],
        include: [{ 
          model: Comment, 
          as: 'replies', 
          include: [{ model: Comment, as: 'replies' }]
        }]
      }
    ]
  });

  // Рекурсивно загружаем все вложенные ответы
  if (comment && comment.replies.length > 0) {
    const replies = await Promise.all(
      comment.replies.map(reply => this.getCommentWithReplies(reply.id))
    );
    comment.replies = replies.flat();
  }

  return comment;
};

/**
 * Асинхронная функция для получения всех корневых комментариев с их вложенными ответами.
 * 
 * @returns {Array} - Массив корневых комментариев с их вложенными ответами.
 */
Comment.getAllCommentsWithReplies = async function() {
  const rootComments = await Comment.findAll({
    where: { parentId: null },
    order: [['createdAt', 'ASC']]
  });

  // Рекурсивно загружаем вложенные ответы для каждого корневого комментария
  const commentsTree = await Promise.all(
    rootComments.map(comment => this.getCommentWithReplies(comment.id))
  );

  return commentsTree;
};

/**
 * Асинхронная функция для добавления нового комментария в базу данных.
 * 
 * @param {object} param0 - Объект с параметрами для создания комментария.
 * @param {string} param0.username - Имя пользователя.
 * @param {string} param0.email - Email пользователя.
 * @param {string} param0.content - Текст комментария.
 * @param {number} [param0.parentId=null] - Идентификатор родительского комментария (если комментарий является ответом).
 * @param {string} [param0.homepage=null] - Домашняя страница пользователя.
 * @param {string} [param0.filename=null] - Имя файла, прикрепленного к комментарию.
 * @returns {object} - Новый комментарий, если операция прошла успешно.
 * @throws {Error} - В случае ошибки при добавлении комментария.
 */
Comment.addComment = async function({ username, email, content, parentId = null, homepage = null, filename = null }) {
  try {
    const newComment = await Comment.create({
      username,
      email,
      content,
      parentId,
      homepage,
      filename,
      createdAt: new Date()
    });

    if (newComment) {
      console.log('Комментарий успешно добавлен');
      return newComment;
    } else {
      throw new Error('Не удалось создать комментарий');
    }
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    throw error;
  }
};

module.exports = Comment;
