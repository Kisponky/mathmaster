const db = require('../db/db');

class UserModel {
    static createUser(fullName, userName, email, password) {
        const sql = 'INSERT INTO felhasznalo(teljes_nev, felhasznalonev, email, jelszo, datum) VALUES (?, ?, ?, ?, NOW());';
        return new Promise((resolve, reject) => {
            db.query(sql, [fullName, userName, email, password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getUserByEmailAndPassword(email, password) {
        const sql = `SELECT felhasznalo_id, teljes_nev, email, admin FROM felhasznalo WHERE email = ? AND jelszo = sha2(?, 256)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [email, password], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static addAdminPrivilege(email) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE felhasznalo SET admin = true WHERE email = ?';

            db.query(sql, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getVizsgalatinaplo() {
        return new Promise((resolve, reject) => {
          const sqlQuery = 'SELECT `naplo_id`, felhasznalo.felhasznalonev, felhasznalo.email, `tipus`, `megjegyzes`, vizsgalatinaplo.datum FROM `vizsgalatinaplo` INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id WHERE 1 ORDER BY vizsgalatinaplo.datum DESC;';
    
          db.query(sqlQuery, (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }
    


    // Egyéb metódusok (pl. felhasználó frissítése, törlése)...
}

module.exports = UserModel;
