const cookie = require('cookie');

// logout

export default function handler(req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('session', '', { httpOnly: true, path: '/' }));
    res.json({ status: 'ok' });
}
