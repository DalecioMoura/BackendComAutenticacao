const pgp = require('pg-promise')();

const db = pgp({
    user: 'dbapicontroledematerial_ec9u_user',//process.env.DB_USER,
    password: 'LoFyqQ3fHsR8cdmPVMym5NdnVppUfmpu',//process.env.DB_PASS,
    host: 'dpg-codrgigl5elc73ft9ub0-a',//process.env.DB_HOST,
    port: '5432',//process.env.PORT,
    database: 'dbapicontroledematerial_ec9u'//process.env.DB_NAME
});

module.exports = db;
