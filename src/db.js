const pgp = require('pg-promise')();

const db = pgp({
    user: 'dbapicontroledematerial_z95k_user',//process.env.DB_USER,
    password: 'pGfCLkmeyqIQ1mmcMGlwDVt8U9ERTjD0',//process.env.DB_PASS,
    host: 'dpg-d2ti3l3uibrs73equvo0-a',//process.env.DB_HOST,
    port: '5432',//process.env.PORT,
    database: 'dbapicontroledematerial_z95k'//process.env.DB_NAME
});

module.exports = db;
