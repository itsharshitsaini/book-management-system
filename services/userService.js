const dbHandler = require('../utility/database');

exports.addUser = async (opts) => {
    try {
        const sql = 'INSERT INTO tb_users SET ?';
        return await dbHandler.query(sql, [opts]);
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to add user');
    }
}

exports.getExistingUser = async (opts) => {
    try {
        const sql = `SELECT ${opts.cols || '*'} FROM tb_users WHERE username =  ? OR email = ?`;
        const [rows, fields] = await dbHandler.query(sql, [opts.username, opts.email]);
        return rows;
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to get user');
    }
}

exports.getUser = async (opts) => {
    try {
        let sql = `SELECT ${opts.cols || '*'} FROM tb_users WHERE 1=1 `;
        const params = [];
        if (opts.username) {
            sql += `AND username = ? `;
            params.push(opts.username);
        }
        if (opts.password) {
            sql += `AND password = ? `;
            params.push(opts.password);
        }
        if (opts.user_id) {
            sql += `AND user_id = ? `
            params.push(opts.user_id);
        }

        const [rows, fields] = await dbHandler.query(sql, params);
        return rows;
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to get user');
    }
}

exports.updateRefreshToken = async (opts) => {
    try {
        const sql = `UPDATE tb_users SET refresh_token = ? WHERE user_id =  ?`;
        return await dbHandler.query(sql, [opts.token, opts.user_id]);
    }
    catch (error) {
        console.error('Error updating hash', error);
        throw new Error('Unable to update hash in db');
    }
}

exports.getUserID = async () => {
    try {
        const sql = `SELECT user_id FROM tb_users ORDER BY user_id DESC LIMIT 1`;
        const [rows, fields] = await dbHandler.query(sql);
        return rows[0];
    }
    catch (error) {
        console.error('Error updating hash', error);
        throw new Error('Unable to update hash in db');
    }
};