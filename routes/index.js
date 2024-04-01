var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/readall', function(req, res, next) {
  res.render('library');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
module.exports = router;
