const dbHandler = require('../utility/database');


exports.getBook = async (opts) => {
    try {
        const sql = 'SELECT book_id, name, author, publication_year FROM tb_books WHERE user_id = ? ';
        const params = [];
        if (opts.author) {
            sql += 'AND author = ? ';
            params.push(opts.author);
        }
        if (opts.publication_year) {
            sql += 'AND publication_year = ? ';
            params.push(opts.publication_year);
        }
        return await dbHandler.execute(sql, [opts.user_id , ...params]);
    }
    catch (error) {
        console.error('Error while fetching book:', error);
        throw new Error(error || 'Unable to fetch book');
    }
}

exports.addBook = async (opts) => {
    try {
        const sql = 'INSERT INTO tb_books SET ?';
        return await dbHandler.execute(sql, opts);
    }
    catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Unable to add book');
    }
}

exports.updateBook = async (opts) => {
    try {
        const sql = 'UPDATE tb_books SET (?) WHERE 1=1 ';
        const params = [];

        if (opts.user_id) {
            sql += 'AND user_id = ?'
            params.push(opts.user_id);
        }
        if (opts.book_id) {
            sql += 'AND book_id = ?'
            params.push(opts.book_id);
        }

        if (!params.length) {
            throw new Error("params missing");
        }

        return await dbHandler.execute(sql, [opts.update_keys, params]);
    }
    catch (error) {
        console.error('Error adding book:', error);
        throw new Error(error || 'Unable to update book');
    }
}

exports.deleteBook = async (opts) => {
    try {
        let sql = 'DELETE FROM tb_books WHERE 1=1 ';
        const params = [];

        if (opts.user_id) {
            sql += 'AND user_id = ?';
            params.push(opts.user_id);
        }
        if (opts.book_id) {
            sql += 'AND book_id = ?';
            params.push(opts.book_id);
        }

        if (!params.length) {
            throw new Error("Missing params");
        }

        return await dbHandler.execute(sql, params);
    }
    catch (error) {
        console.error('Error in deleting book:', error);
        throw new Error('Unable to delete book');
    }
}
