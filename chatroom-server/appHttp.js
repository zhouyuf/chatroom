const express = require('express');
const app = express();
const router = require('./router');
// const sequelize = require('./sql');
const http = require('http');

const message = [];
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const { DataTypes } = require('sequelize');
//const io = new Server(server);

// const User = sequelize.define(
//     'user', {
//         id: {
//             field: 'id', // 字段名
//             primaryKey: true,
//             type: DataTypes.INTEGER, // 类型
//             allowNull: false // 是否允许为空
//         },
//         uid: {
//             field: 'uid', // 字段名  
//             primaryKey: true,
//             type: DataTypes.INTEGER, // 类型
//             allowNull: false // 是否允许为空
//         },
//         name: {
//             field: 'name',
//             primaryKey: true,
//             type: DataTypes.STRING
//         },
//         password: {
//             field: 'password',
//             primaryKey: true,
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         friend: {
//             field: 'friend',
//             primaryKey: true,
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         tableName: 'user',
//         timestamps: false,
//         freezeTableName: true
//     }
// );
// User.destroy({where: {id: 1}}).then((res) => {
//     console.log(res.dataValues);
// });
// User.create(
//     {
//         id: 3,
//         name: 'user2',
//         uid: 333333,
//         password: '123456',
//         friend: '["user"]'
//     })
//     .then(res=>{
//         console.log(res);
//     }
// )
// User.findOne({where: {name: 'user'}}).then(res => {console.log(JSON.parse(res.friend))})
app.use(express.static('public'));
app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.use('/', router);
app.listen(8888, () => {
  console.log('http server');
})