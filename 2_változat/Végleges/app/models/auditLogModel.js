const db = require('../db/db');

class AuditLogModel {
    static getVizsgalatinaplo(type, order) {
        return new Promise((resolve, reject) => {
            if (type == "null") {
                const sqlQuery = `CALL GetVizsgalatinaploAll("${order}");`;

                db.query(sqlQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                });
            } else {
                const sqlQuery = `CALL GetVizsgalatinaploByType(?, "${order}");`;

                db.query(sqlQuery, [type], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                });
            }
        });
    }


    static getTypes() {
        return new Promise((resolve, reject) => {
            const sqlQuery = 'CALL GetVizsgalatTypes();';
            db.query(sqlQuery, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0].map(row => row.tipus));
                }
            });
        });
    }


    static addAuditLog(felhasznalo_id, tipus, megjegyzes) {
        return new Promise((resolve, reject) => {
          const sqlQuery = 'CALL InsertVizsgalatinaplo(?, ?, ?)';
          const values = [felhasznalo_id, tipus, megjegyzes];
    
          db.query(sqlQuery, values, (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0]);
            }
          });
        });
      }
    
}

module.exports = AuditLogModel;
