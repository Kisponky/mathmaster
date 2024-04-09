const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Hozzáférés megtagadva. Hiányzó token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded; 
        next();  
    } catch (error) {
        return res.status(401).json({ error: 'Érvénytelen token.' });
    }
};


module.exports = authMiddleware;
