const User = require('./User');
const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
const UserGroup = sequelize.define('UserGroup', {});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

