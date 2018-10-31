var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var dbConfig = require("../routes/db/DbConfig")
var userSql = require("../routes/db/user/userSql")
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json
var pool = mysql.createPool(dbConfig.mysql)
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200', msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};


// 添加用户
router.post('/addUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body
    console.log("添加用户")
    console.log(param)
    // 建立连接 增加一个用户信息 
    connection.query(userSql.insert, [param.username, param.password], function (err, result) {
      console.log(err)
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '增加成功'
        };
      }
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});
// 查询所有用户
router.get('/queryAllUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query(userSql.queryAll, function (err, result) {
      console.log(err)
      console.log(result)
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);
      // 释放连接  
      connection.release();
    });
  });
});


// 用户登录
router.post('/userLogin', function(req, res, next) {
  // res.render('login');
  var param = req.body
  console.log('用户登录')
  console.log("username:" + param.username)
  console.log("password:" + param.password)
  pool.getConnection(function(err,connection){
    connection.query(userSql.queryByUserPass,[param.username,param.password],function (err, result){
      console.log("Log in")
      if(result){
        console.log("Log in success")
      }
    })
  })
  res.json({message:'success'})
});


module.exports = router;
