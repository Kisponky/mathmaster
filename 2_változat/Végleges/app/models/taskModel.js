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
            resolve(null); 
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

  static saveResult(userId, answer, taskType) {
    return new Promise((resolve, reject) => {
      const query = `CALL saveResult(?, ?, ?);`;

      db.query(query, [userId, answer, taskType], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static newTask(userId, studentClass, content, answer) {
    return new Promise((resolve, reject) => {
      const query = `CALL addNewTask(?, ?, ?, ?);`;

      db.query(query, [userId, studentClass, content, answer], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

}

module.exports = TaskModel;
