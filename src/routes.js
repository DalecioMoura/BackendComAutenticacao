const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/auth');

const ItensController = require('./controllers/ItensController');
const UsuariosController = require('./controllers/UsuariosController');
const authController = require('./controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/usuario',UsuariosController.cadastrarUsuario); //rota não deve ser protegida

//aplica o middleware para todas as rotas que estão abaixo
router.use(authMiddleware);

router.get('/itens', ItensController.listarTudo);
router.get('/item/', ItensController.listarItem);//router.get('/item/:id', ItensController.listarItem);
router.post('/item', ItensController.cadastrarItem);
router.patch('/item/:codigo', ItensController.modificarItem);
router.put('/item/:id', ItensController.editarItem);
router.delete('/item/:codigo', ItensController.deletarItem);

router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/usuario/', UsuariosController.listarUsuario);//('/usuario/:id', UsuariosController.listarUsuario);
router.put('/usuario/:id', UsuariosController.modificarUsuario);
router.delete('/usuario/:id', UsuariosController.deletarUsuario);

module.exports = router;

