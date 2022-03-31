const sequelize = require('../');
const { DataTypes } = require('sequelize');
const User = sequelize.define(
  'user', {
      id: {
          field: 'id', // 字段名
          primaryKey: true,
          type: DataTypes.INTEGER, // 类型
          allowNull: false // 是否允许为空
      },
      uid: {
          field: 'uid', // 字段名  
          primaryKey: true,
          type: DataTypes.INTEGER, // 类型
          allowNull: false // 是否允许为空
      },
      name: {
          field: 'name',
          primaryKey: true,
          type: DataTypes.STRING
      },
      password: {
          field: 'password',
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false
      },
      friend: {
          field: 'friend',
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
      tableName: 'user',
      timestamps: false,
      freezeTableName: true
  }
);

module.exports.User = User;