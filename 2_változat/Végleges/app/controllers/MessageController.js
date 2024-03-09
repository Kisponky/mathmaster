const MessageModel = require('../models/MessageModel');
const AuditLogModel = require('../models/auditLogModel');
const GetUserDataByConnectionId = require('../models/getUserDataByConnectionId')
const newMessage = require('../helpers/newMessage')
const jwt = require('jsonwebtoken');

const getMessages = (req, res) => {
    MessageModel.getMessages()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.error('Hiba a lekérdezés során: ' + error.message);
            res.status(500).send('Internal Server Error');
        });
};

const saveMessage = (req, res) => {
    const { text, token } = req.body;
  
    if (text && token) {
      try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
   
        MessageModel.saveMessage(userId, text)
          .then(() => {
            console.log('Üzenet sikeresen mentve az adatbázisba.');
            res.status(200).json({ message: 'Üzenet sikeresen mentve az adatbázisba.' });
          })
          .catch((err) => {
            console.error('Adatbázis hiba:', err);
            res.status(500).json({ error: 'Hiba történt az adatbázis művelet során.' });
          });
      } catch (err) {
        console.error('Token feloldása sikertelen:', err);
        res.status(401).json({ error: 'Érvénytelen token.' });
      }
    } else {
      res.status(400).json({ error: 'Hiányzó adatok: text vagy token.' });
    }
  };


  const deleteMessage = (req, res) => {
    const kapcsolatId = req.params.kapcsolat_id;
    
    MessageModel.deleteMessage(kapcsolatId)
      .then(() => {
        console.log(`Kapcsolat ${kapcsolatId} sikeresen törölve.`);
          AuditLogModel.addAuditLog(req.user.userId, "Üzenet törlése", `Az üzenet törlésre került`);
          res.status(200).json({ success: true, message: `Kapcsolat ${kapcsolatId} sikeresen törölve.` });
      })
      .catch((error) => {
        console.error('Hiba a lekérdezés során:', error);
        res.status(500).json({ success: false, message: 'Hiba a kapcsolat törlése közben.' });
      });
  };
  
  const updateMessage = (req, res) => {
    const kapcsolatId = req.params.kapcsolatId;
    const token = jwt.verify(req.body.token, process.env.TOKEN_KEY);

    if (token.admin == 1) {
      MessageModel.updateMessage(kapcsolatId, req.body.uzenet)
        .then(() => {
          console.log('Sikeres frissítés');
          AuditLogModel.addAuditLog(req.user.userId, "Válasz üzenet", `Válasz: ${req.body.uzenet}`);
          GetUserDataByConnectionId.getUserData(kapcsolatId)
          .then((results) => {
              console.log('Users:', results[0]);
              newMessage(results[0][0].teljes_nev, results[0][0].email)
          })
          .catch((err) => {
              console.error('Error getting users:', err);
          });
          res.json({ success: true });
        })
        .catch((error) => {
          console.error('Hiba az SQL lekérdezés során: ' + error.message);
          res.status(500).json({ error: 'Hiba az SQL lekérdezés során' });
        });
    } else {
      res.json({ success: false });
    }
  };


  const getArchivedMessages = (req, res) => {
    const userId = req.user.userId;
  
    MessageModel.getArchivedMessages(userId)
      .then(results => {
        res.json(results);
      })
      .catch(error => {
        console.error('Hiba a lekérdezés során: ' + error.message);
        res.status(500).send('Internal Server Error');
      });
  };
  
  

module.exports = { getMessages, saveMessage, deleteMessage, updateMessage, getArchivedMessages  };
