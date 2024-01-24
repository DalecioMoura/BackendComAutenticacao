require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();


server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, POST, DELETE');
    res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
    
    server.use(cors());
    next();
});


server.use(bodyParser.urlencoded({extended:false}));

server.use('/api', routes);

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});