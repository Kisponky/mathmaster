const db = require('../db/db');

class MessageModel {
  static getMessages() {
    return new Promise((resolve, reject) => {
      const sql = 'CALL GetMessages();';

      db.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static saveMessage(userId, text) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL saveMessage(?, ?);';
      db.query(sql, [userId, text], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static deleteMessage(kapcsolatId) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL DeleteMessageById(?)';
      db.query(sql, [kapcsolatId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static updateMessage(kapcsolatId, uzenet) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL UpdateMessage(?, ?)';
      const values = [uzenet, kapcsolatId];

      db.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getArchivedMessages(userId) {
    return new Promise((resolve, reject) => {
      const sql = `CALL getMyArchivedMessages(?);`;

      db.query(sql, [userId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

}

module.exports = MessageModel;