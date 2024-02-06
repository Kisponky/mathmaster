const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const Config = require('../config');
const jwt = require("jsonwebtoken");
const TokenKey = "tikosKodom";
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const port = 8000;

// app.use(cors({ origin: '*' }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const config = new Config();

const connection = mysql.createConnection(config);

app.get('/fnev', (req, res) => {//Minden felhasználói adat lekérése
  const query = 'SELECT * FROM Felhasznalok';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Hiba a lekérdezés során:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/register', (req, res) => {
  const con = mysql.createConnection(new Config());

  con.connect(function (err) {
    if (err) throw err;
    console.log('Sikeres csatlakozás');
  });

  // Jelszó titkosítása a bcrypt segítségével
  // bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send({ status: 500, error: "Hiba a jelszó titkosításakor" });
  //     return;
  //   }

  //   console.log("PW:"+hashedPassword)//A titkosítást vissza kell alakítani!

    const userSQL = 'INSERT INTO felhasznalo(teljes_nev, felhasznalonev, email, jelszo, datum) VALUES (?, ?, ?, ?, NOW());';
    con.query(userSQL, [req.body.fullName, req.body.userName, req.body.email, req.body.password], (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send({ status: 404, error: "Hiba a felhasználó rögzítésekor" });
      } else {
        res.status(200).send({ status: 200, success: "Sikeres adatrögzítés" });
      }
    });
  });
// });

app.post('/login', (req, res) => {
  const { email, jelszo } = req.body;

  // Ellenőrizze, hogy az e-mail és jelszó üres-e
  if (!email || !jelszo) {
      return res.status(400).json({ error: 'Hiányzó e-mail vagy jelszó' });
  }

  // bcrypt.hash(jelszo, saltRounds, (err, jelszo) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send({ status: 500, error: "Hiba a jelszó titkosításakor" });
  //     return;
  //   }

  // SQL lekérdezés az adatbázisban
  const sql = `SELECT felhasznalo_id, teljes_nev, email, admin FROM felhasznalo WHERE email = ? AND jelszo = ?`;
  const values = [email, jelszo]; // Ebben a példában a jelszót egyszerűen továbbítjuk, de valós alkalmazásban hashelt jelszót kell használni!

  connection.query(sql, values, (err, results) => {
      if (err) {
          console.error('Adatbázis hiba:', err);
          return res.status(500).json({ error: 'Belso hiba történt' });
      }

      // Ellenőrizze, hogy a lekérdezés eredménye tartalmaz-e egyezést
      if (results.length > 0) {
          // Sikeres bejelentkezés
          const user = results[0];
          const expiresIn = 4 * 60 * 60; // 4 óra (mp-ben)
          const token = jwt.sign({ userId: user.felhasznalo_id, email: user.email, admin: user.admin }, TokenKey, { expiresIn });
          return res.json({ success: true, message: 'Sikeres bejelentkezés', token: token, admin: user.admin });
      } else {
          // Sikertelen bejelentkezés
          return res.status(401).json({ error: 'Hibás e-mail vagy jelszó' });
      }
  })});
// });

app.post('/text', (req, res) => {
  const text = req.body.text;
  const token = req.body.token;

  if (text && token) {
    try {

      const decodedToken = jwt.verify(token, TokenKey);
      const userId = decodedToken.userId;
      
      const sql = 'INSERT INTO kapcsolat (felhasznalo_id, beerkezett_uzenet, letrehozas_datuma) VALUES (?, ?, NOW());';
      connection.query(sql, [userId, text], (err) => {
        if (err) {
          console.error('Adatbázis hiba:', err);
          res.status(500).json({ error: 'Hiba történt az adatbázis művelet során.' });
        } else {
          console.log('Üzenet sikeresen mentve az adatbázisba.');
          res.status(200).json({ message: 'Üzenet sikeresen mentve az adatbázisba.' });
        }
      });
    } catch (err) {
      console.error('Token feloldása sikertelen:', err);
      res.status(401).json({ error: 'Érvénytelen token.' });
    }
  } else {
    res.status(400).json({ error: 'Hiányzó adatok: text vagy token.' });
  }
});

app.get('/check-auth', (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, TokenKey);
      const userId = decodedToken.userId;

      res.status(200).json({ authenticated: true, userId });
    } catch (err) {
      console.error('Token feloldása sikertelen:', err);
      res.status(401).json({ authenticated: false, error: 'Érvénytelen token.' });
    }
  } else {
    res.status(401).json({ authenticated: false, error: 'Hiányzó token az Authorization fejlécben.' });
  }
});





app.get('/', (req, res) => {
  res.send('<h1>Szerver fut</h1>');
});

app.listen(port, () => {
  console.log(`Példa alkalmazás publikálva ${port}-on`);
});
