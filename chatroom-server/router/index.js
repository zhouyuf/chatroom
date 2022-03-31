const { User } = require('../sql/user');
const express = require('express');
const { query } = require('express');
const router = express.Router();

const tokenList = new Map();

router
.get('/login', (req, res) => {
  User.findOne({where: {name: req.query.username}}).then(data => {
    if(data.password === req.query.password) {
      const token = `token_${data.uid}_${Date.now()}`;
      tokenList.set(data.name, token);
      res.json({
        code: 0,
        msg: "登录成功",
        user: data.name,
        token
      });
      return;
    }else {
      res.json({
        code: 1,
        msg: "密码错误"
      })
      return;
    }
  })
})
.get('/checkToken', (req, res) => {
  if(tokenList.has(req.query.username)) {
    res.json({
      status: tokenList.get(req.query.username) == req.query.token
    });
    return;
  }
  res.json({
    status: false
  })
  return;
})
.get('/friendList', (req, res) => {
  User.findOne({where: {name: req.query.name}}).then(data => {
    res.json({
      friendList: data.friend
    })
    return;
  })
})

module.exports = router;