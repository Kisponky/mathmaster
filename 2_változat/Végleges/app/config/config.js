require('dotenv').config();

module.exports = class Config {
    user = "root";
    password = "";
    database = "mathmaster";
    host = "localhost";
    constructor() {
        return {
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        };
    }
};