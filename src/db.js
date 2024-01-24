const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgres',//process.env.DB_USER,
    password: 'Dalecio030783',//process.env.DB_PASS,
    host: 'localhost',//process.env.DB_HOST,
    port: '5432',//process.env.PORT,
    database: 'dbapicontroledematerial'//process.env.DB_NAME
});

module.exports = db;