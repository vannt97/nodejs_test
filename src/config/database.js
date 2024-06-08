require("dotenv").config();

const mysql = require("mysql2");

// Tạo kết nối đến MySQL
const connection = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER, // Thay bằng user của bạn
  password: process.env.DB_PASSWORD, // Thay bằng password của bạn
  database: process.env.DB_DATABASE_NAME, // Thay bằng tên database của bạn
  port: process.env.DB_PORT,
});

// Kết nối tới MySQL
connection.on("connection", (connection) => {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = connection;
