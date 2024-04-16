const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/book-store-db-mern9")
    .then(() => console.log("database connection done"))
    .catch((err) => console.log(err.message));