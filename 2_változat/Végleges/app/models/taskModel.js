const db = require('../db/db');

class TaskModel {
  static generateTask(osztaly, tipus) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT tartalom, valaszlehetosegek
        FROM feladatlap
        WHERE osztaly = ? AND tipus = ?
        ORDER BY RAND()
        LIMIT 1;
      `;

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
      const query = `
        SELECT 
          COALESCE(SUM(osszes_kitoltes), 0) AS "osszes", 
          COALESCE(SUM(CASE WHEN jo_kitoltes = 1 THEN 1 ELSE 0 END), 0) AS "jo",
          MONTH(month_dates.month) AS honap
        FROM 
          (SELECT DATE_FORMAT(NOW() - INTERVAL n MONTH, '%Y-%m-01') AS month
          FROM (
            SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
          ) AS numbers) AS month_dates
        LEFT JOIN
          statisztika ON MONTH(statisztika.created_at) = MONTH(month_dates.month)
                      AND felhasznalo_id = ?
                      AND created_at >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01')
                      AND feladat_tipus = ?
        GROUP BY honap
        ORDER BY honap DESC;
      `;

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
