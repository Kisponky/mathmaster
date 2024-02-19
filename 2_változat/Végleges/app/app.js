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

function naplo(szoveg) {
  console.log(szoveg)
}

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
  })
});
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

app.get('/uzenetek/:token', (req, res) => {
  const token = req.params.token;

  // Ellenőrizze a token jogosultságát
  try {
    const decodedToken = jwt.verify(token, TokenKey);

    // Ellenőrizze, hogy a token admin jogosultságú-e
    if (decodedToken.admin === 1) {
      const sqlQuery = 'SELECT k.`kapcsolat_id`, k.`felhasznalo_id`, f.`teljes_nev` AS `felhasznalo_teljes_nev`, k.`beerkezett_uzenet`, k.`letrehozas_datuma` FROM `kapcsolat` k INNER JOIN `felhasznalo` f ON k.`felhasznalo_id` = f.`felhasznalo_id` WHERE k.`archive_uzenetek` IS NULL;';

      // SQL lekérdezés végrehajtása
      connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
          console.error('Hiba a lekérdezés során: ' + error.message);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Sikeres lekérdezés esetén küldjük vissza az eredményeket
        res.json(results);
      });
    } else {
      // Ha a token nem rendelkezik admin jogosultsággal
      res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
    }
  } catch (error) {
    // Ha a token verifikációja nem sikerül
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Érvénytelen token.' });
  }
});

app.get('/vizsgalatinaplo/:token', (req, res) => {
  const token = req.params.token;

  // Ellenőrizze a token jogosultságát
  try {
    const decodedToken = jwt.verify(token, TokenKey);

    // Ellenőrizze, hogy a token admin jogosultságú-e
    if (decodedToken.admin === 1) {
      const sqlQuery = 'SELECT `naplo_id`, felhasznalo.felhasznalonev, felhasznalo.email, `tipus`, `megjegyzes`, vizsgalatinaplo.datum FROM `vizsgalatinaplo` INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id WHERE 1 ORDER BY vizsgalatinaplo.datum DESC;';

      // SQL lekérdezés végrehajtása
      connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
          console.error('Hiba a lekérdezés során: ' + error.message);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Sikeres lekérdezés esetén küldjük vissza az eredményeket
        res.json(results);
      });
    } else {
      // Ha a token nem rendelkezik admin jogosultsággal
      res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
    }
  } catch (error) {
    // Ha a token verifikációja nem sikerül
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Érvénytelen token.' });
  }
});


app.delete('/kapcsolat/:kapcsolat_id', (req, res) => {
  const kapcsolatId = req.params.kapcsolat_id;
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Az Authorization fejlécből kinyerjük a token-t

  // Ellenőrizze a token jogosultságát
  try {
    const decodedToken = jwt.verify(token, TokenKey);

    // Ellenőrizze, hogy a token admin jogosultságú-e
    if (decodedToken.admin === 1) {
      // Ha igen, hajtsa végre a törlési műveletet
      const sql = 'DELETE FROM kapcsolat WHERE kapcsolat_id = ?';

      connection.query(sql, [kapcsolatId], (error, results) => {
        if (error) {
          console.error('Hiba a lekérdezés során:', error);
          res.status(500).json({ success: false, message: 'Hiba a kapcsolat törlése közben.' });
        } else {
          console.log('Kapcsolat sikeresen törölve.');
          res.status(200).json({ success: true, message: `Kapcsolat ${kapcsolatId} sikeresen törölve.` });
        }
      });
    } else {
      // Ha a token nem rendelkezik admin jogosultsággal
      res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
    }
  } catch (error) {
    // Ha a token verifikációja nem sikerül
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Érvénytelen token.' });
  }
});


app.post('/felvetel', (req, res) => {
  const email = req.body.email;
  const token = req.body.token;

  // Ellenőrizze a token jogosultságát
  try {
    const decodedToken = jwt.verify(token, TokenKey);

    // Ellenőrizze, hogy a token admin jogosultságú-e
    if (decodedToken.admin === 1) {
      // Ha igen, hajtsa végre az admin jog hozzáadását
      const sql = 'UPDATE felhasznalo SET admin = true WHERE email = ?';

      connection.query(sql, [email], (error, results) => {
        if (error) {
          console.error('Hiba a lekérdezés során:', error);
          res.status(500).json({ success: false, message: 'Hiba az admin jog hozzáadása közben.' });
        } else {
          console.log('Admin jog sikeresen hozzáadva.');
          res.status(200).json({ success: true, message: `Admin jog hozzáadva a felhasználóhoz: ${email}` });
        }
      });
    } else {
      // Ha a token nem rendelkezik admin jogosultsággal
      res.status(403).json({ success: false, message: 'Nincs megfelelő felhasználói jogosultság.' });
    }
  } catch (error) {
    // Ha a token verifikációja nem sikerül
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Érvénytelen token.' });
  }
});

app.put('/valasz/:kapcsolatId', (req, res) => {
  const kapcsolatId = req.params.kapcsolatId;
  const token = jwt.verify(req.body.token, TokenKey);

  if (token.admin == 1) {
    const sql = 'UPDATE `kapcsolat` SET `valasz_uzenet` = ?, `archive_uzenetek` = true WHERE `kapcsolat_id` = ?';
    const values = [req.body.uzenet, kapcsolatId];

    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Hiba az SQL lekérdezés során: ' + err.message);
        res.status(500).json({ error: 'Hiba az SQL lekérdezés során' });
        return;
      }
      console.log('Sikeres frissítés');
      res.json({ success: true });
    });
  } else {
    res.json({ success: false });
  }


});

app.post('/admin-check', (req, res) => {
  try {
    const token = jwt.verify(req.body.token, TokenKey);

    if (token.admin == 1) {
      res.status(200).json({ success: true });
    }
    else {
      ;
      res.status(403).json({ error: 'Forbidden', message: 'Nem megfelelő felhasználói jogosultság!' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.get('/feladat', (req, res) => {
  const osztaly = req.query.osztaly;
  const tipus = req.query.tipus;

  const query = `
    SELECT tartalom, valaszlehetosegek
    FROM feladatlap
    WHERE osztaly = ? AND tipus = ?
    ORDER BY RAND()
    LIMIT 1;
  `;

  connection.query(query, [osztaly, tipus], (err, results) => {
    if (err) {
      console.error('Hiba az adatbázislekérdezés során: ' + err.stack);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Nincs találat a megadott feltételekkel' });
      return;
    }

    const feladat = results[0];
    res.json(feladat);
  });
});


app.get('/statisztika/:token/:muvelet', (req, res) => {
  const token = req.params.token;
  const muvelet = req.params.muvelet;
  console.log(token);
  console.log(muvelet);

  // Ellenőrizd, hogy a token érvényes formátumú JWT-e
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TokenKey);
  } catch (error) {
    res.status(401).json({ error: 'Érvénytelen JWT token' });
    return;
  }

  const felhasznaloId = decodedToken.userId;

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

  connection.query(query, [felhasznaloId, muvelet], (err, results) => {
    if (err) {
      console.error('Hiba az adatbázislekérdezés során: ' + err.stack);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Nincs találat a megadott felhasználóval és művelettel' });
      return;
    }

    const statisztika = results[0];
    res.json(results);
  });
});





app.get('/', (req, res) => {
  res.send('<h1>Szerver fut</h1>');
});

app.listen(port, () => {
  console.log(`Példa alkalmazás publikálva ${port}-on`);
});
