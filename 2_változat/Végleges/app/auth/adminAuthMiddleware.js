const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Hozzáférés megtagadva. Hiányzó token.' });
    }


    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

        if (decodedToken.admin === 1) {
            req.user = decodedToken;  
            next();
        } else {
            return res.status(403).json({ error: 'Hozzáférés megtagadva. Admin jogosultságok szükségesek.' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Érvénytelen token.' });
    }
};

module.exports = adminAuthMiddleware;


