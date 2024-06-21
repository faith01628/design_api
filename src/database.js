const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'design'
});

connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối đến MySQL: ' + err.stack);
        return;
    }
    console.log('Connect MySQL successfully!');
});

// Định nghĩa hàm executeQuery
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Export kết nối và hàm executeQuery
module.exports = {
    connection,
    executeQuery
};
