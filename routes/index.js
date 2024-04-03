var express = require('express');
var router = express.Router();

const BOOK = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/readall', function(req, res, next) {
  res.render('library' , {
    books : BOOK 
  });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  BOOK.push(req.body)
  // res.json(BOOK);
  res.redirect('/readall');
});

router.get('/delete/:index', function(req, res, next) {
  BOOK.splice(req.params.index,1);
  res.redirect('/readall');
});

router.get('/update/:id', function(req, res, next) {
  res.send('updated');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
module.exports = router;
