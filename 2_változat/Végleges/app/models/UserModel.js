const db = require('../db/db');

class UserModel {
    static createUser(fullName, userName, email, password) {
        const sql = 'CALL register(?, ?, ?, ?)';
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
        const sql = `CALL getUserByEmailAndPassword(?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [email, password], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(results[0])
                    resolve(results[0]);
                }
            });
        });
    }

    static addAdminPrivilege(email) {
        return new Promise((resolve, reject) => {
            const sql = 'CALL SetAdminByEmail(?)';

            db.query(sql, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }


    static updateUserUsername(username, userId) {
        const sql = 'CALL UpdateUsername(?, ?);';
        return new Promise((resolve, reject) => {
            db.query(sql, [username, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }


    static updateUserEmail(userId, newEmail) {
        const sql = 'CALL UpdateEmail(?, ?);';
        return new Promise((resolve, reject) => {
            db.query(sql, [newEmail, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    static deleteUserById(userId) {
        const sql = 'CALL DeleteUserById(?);';
        return new Promise((resolve, reject) => {
            db.query(sql, [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static changePassword(userId, oldPassword, newPassword) {
        const sql = 'CALL UpdatePassword(?, ?, ?);';
        return new Promise((resolve, reject) => {
            db.query(sql, [newPassword, userId, oldPassword], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = UserModel;
