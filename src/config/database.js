// require("dotenv").config();
const waitPort = require("wait-port");
const fs = require("fs");
const mysql = require("mysql2");
const request = require("request");
const {
  MYSQL_HOST: HOST,
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER,
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB,
  MYSQL_DB_FILE: DB_FILE,
} = process.env;
console.log("process.env: ", process.env);
let pool;

async function init() {
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
  const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

  await waitPort({
    host,
    port: 3306,
    timeout: 10000,
    waitForDns: true,
  });

  pool = mysql.createPool({
    connectionLimit: 5,
    host,
    user,
    password,
    database,
    charset: "utf8mb4",
  });

  return new Promise((acc, rej) => {
    pool.query(
      "CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean) DEFAULT CHARSET utf8mb4",
      (err) => {
        if (err) return rej(err);

        console.log(`Connected to mysql db at host ${HOST}`);
        acc();
      }
    );
  });
}

async function teardown() {
  return new Promise((acc, rej) => {
    pool.end((err) => {
      if (err) rej(err);
      else acc();
    });
  });
}

async function getItems() {
  return new Promise((acc, rej) => {
    pool.query("SELECT * FROM images", (err, rows) => {
      if (err) return rej(err);
      acc(
        rows.map((item) =>
          Object.assign({}, item, {
            completed: item.completed === 1,
          })
        )
      );
    });
  });
}

async function getItem(id) {
  return new Promise((acc, rej) => {
    pool.query("SELECT * FROM images WHERE id=?", [id], (err, rows) => {
      if (err) return rej(err);
      acc(
        rows.map((item) =>
          Object.assign({}, item, {
            completed: item.completed === 1,
          })
        )[0]
      );
    });
  });
}

async function storeItem(item) {
  return new Promise((acc, rej) => {
    // pool.query(
    //   "INSERT INTO images (id, name, completed) VALUES (?, ?, ?)",
    //   [item.id, item.name, item.completed ? 1 : 0],
    //   (err) => {
    //     if (err) return rej(err);
    //     acc();
    //   }
    // );
    request(item.link, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        if (response.headers["content-type"].match(/(image)+\//g).length != 0) {
          /* It contains 'image/' as the content type */
          pool.query(
            "INSERT INTO images (link) VALUES (?)",
            [item.link],
            (err, rows) => {
              if (err) return rej(err);
              let objJson = Object.assign({}, item, {
                id: rows.insertId,
                isImage: true
              });
              console.log("objJson: ", objJson);
              acc(objJson);
            }
          );
        } else {
          /* no match with 'image/' */
          let objJson = Object.assign({}, item, {
            // id: rows.insertId,
            isImage: false
          });
          acc(objJson);
        }
      } else {
        let objJson = Object.assign({}, item, {
          // id: rows.insertId,
          isImage: false
        });
        acc(objJson);
      }
    });
  });
}

async function updateItem(id, item) {
  return new Promise((acc, rej) => {
    pool.query(
      "UPDATE todo_items SET name=?, completed=? WHERE id=?",
      [item.name, item.completed ? 1 : 0, id],
      (err) => {
        if (err) return rej(err);
        acc();
      }
    );
  });
}

async function removeItem(id) {
  return new Promise((acc, rej) => {
    pool.query("DELETE FROM todo_items WHERE id = ?", [id], (err) => {
      if (err) return rej(err);
      acc();
    });
  });
}

module.exports = {
  init,
  teardown,
  getItems,
  getItem,
  storeItem,
  updateItem,
  removeItem,
};
