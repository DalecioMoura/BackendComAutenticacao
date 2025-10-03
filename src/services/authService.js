const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    async register(obj){
        if(!obj.nome || !obj.email || !obj.senha){
            throw new Error('Dados insuficientes! Nome, email e senha são obrigatórios.');   
        }

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(obj.senha, salt);

        const sql = 'INSERT INTO public.usuarios (matricula, nome, apelido, setor, usuario, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, matricula, nome, apelido, setor, email, usuario;';
        const values = [obj.matricula, obj.nome, obj.apelido, obj.setor, obj.usuario, obj.email, hashSenha];

        try{

            const reusult = await db.query(sql, values);
            console.log('Resultado: ', reusult[0]);
            return reusult;
        }catch(err){
            console.log(err)
            if(err.code === '23505'){
                throw new Error('Algo deu errado! Esse usuário já cadastrado.' );
            }else{
                throw err;
            }
        }     
    },

    async login(email, senha){

        console.log('cheguei no service');
        console.log(email, senha);
        if(!email || !senha){
            throw new Error('Dados insuficientes! Email e senha são obrigatórios.');
        }

        const sql = 'SELECT * FROM public.usuarios WHERE email = $1';
        const values = [email];

        const userResult = await db.query(sql, values);
        const user = userResult[0]//userResult.rows[0];
        console.log(user);

        if(!user){
            throw new Error('E-mail ou senha incorretos!');
        }
        
        const isMatch = await bcrypt.compare(senha, user.senha)//user.senha);
        console.log('isMatch: '+isMatch);
        console.log('senha digitada: '+senha);
        console.log('senha do banco: '+user.senha);
        if(!isMatch){
            throw new Error('E-mail ou senha incorretos!');
        }

        const payload = {id: user.id};
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return [user,token];
    },
}


