var UserSQL = {
    insert: 'INSERT INTO yhb(username,password) VALUES(?,?)',
    queryAll: 'SELECT * FROM yhb',
    queryByUserPass: 'SELECT * FROM yhb WHERE username = ? and password = ?'
};
module.exports = UserSQL;