const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Thay bằng user của bạn
  password: '12345678', // Thay bằng password của bạn
  database: 'test_nodejs',  // Thay bằng tên database của bạn
  port: '3307'
});

// Kết nối tới MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;