const db = require('../db/db');

function getUserData(connectionId) {
    return new Promise((resolve, reject) => {
        const query = `CALL GetUserDataByConnectionId(?);`;

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