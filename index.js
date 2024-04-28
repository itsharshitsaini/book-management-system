const express = require('express');
const app = express();

require('dotenv').config();

app.get('/ping', (req, res) => res.send("server is up"))
app.use(express.json());

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');


app.use('/users', usersRouter);
app.use('/books', booksRouter);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));