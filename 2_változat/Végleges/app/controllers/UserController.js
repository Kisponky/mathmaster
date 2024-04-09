const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const AuditLogModel = require('../models/auditLogModel');
const sendEmail = require('../helpers/emailSender');
const { ClientBase } = require('pg');
require('dotenv').config();

const register = (req, res) => {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password ) {
        return res.status(400).json({ error: 'Hiányzó adatok!' });
    }

    UserModel.createUser(fullName, userName, email, password)
        .then(result => {
            sendEmail(fullName, email)
            res.status(200).send({ status: 200, success: "Sikeres adatrögzítés" });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send({ status: 404, error: "Hiba a felhasználó rögzítésekor" });
        });
};

const login = (req, res) => {
    const { email, jelszo } = req.body;

    if (!email || !jelszo) {
        return res.status(400).json({ error: 'Hiányzó e-mail vagy jelszó' });
    }

    UserModel.getUserByEmailAndPassword(email, jelszo)
        .then(results => {
            if (results.length > 0) {
                const user = results[0];
                const expiresIn = 60 * 60 * 4; // 4 óra (mp-ben)
                const token = jwt.sign({ userId: user.felhasznalo_id, fullName: user.teljes_nev, email: user.email, admin: user.admin }, process.env.TOKEN_KEY, { expiresIn });
                return res.json({ success: true, message: 'Sikeres bejelentkezés', token: token, admin: user.admin, expiresIn: expiresIn });
            } else {
                return res.status(401).json({ error: 'Hibás e-mail vagy jelszó' });
            }
        })
        .catch(err => {
            console.error('Adatbázis hiba:', err);
            return res.status(500).json({ error: 'Belso hiba történt' });
        });
};


const addAdminPrivilege = (req, res) => {
    const email = req.body.email;
    const token = req.header('Authorization');

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

        UserModel.addAdminPrivilege(email)
            .then(() => {
                console.log('Admin jog sikeresen hozzáadva.');
                AuditLogModel.addAuditLog(req.user.userId, "Admin felvétel", `Admin jogosultság hozzáadva a követlezőhöz: ${email}`);
                res.status(200).json({ success: true, message: `Admin jog hozzáadva a felhasználóhoz: ${email}` });
            })
            .catch((error) => {
                console.error('Hiba az admin jog hozzáadása közben:', error);
                res.status(500).json({ success: false, message: 'Hiba az admin jog hozzáadása közben.' });
            });

    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Érvénytelen token.' });
    }
};


const updateUserUsername = (req, res) => {
    const username = req.body.username;
    const userId = req.user.userId;

    if (!username) {
        return res.status(400).json({ error: 'Hiányzó felhasználónév' });
    }

    UserModel.updateUserUsername(username, userId)
        .then(result => {
            res.status(200).json({ success: true, message: 'Felhasználónév sikeresen frissítve' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ status: 500, error: 'Hiba a felhasználónév frissítésekor' });
        });
};


const updateUserEmail = (req, res) => {
    const userId = req.user.userId;
    const newEmail = req.body.email;

    UserModel.updateUserEmail(userId, newEmail)
        .then(result => {
            res.status(200).json({ success: true, message: 'Felhasználói email cím sikeresen frissítve.' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, error: 'Hiba a felhasználói email cím frissítésekor.' });
        });
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await UserModel.deleteUserById(userId);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Felhasználó sikeresen törölve' });
        } else {
            res.status(404).json({ status: 404, error: 'Felhasználó nem található' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: 'Hiba a felhasználó törlésekor' });
    }
};


const changePassword = (req, res) => {
    const userId = req.user.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    console.log("userId" + req.user.userId)
    console.log("oldPassword" + req.body.oldPassword)
    console.log("newPassword" + req.body.newPassword)

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Hiányzó régi vagy új jelszó' });
    }

    UserModel.changePassword(userId, oldPassword, newPassword)
        .then(result => {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: true, message: 'Jelszó sikeresen megváltoztatva' });
            } else {
                res.status(401).json({ error: 'Hibás régi jelszó' });
            }
        })
        .catch(err => {
            console.error('Adatbázis hiba:', err);
            res.status(500).json({ error: 'Belso hiba történt' });
        });
};


module.exports = { register, login, addAdminPrivilege, updateUserUsername, updateUserEmail, deleteUserById, changePassword };