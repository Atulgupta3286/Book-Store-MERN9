var express = require('express');
var router = express.Router();
const fs = require("fs");
const Books = require("../models/bookModel");
const upload = require("../utils/multer").single("image");
const path = require("path");
const BOOK = [
  {
    name: "Maths",
    author: "Atul",
    price: 599,
    quantity: 10,
    category: "Class-10",
    language: "English",
    description: "The Math Book is a captivating introduction to the worlds most famous theorems, mathematicians and movements, aimed at adults with an interest in the subject and students wanting to gain more of an overview"
  },
];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/readall', async function (req, res, next) {
  // res.render('library', {
  //   books: BOOK
  // });
  // Books.find()
  //   .then((books) => {
  //     res.render("library", { books: books });
  //   })
  //   .catch((err) => res.send(err));
  try {
    const books = await Books.find();
    res.render("library", { books: books });
  } catch (error) {
    res.send(error);
  }
});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/create', upload, async function (req, res, next) {
  // BOOK.push(req.body)
  // // res.json(BOOK);
  // res.redirect('/readall');
  // Books.create(req.body)
  //   .then(() => {
  //     res.redirect("/readall");
  //   })
  //   .catch((err) => res.send(err));
  try {
    // res.json({ body: req.body, file: req.file });

    const newbook = new Books({ ...req.body, image: req.file.filename });
    await newbook.save();
    res.redirect("/readall");
  } catch (error) {
    res.send(error);
  }
});

router.get('/delete/:id', async function (req, res, next) {
  // BOOK.splice(req.params.index, 1);
  // res.redirect('/readall');
  try {
    const book = await Books.findByIdAndDelete(req.params.id);
    
    fs.unlinkSync(
      path.join(__dirname, "..", "public", "images", book.image)
      );

    res.redirect('/readall');
  } catch (error) {
    res.send(error);
  }
});

router.get('/update/:id', async function (req, res, next) {
  // const index = req.params.index;
  // const book = BOOK[index];
  // res.render('update', {
  //   book,
  //   index
  // });
  try {
    const book = await Books.findById(req.params.id);
    res.render('update', { book });
  } catch (error) {
    res.send(error);
  }
});

//update book form submissionn
router.post('/update/:id', async function (req, res, next) {
  // const i = req.params.index;
  // BOOK[i] = req.body;
  // res.redirect('/readall');
  try {
    await Books.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/readall');

  } catch (error) {
    res.send(error);
  }
});

router.get('/about', function (req, res, next) {
  res.render('about');
});
module.exports = router;