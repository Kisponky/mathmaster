const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const { ClientBase } = require('pg');
require('dotenv').config();

const register = (req, res) => {
    // Req body feldolgozása

    UserModel.createUser(req.body.fullName, req.body.userName, req.body.email, req.body.password)
        .then(result => {
            res.status(200).send({ status: 200, success: "Sikeres adatrögzítés" });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send({ status: 404, error: "Hiba a felhasználó rögzítésekor" });
        });
};

const login = (req, res) => {
    const { email, jelszo } = req.body;

    // Ellenőrizze, hogy az e-mail és jelszó üres-e
    if (!email || !jelszo) {
        return res.status(400).json({ error: 'Hiányzó e-mail vagy jelszó' });
    }

    UserModel.getUserByEmailAndPassword(email, jelszo)
        .then(results => {
            if (results.length > 0) {
                const user = results[0];
                const expiresIn = 4 * 60 * 60; // 4 óra (mp-ben)
                const token = jwt.sign({ userId: user.felhasznalo_id, email: user.email, admin: user.admin }, process.env.TOKEN_KEY, { expiresIn });
                return res.json({ success: true, message: 'Sikeres bejelentkezés', token: token, admin: user.admin });
            } else {
                // Sikertelen bejelentkezés
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


const getVizsgalatinaplo = (req, res) => {
    console.log(req.user.userId)
    try {

      if (req.user.admin === 1) {
        UserModel.getVizsgalatinaplo()
          .then(results => {
            res.json(results);
          })
          .catch(error => {
            console.error('Hiba a lekérdezés során: ' + error.message);
            res.status(500).send('Internal Server Error');
          });
      } else {
        res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ success: false, message: 'Érvénytelen token.' });
    }
  };
  


module.exports = { register, login, addAdminPrivilege, getVizsgalatinaplo };