const mysql = require('mysql');
const md5 = require('md5');
const cookie = require('cookie');


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
  if (req.method === 'POST') {
    const name = req.body.name;
    const psw = md5(req.body.psw);
    connection.query(`SELECT * FROM users WHERE username = '${name}' AND password = '${psw}'`, (err, rows) => {
      if (err) {
        res.json({ status: 'error', message: 'Error in query' });
      }
      if (rows.length > 0) {
        const session = md5(Math.random());
        connection.query(`UPDATE users SET session = '${session}' WHERE username = '${name}' AND password = '${psw}'`, (err, rows) => {
          if (err) {
            res.json({ status: 'error', message: 'Error in query' });
          }
        });
        res.setHeader('Set-Cookie', cookie.serialize('session', session, { httpOnly: true, path: '/' }));
        res.json({ status: 'ok', name, role: rows[0].role })
      } else {
        res.json({ status: 'error', message: 'Incorrect username or password' });
      }
    })
  }

  if (req.method === 'GET') {
    const session = req.cookies.session;
    connection.query(`SELECT * FROM users WHERE session = '${session}'`, (err, rows) => {
      if (err) {
        res.json({ status: 'error', message: 'Error in query' });
      }
      if (rows.length > 0) {
        res.json({
          status: 'ok',
          name: rows[0].username,
          role: rows[0].role
        });
      } else {
        res.json({ status: 'error', message: 'Not logged in' });
      }
    })
  }

}
