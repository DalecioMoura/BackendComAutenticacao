const pgp = require('pg-promise')();

const db = pgp({
    user: 'dbapipostgres',//process.env.DB_USER,
    password: 'MHGQW4vWUBJ700E8eUeeoRMM68hhZVAu',//process.env.DB_PASS,
    host: 'dpg-cmf0d9acn0vc73buhd50-a',//process.env.DB_HOST,
    port: '5432',//process.env.PORT,
    database: 'dbapicontroledematerial_onp1'//process.env.DB_NAME
});

module.exports = db;
