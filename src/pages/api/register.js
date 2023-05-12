import initMiddleware from '@/lib/initMiddleware'
import Cors from 'cors'
const mysql = require('mysql')
const md5 = require('md5')

const connection = mysql.createConnection({
  host: process.env.PLANETSCALE_DB_HOST,
  user: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
  database: process.env.PLANETSCALE_DB,
  ssl: {
    rejectUnauthorized: true
  }
})

const cors = initMiddleware(
  Cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://only-fund.vercel.app'
        : 'http://localhost:3000',
    methods: ['POST'],
    credentials: true // Allow sending credentials like cookies
  })
)

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to database')
  }
})

export default async function handler (req, res) {
  await cors(req, res)
  const { name, psw } = req.body
  connection.query(
    'INSERT INTO users (username, password) VALUES(?, ?)',
    [name, md5(psw)],
    (error, results) => {
      res.json({
        status: 'ok'
      })
      connection.end()
    }
  )
}
