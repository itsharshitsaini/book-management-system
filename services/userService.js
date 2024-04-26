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