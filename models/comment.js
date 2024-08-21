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
  timestamps: false
});

Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });

Comment.getCommentWithReplies = async function(commentId) {
  const comment = await Comment.findOne({
    where: { id: commentId },
    include: [
      {
        model: Comment,
        as: 'replies',
        order: [['createdAt', 'ASC']]
      }
    ]
  });

  if (comment && comment.replies.length > 0) {
    const replies = await Promise.all(
      comment.replies.map(reply => this.getCommentWithReplies(reply.id))
    );
    comment.replies = replies;
  }

  return comment;
};

Comment.getAllCommentsWithReplies = async function() {
  const rootComments = await Comment.findAll({
    where: { parentId: null },
    order: [['createdAt', 'ASC']]
  });

  const commentsTree = await Promise.all(
    rootComments.map(comment => this.getCommentWithReplies(comment.id))
  );

  return commentsTree;
};

module.exports = Comment;
