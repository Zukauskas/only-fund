const mysql = require('mysql');
const md5 = require('md5');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }

});

export default function handler(req, res) {
    const { name, psw } = req.body;
    connection.query(`INSERT INTO users (username, password) VALUES(?, ?)`, [name, md5(psw)], (error, results) => {
        res.json({
            status: 'ok'
        });
    });
}