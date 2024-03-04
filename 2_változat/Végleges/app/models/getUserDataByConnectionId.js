const db = require('../db/db');

function getUserData(connectionId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT felhasznalo.teljes_nev, felhasznalo.email
            FROM felhasznalo
            INNER JOIN kapcsolat ON felhasznalo.felhasznalo_id = kapcsolat.felhasznalo_id
            WHERE kapcsolat.kapcsolat_id = ?
        `;

        db.query(query, [connectionId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = { getUserData };