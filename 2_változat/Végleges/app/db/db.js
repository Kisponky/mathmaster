const mysql = require('mysql2');
const Config = require('../config/config');

const config = new Config();

// Kapcsolat inicializálása
const connection = mysql.createConnection(config);

// Kapcsolat megnyitása
connection.connect((err) => {
  if (err) {
    console.error('Hiba a kapcsolat megnyitásakor:', err);
  } else {
    console.log('Adatbázis kapcsolat létrehozva');
  }
});

module.exports = connection;
