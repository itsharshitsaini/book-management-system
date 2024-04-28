const _ = require('underscore');
const responses = require('../utility/reponses');
const bookService = require("../services/bookService");
const { responseFlags, responseMessages } = require('../utility/constants');

exports.getBook = async (req, res) => {
    try {
        const {
            author,
            publication_year: publicationYear,
        } = req.query;

        const userId = req.user.user_id;

        const books = await bookService.getBook({
            user_id: userId,
            publication_year: publicationYear,
            author: author
        });

        return responses.actionCompleteResponse(res, books);
    }
    catch (error) {
        console.log("Error in execution : ", error);
        return responses.sendError(res);
    }
};



exports.addBook = async (req, res) => {
    try {
        const {
            name,
            author,
            publication_year: publicationYear,
        } = req.body;

        const userId = req.user.user_id;

        const bookDetails = await bookService.getBook({
            name: name,
            author: author,
            publication_year: publicationYear,
            user_id: userId
        });

        if (!_.isEmpty(bookDetails)) {
            throw new Error("Book Already Exist");
        }

        await bookService.addBook({
            name: name,
            author: author,
            publication_year: publicationYear,
            user_id: userId
        });

        return responses.actionCompleteResponse(res);
    }
    catch (error) {
        console.log("Error in execution : ", error);
        return responses.sendError(res, responseFlags.CONFLICT, error && error.message);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const {
            book_id: bookId,
            update_obj: updateObj,
        } = req.body;

        const userId = req.user.user_id;

        const bookDetails = await bookService.getBook({
            user_id : userId,
            book_id : bookId
        });

        if (_.isEmpty(bookDetails)) {
            return responses.sendError(res, responseFlags.UNAUTHORIZED , responseMessages.UNAUTHORIZED);
        }

        await bookService.updateBook({
            book_id: bookId,
            user_id: userId,
            update_obj: updateObj
        });

        return responses.actionCompleteResponse(res);
    }
    catch (error) {
        console.log("Error in execution : ", error);
        return responses.sendError(res, responseFlags.ERROR_IN_EXECUTION, error && error.message);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const {
            book_id: bookId,
        } = req.body;
        const userId = req.user.user_id;

        const bookDetails = await bookService.getBook({
            user_id : userId,
            book_id : bookId
        });

        if (_.isEmpty(bookDetails)) {
            return responses.sendError(res, responseFlags.UNAUTHORIZED , responseMessages.UNAUTHORIZED);
        }
        
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
};