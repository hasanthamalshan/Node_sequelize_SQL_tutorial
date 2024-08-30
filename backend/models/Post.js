const User = require('./User');
const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  
  User.hasMany(Post);
  Post.belongsTo(User);

  module.exports = Post;
  