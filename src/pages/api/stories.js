const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'final'
});

connection.connect((err) => {

  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }

});

export default function handler(req, res) {
  connection.query('SELECT * FROM stories', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(rows);
    }
  });

}
