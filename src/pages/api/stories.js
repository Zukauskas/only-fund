const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'pmaUser',
  password: 'pma',
  database: 'final',
});


connection.connect((err) => {

  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }

});

export default async function handler(req, res) {
  return new Promise((resolve) => {
    const { method } = req;
    const { id } = req.query;
    const { confirm } = req.query;
    const { isTransfer } = req.query;

    switch (method) {
      case 'GET':
        connection.query('SELECT * FROM stories', (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(rows);
          }
          resolve();
        });
        break;
      case 'POST':
        const { text, sumNeeded } = req.body;
        let fileName = null;
        if (req.body.file !== null) {
          let type = 'unknown';
          let file;

          if (req.body.file.indexOf('data:image/png;base64,') === 0) {
            type = 'png';
            file = Buffer.from(req.body.file.replace('data:image/png;base64,', ''), 'base64');
          } else if (req.body.file.indexOf('data:image/jpeg;base64,') === 0) {
            type = 'jpeg';
            file = Buffer.from(req.body.file.replace('data:image/jpeg;base64,', ''), 'base64');
          } else {
            file = Buffer.from(req.body.file, 'base64');
          }

          fileName = `${uuidv4()}.${type}`;

          fs.writeFileSync(`./public/img/${fileName}`, file, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        connection.query('INSERT INTO stories (text, sumNeeded, image, sumDonated) VALUES (?, ?, ?, ?)', [text, sumNeeded, fileName, 0], (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Story added' });
          }
          resolve();
        });
        break;

      case 'DELETE':
        connection.query('DELETE FROM stories WHERE id = ?', [id], (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Story deleted' });
          }
          resolve();
        });
        break;

      case 'PUT':
        const { name, sum } = req.body;

        if (confirm === 'true') {
          connection.query(`UPDATE stories SET isConfirmed = 1 WHERE id = ?`, [id], (error, results) => {
            if (error) {

              res.status(500).json({ message: 'An error occurred while updating the balance' });
              return;
            }

            res.json({ message: 'Project confirmed' });
          });
        } else if (isTransfer === 'true') {
          connection.query(`UPDATE stories SET donorList = JSON_ARRAY_APPEND(donorList, \'$\', JSON_OBJECT(\'name\', ?, \'sum\', ?)) WHERE id = ?`, [name, sum, id], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'An error occurred while updating the balance' });
              return;
            }

          });
          connection.query(`UPDATE stories SET sumDonated = sumDonated + ? WHERE id = ?`, [+sum, id], (error, results) => {
            if (error) {

              res.status(500).json({ message: 'An error occurred while updating the balance' });
              return;
            }

            res.json({ message: 'Balance needed updated' });
          });
        } else {
          res.status(400).json({ message: 'Bad request' });
        }
        resolve();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        resolve();
    }
  });
}
