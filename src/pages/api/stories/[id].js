const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.PLANETSCALE_DB_HOST,
  user: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
  database: process.env.PLANETSCALE_DB,
  ssl: {
    rejectUnauthorized: true
  }
})

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to database')
  }
})

export default async function handler (req, res) {
  return new Promise((resolve) => {
    const {
      query: { id }
    } = req

    const { method } = req

    switch (method) {
      case 'GET':
        connection.query(
          'SELECT * FROM stories WHERE id = ?',
          [id],
          (err, rows) => {
            if (err) {
              console.log(err)
              res.status(500).json({ message: 'Error fetching story' })
            } else {
              if (rows.length > 0) {
                res.status(200).json(rows[0])
              } else {
                res.status(404).json({ message: 'Story not found' })
              }
            }
            resolve()
          }
        )
        break

      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        resolve()
    }
  })
}
