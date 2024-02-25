const db = require('../db/db');

class MessageModel {
  static getMessages() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT k.`kapcsolat_id`, k.`felhasznalo_id`, f.`teljes_nev` AS `felhasznalo_teljes_nev`, k.`beerkezett_uzenet`, k.`letrehozas_datuma` FROM `kapcsolat` k INNER JOIN `felhasznalo` f ON k.`felhasznalo_id` = f.`felhasznalo_id` WHERE k.`archive_uzenetek` IS NULL;';

      db.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static saveMessage(userId, text) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO kapcsolat (felhasznalo_id, beerkezett_uzenet, letrehozas_datuma) VALUES (?, ?, NOW());';
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
      const sql = 'DELETE FROM kapcsolat WHERE kapcsolat_id = ?';
      db.query(sql, [kapcsolatId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static updateMessage(kapcsolatId, uzenet) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE `kapcsolat` SET `valasz_uzenet` = ?, `archive_uzenetek` = true WHERE `kapcsolat_id` = ?';
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


}

module.exports = MessageModel;