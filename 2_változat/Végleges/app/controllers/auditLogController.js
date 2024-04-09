const jwt = require('jsonwebtoken');
const AuditLogModel = require('../models/auditLogModel');
const { ClientBase } = require('pg');

const getVizsgalatinaplo = async (req, res) => {
    try {
      if (req.user.admin === 1) {
        const type = req.params.type;
        const order = req.params.order;
  
        const auditLogEntries = await AuditLogModel.getVizsgalatinaplo(type, order);
  
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
  
  const addAuditLog = async (req, res) => {
    try {
      if (req.user.admin === 1) {
        const { felhasznalo_id, tipus, megjegyzes } = req.body;
  
        if (!felhasznalo_id || !tipus || !megjegyzes) {
          return res.status(400).json({ success: false, message: 'Hiányzó adatok.' });
        }
  
        await AuditLogModel.addAuditLog(felhasznalo_id, tipus, megjegyzes);
  
        res.json({ success: true, message: 'Audit log bejegyzés sikeresen hozzáadva.' });
      } else {
        res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
      }
    } catch (error) {
      console.error('Hiba az audit log bejegyzés hozzáadása során:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

module.exports = { getVizsgalatinaplo, addAuditLog };