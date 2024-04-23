const db = require('../db');

module.exports = {

    listarUsuarios(){
        return db.query('SELECT * FROM public.usuarios ORDER BY id');
    },

    listarUsuario(filtro, valor){
        console.log('Listar usuário');
        return db.query(`SELECT * FROM public.usuarios WHERE ${filtro} = $1`, valor);
    },

    cadastrarUsuario(obj){
        const sql = 'INSERT INTO public.usuarios (matricula, nome, apelido, setor, email, usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
        const values = [obj.matricula, obj.nome, obj.apelido, obj.setor, obj.email, obj.usuario];
        return db.query(sql, values);    
        },

    modificarUsuario(obj){
        console.log('Editar usuário no banco de dados');
       return db.query('UPDATE public.usuarios SET matricula = $1, nome = $2, apelido =$3, setor = $4, email = $5, usuario = $6 WHERE (id = $7)',
            [obj.matricula, obj.nome, obj.apelido, obj.setor, obj.email, obj.usuario, obj.id]);
        },
    
    deletarUsuario(id){
        console.log('Deletar usuário do banco de dados!');
        return db.query('DELETE FROM public.usuarios WHERE (id = $1)', id);
        }
}