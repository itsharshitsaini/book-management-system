// routes/books.js

const express = require('express');
const router = express.Router();
const bookController = require("../controllers/booksController");
const bookValidator = require("../validators/bookValidtor");
const auth = require("../middleware/auth");


router.use(auth.decodeToken);

router.get('/get_books', bookValidator.getBook, bookController.getBook);

router.post('/add_book', bookValidator.addBook, bookController.addBook);

router.patch('/update_book', bookValidator.updateBook, bookController.updateBook);

router.delete('/delete_book', bookValidator.deleteBook, bookController.deleteBook);

module.exports = router;
