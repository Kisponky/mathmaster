const db = require('../db/db');

class AuditLogModel {
    static getVizsgalatinaplo(type, order) {
        return new Promise((resolve, reject) => {
            
            if (type == "null") {
                const sqlQuery = `SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum FROM vizsgalatinaplo INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id WHERE 1 ORDER BY vizsgalatinaplo.datum ${order}`;
                db.query(sqlQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            } else {
                const sqlQuery = `SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum FROM vizsgalatinaplo INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id WHERE tipus = ? ORDER BY vizsgalatinaplo.datum ${order}`;

                db.query(sqlQuery, [type], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            }
            
        });
    }

    
}

module.exports = AuditLogModel;
