import mysql from 'mysql';
import cookie from 'cookie';

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

export default async function handler(req, res) {
    return new Promise((resolve) => {
        const { method } = req;

        if (method === 'GET') {
            const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
            const session = cookies.session;

            if (!session) {
                res.status(401).json({ message: 'Not authorized' });
                resolve();
                return;
            }

            connection.query(`SELECT * FROM users WHERE session = '${session}'`, (err, rows) => {
                if (err) {
                    res.status(500).json({ message: 'Error in query' });
                    resolve();
                    return;
                }

                if (rows.length > 0) {
                    res.status(200).json({
                        status: 'ok',
                        name: rows[0].username,
                        role: rows[0].role,
                        message: 'User is logged in'
                    });
                } else {
                    res.status(401).json({ message: 'Not authorized' });
                }
                resolve();
            });
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            resolve();
        }
    });
}
