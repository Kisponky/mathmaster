const jwt = require('jsonwebtoken');
const AuditLogModel = require('../models/auditLogModel');
const { ClientBase } = require('pg');

const getVizsgalatinaplo = async (req, res) => {
    try {
      if (req.user.admin === 1) {
        const type = req.params.type;
        const order = req.params.order;
  
        // Lekérdezi az összes vizsgalatinaplo bejegyzést
        const auditLogEntries = await AuditLogModel.getVizsgalatinaplo(type, order);
  
        // Lekéri a különböző tipusokat
        const tipusok = await AuditLogModel.getTypes();
  
        res.json({
          success: true,
          data: {
            vizsgalatinaplo: auditLogEntries,
            tipusok: tipusok
          }
        });
      } else {
        res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
      }
    } catch (error) {
      console.error('Hiba a lekérdezés során:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  


module.exports = { getVizsgalatinaplo };