const db = require('../db');

module.exports = {

    listarUsuarios(){
        return db.query('SELECT * FROM public.usuarios');
    },

    cadastrarUsuario(obj){
        const sql = 'INSERT INTO public.usuarios (matricula, nome, apelido, setor) VALUES ($1, $2, $3, $4) RETURNING id;';
        const values = [obj.matricula, obj.nome, obj.apelido, obj.setor];
        return db.query(sql, values);    
        },

    modificarUsuario(obj){
       return db.query('UPDATE public.usuarios SET matricula = $1, nome = $2 apelido =$3, setor = $4 WHERE (id = $5)',
            [matricula, nome, apelido, setor, obj]);
        },
    
    deletarUsuario(id){
        return db.query('DELETE public.usuarios WHERE (id = $1)', id);    
        }
}