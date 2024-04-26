// routes/books.js

const express = require('express');
const router = express.Router();

// GET request to fetch all books
router.get('/', (req, res) => {
  // Logic to fetch all books from the database
  res.send('List of all books');
});

// POST request to add a new book
router.post('/', (req, res) => {
  // Logic to add a new book to the database
  res.send('Book added');
});

// PUT request to update a book
router.put('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic to update the book with ID bookId in the database
  res.send(`Book with ID ${bookId} updated`);
});

// DELETE request to delete a book
router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic to delete the book with ID bookId from the database
  res.send(`Book with ID ${bookId} deleted`);
});

module.exports = router;
