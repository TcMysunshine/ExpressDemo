var express = require('express');
var router = express.Router();

/* 主页面 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

module.exports = router;
