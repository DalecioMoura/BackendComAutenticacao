const pgp = require('pg-promise')();

const db = pgp(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })/*{
    user: process.env.DB_USER,      //'dbapicontroledematerial_z95k_user',
    password: process.env.DB_PASS,  //'pGfCLkmeyqIQ1mmcMGlwDVt8U9ERTjD0',
    host: process.env.DB_HOST,      //'dpg-d2ti3l3uibrs73equvo0-a',
    port: process.env.PORT,         //'5432',
    database: process.env.DB_NAME   //'dbapicontroledematerial_z95k'
});*/

module.exports = db;
