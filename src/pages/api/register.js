const mysql = require("mysql");
const md5 = require("md5");

const connection = mysql.createConnection({
  host: PLANETSCALE_DB_HOST,
  user: PLANETSCALE_DB_USERNAME,
  password: PLANETSCALE_DB_PASSWORD,
  database: PLANETSCALE_DB,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

export default function handler(req, res) {
  const { name, psw } = req.body;
  connection.query(
    `INSERT INTO users (username, password) VALUES(?, ?)`,
    [name, md5(psw)],
    (error, results) => {
      res.json({
        status: "ok",
      });
      connection.end();
    }
  );
}
