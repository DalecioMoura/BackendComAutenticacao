const express = require('express');
const router = express.Router();

const ItensController = require('./controllers/ItensController');
const UsuariosController = require('./controllers/UsuariosController');
const bodyParser = require('body-parser');

router.get('/itens', ItensController.listarTudo);
router.get('/item/:id', ItensController.listarItem);
router.post('/item', bodyParser.json(), ItensController.cadastrarItem);
router.patch('/item/:id', bodyParser.json(), ItensController.modificarItem);
router.put('/item/:id', bodyParser.json(), ItensController.editarItem);
router.delete('/item/:id', ItensController.deletarItem);

router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/usuario/:id', UsuariosController.listarUsuario);
router.post('/usuario', bodyParser.json(),UsuariosController.cadastrarUsuario);
router.put('/usuario/:id', bodyParser.json(), UsuariosController.modificarUsuario);
router.delete('/usuario/:id', UsuariosController.deletarUsuario);

module.exports = router;