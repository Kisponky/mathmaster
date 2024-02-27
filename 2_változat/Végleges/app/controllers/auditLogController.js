const jwt = require('jsonwebtoken');
const AuditLogModel = require('../models/auditLogModel');
const { ClientBase } = require('pg');

const getVizsgalatinaplo = (req, res) => {
    // console.log(req.user.userId)
    let type = req.params.type
    let order = req.params.order
    try {

        if (req.user.admin === 1) {
            AuditLogModel.getVizsgalatinaplo(type, order)
                .then(results => {
                    res.json(results);
                })
                .catch(error => {
                    console.error('Hiba a lekérdezés során: ' + error.message);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Érvénytelen token.' });
    }



  
};


module.exports = { getVizsgalatinaplo };