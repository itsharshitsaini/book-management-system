// routes/books.js

const express = require('express');
const router = express.Router();
const bookController = require("../controllers/booksController");
const bookValidator = require("../validators/bookValidtor");
const auth = require("../middleware/auth");

// GET 
router.get('/get_books',  bookValidator.getBook, auth.decodeToken ,  bookController.getBook);

// POST request to add a new book
router.post('/add_book',  bookValidator.addBook, auth.decodeToken ,  bookController.addBook);

// PUT request to update a book
router.put('/update_book', bookValidator.updateBook, auth.decodeToken, bookController.updateBook);

// DELETE request to delete a book
router.delete('/delete_book', bookValidator.deleteBook, auth.decodeToken, bookController.deleteBook);

module.exports = router;
