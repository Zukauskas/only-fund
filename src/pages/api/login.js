import mysql from 'mysql'
import md5 from 'md5'
import cookie from 'cookie'
import initMiddleware from '@/lib/initMiddleware'
import Cors from 'cors'

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
    origin: process.env.NEXT_PUBLIC_API_URL, // Replace with your client-side domain
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
  return new Promise((resolve) => {
    const { method } = req

    switch (method) {
      case 'POST': {
        const name = req.body.name
        const psw = md5(req.body.psw)
        connection.query(
          `SELECT * FROM users WHERE username = '${name}' AND password = '${psw}'`,
          (err, rows) => {
            if (err) {
              res.json({ status: 'error', message: 'Error in query 1' })

              resolve()
            }
            if (rows.length > 0) {
              const session = md5(Math.random())
              connection.query(
                `UPDATE users SET session = '${session}' WHERE username = '${name}' AND password = '${psw}'`,
                (err, rows) => {
                  if (err) {
                    res.json({ status: 'error', message: 'Error in query 2' })
                  }
                }
              )
              res.setHeader(
                'Set-Cookie',
                cookie.serialize('session', session, {
                  httpOnly: true,
                  path: '/'
                })
              )
              res.json({ status: 'ok', name, role: rows[0].role })

              resolve()
            } else {
              res.json({
                status: 'error',
                message: 'Incorrect username or password'
              })

              resolve()
            }
          }
        )
        break
      }

      case 'GET': {
        const session = req.cookies.session
        connection.query(
          `SELECT * FROM users WHERE session = '${session}'`,
          (err, rows) => {
            if (err) {
              res.json({ status: 'error', message: 'Error in query' })

              resolve()
            }
            if (rows.length > 0) {
              res.json({
                status: 'ok',
                name: rows[0].username,
                role: rows[0].role
              })

              resolve()
            } else {
              res.json({ status: 'error', message: 'Not logged in' })

              resolve()
            }
          }
        )
        break
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        resolve()
      }
    }
  })
}
