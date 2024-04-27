const _ = require('underscore');
const responses = require('../utility/reponses');
const bookService = require("../services/bookService");

exports.getBook = async (req, res) => {
    try {
        const {
            author: author,
            publicationYear: publication_year,
            userId: user_id
        } = req.body;

        await bookService.getBook({
            user_id: user_id,
            publication_year: publication_year,
            author: author
        });

        return responses.actionCompleteResponse(res);
    }
    catch (error) {
        // Log error and send error response
        console.log("Error in execution : ", error);
        return responses.sendError(res);
    }
}



exports.addBook = async (req, res) => {
   try {
        const {
            name,
            author,
            publication_year : publicationYear,
            user_id : userId
        } = req.body;

        const bookDetails = await bookService.getBook({
            user_id             : userId,
            publication_year    : publicationYear,
            author              : author,
            name                : name
        });

        if (!_.isEmpty(bookDetails)) {
            return responses.sendError(res);
        }

        await bookService.addBook({
            name: name,
            author: author,
            publication_year: publicationYear,
            user_id: userId
        });

        return responses.actionCompleteResponse(res);
    }
    catch(error) {
        console.log("Error in execution : ", error); 
        return responses.sendError(res);
    }
}

exports.updateBook = async (req, res) => {
    try {
        const {
            bookId,
            updateObj,
            userId
        } = req.body;

        await bookService.updateBook({
            book_id: bookId,
            user_id: userId,
            update_keys: updateObj
        });

        return responses.actionCompleteResponse(res);
    }
    catch (error) {
        console.log("Error in execution : ", error);
        return responses.sendError(res);
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const {
            bookId,
            userId
        } = req.body;

        await bookService.deleteBook({
            book_id: bookId,
            user_id: userId,
        });

        return responses.actionCompleteResponse(res);
    }
    catch (error) {
        console.log("Error in execution : ", error);
        return responses.sendError(res);
    }
}