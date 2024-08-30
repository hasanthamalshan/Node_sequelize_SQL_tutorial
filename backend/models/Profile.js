const User = require('./User');
const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Profile = sequelize.define('Profile', {
    bio: {
      type: DataTypes.STRING,
    }
  });
  
User.hasOne(Profile);
Profile.belongsTo(User);
  
module.exports = Profile;