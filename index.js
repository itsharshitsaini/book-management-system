const express = require('express');
const app = express();

require('dotenv').config();

// Import routers for different features
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

// Use routers for their respective paths
app.use('/books', booksRouter);

app.use('/users', usersRouter);

// Start the server
app.listen(3000, () => console.log("Listening on port 3000"));