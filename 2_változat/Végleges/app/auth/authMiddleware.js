const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Token ellenőrzése a kérés fejlécében
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Hozzáférés megtagadva. Hiányzó token.' });
    }

    try {
        // Token ellenőrzése
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;  // A kéréshez hozzáadjuk a felhasználó adatait
        next();  // Folytatjuk a következő middleware-vel vagy a vezérlővel
    } catch (error) {
        return res.status(401).json({ error: 'Érvénytelen token.' });
    }
};


module.exports = authMiddleware;
