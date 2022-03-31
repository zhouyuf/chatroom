const Sequelize = require('sequelize');
const Sql = require('../base/sql')
const sequelize = new Sequelize('ChatRoom', Sql.sqlUser, Sql.sqlPwd, {
  host: Sql.host,
  dialect: Sql.dialect
})


module.exports = sequelize;