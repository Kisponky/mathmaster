const db = require('../db/db');

class TaskModel {
  static generateTask(osztaly, tipus) {
    return new Promise((resolve, reject) => {
      const query = `CALL GetRandomFeladatlap(?, ?);`;

      db.query(query, [osztaly, tipus], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // Ha nincs találat
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  static getStatistics(userId, operation) {
    return new Promise((resolve, reject) => {
      const query = `CALL GetStatisztika(?, ?);`;

      db.query(query, [userId, operation], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

}

module.exports = TaskModel;
