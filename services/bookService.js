const dbHandler = require('../utility/database');
const _ = require('underscore');


exports.getBook = async (opts) => {
    try {
        let sql = 'SELECT book_id, name, author, publication_year FROM tb_books WHERE user_id = ? ';
        const params = [opts.user_id];
        if (opts.author) {
            sql += 'AND author = ? ';
            params.push(opts.author);
        }
        if (opts.publication_year) {
            sql += 'AND publication_year = ? ';
            params.push(opts.publication_year);
        }
        if (opts.name) {
            sql += 'AND name = ? ';
            params.push(opts.name);
        }
        if (opts.book_id) {
            sql += 'AND book_id = ? ';
            params.push(opts.book_id);
        }

        const [rows, fields] = await dbHandler.query(sql, params);
        return rows;
    }
    catch (error) {
        console.error('Error while fetching book:', error);
        throw new Error('Unable to get book(s)');
    }
};

exports.addBook = async (opts) => {
    try {
        const sql = 'INSERT INTO tb_books SET ?';
        return await dbHandler.query(sql, [opts]);
    }
    catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Unable to add book');
    }
};

exports.updateBook = async (opts) => {
    try {
        let sql = 'UPDATE tb_books SET ? WHERE 1=1 ';
        const params = [];

        if (opts.user_id) {
            sql += 'AND user_id = ? ';
            params.push(opts.user_id);
        }
        if (opts.book_id) {
            sql += 'AND book_id = ? ';
            params.push(opts.book_id);
        }

        if (params.length === 0 || _.isEmpty(opts.update_obj)) {
            throw new Error("params missing");
        }

        return await dbHandler.query(sql, [opts.update_obj, ...params]);
    }
    catch (error) {
        console.error('Error updating book:', error);
        throw new Error('Unable to update book');
    }
};

exports.deleteBook = async (opts) => {
    try {
        const sql = 'DELETE FROM tb_books WHERE user_id = ? AND book_id = ? ';
        return await dbHandler.query(sql, [opts.user_id, opts.book_id],);
    }
    catch (error) {
        console.error('Error in deleting book:', error);
        throw new Error('Unable to delete book');
    }
};
