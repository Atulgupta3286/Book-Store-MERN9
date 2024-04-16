const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    name: String,
    author: String,
    price: String,
    quantity: String,
    category: String,
    language: String,
    description: String,
});

const Books = mongoose.model("book", bookModel);

module.exports = Books;