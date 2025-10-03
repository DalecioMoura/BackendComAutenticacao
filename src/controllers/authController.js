const authService = require('../services/authService');


module.exports = {

    async register(req, res){

        try{
            console.log(req.body);
            const resultado = await authService.register(req.body);
            res.status(201).json({result: resultado, message: 'Usuário cadastrado com sucesso!'});
            
        }catch(err){
            res.status(400).json({message: err.message});
        }
    },

    async login(req, res){
        console.log('cheguei no controller');
        console.log(req.body);
        try{
            const {email, senha} = req.body;
            console.log(email, senha);
            const token = await authService.login(email, senha);
            console.log('token: '+token);
            res.status(200).json(token);
        }catch(err){
            console.log('algo deu errado');
            console.log(err.message);
            res.status(401).json({message: err.message});
            
        }
    },

};

