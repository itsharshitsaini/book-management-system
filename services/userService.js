const dbHandler = require('../utility/database');

exports.addUser = async (opts) => {
    try {
        const sql = 'INSERT INTO tb_users SET ? ';
        return await dbHandler.execute(sql, opts);
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to add user');
    }
}

exports.getUser = async (opts) => {
    try {
        const sql = `SELECT ${opts.cols || '*'} FROM tb_users WHERE user_id =  ?`;
        return await dbHandler.execute(sql, opts.user_id);
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to get user');
    }
}

exports.updateRefreshToken = async (opts) => {
    try{
        const sql = `UPDATE tb_users SET refresh_token = ? WHERE user_id =  ?`;
        return await dbHandler.execute(sql, [opts.token, opts.user_id]);
    }
    catch(error) {
        console.error('Error updating hash', error);
        throw new Error('Unable to update hash in db');
    }
}