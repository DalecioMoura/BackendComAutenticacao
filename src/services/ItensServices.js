//const e = require('express');
const db = require('../db');

module.exports = {
    listarItens(){
        console.log('Listar ítens!');
        return db.query('SELECT * FROM public.materiais ORDER BY id');       
    },

    listarItem(filtro, valor){
        console.log('Listar ítem!');
        return db.query(`SELECT * FROM public.materiais WHERE ${filtro} = $1`,valor);
    },

    /*listarItem(id){
        return db.query(`SELECT * FROM public.materiais WHERE id = $1`,id);
    },*/

    cadastraItem(obj){
        console.log('Cadastrar ítem no banco de dados!')
        const values = [obj.codigo, obj.tipo, obj.localizacao, obj.n_serie, obj.modelo, obj.fabricante, obj.descricao, JSON.stringify(obj.st)];
        const sql = 'INSERT INTO public.materiais (codigo, tipo, localizacao, n_serie, modelo, fabricante, descricao, st) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;';
        return db.query(sql, values);
    },

    async modificarItem(st, valor ){
        console.log('Atualizar banco de dados!')
        const item =  await db.query(`UPDATE public.materiais SET st = $1 WHERE (codigo = $2) RETURNING *`,[JSON.stringify(st), valor]);
        console.log('item modificado: ', item);
        return item;
    },




    editarItem(obj){
        console.log('Editar ítem no banco de dados!')
        return db.query('UPDATE public.materiais SET codigo=$1, tipo=$2, localizacao=$3, n_serie=$4, modelo=$5, fabricante=$6, descricao=$7 WHERE id=$8',
            [obj.codigo, obj.tipo, obj.localizacao, obj.n_serie, obj.modelo, obj.fabricante, obj.descricao, obj.id]);

    },

    deletearItem(codigo, valor){
        console.log('Deletar ítem do banco de dados!');
        return db.result(`DELETE FROM public.materiais WHERE ${codigo} = $1`,[valor]);    
    },

    async iniciarRetirada(st, codigo){
        console.log('Cadastrar ítem no banco de dados!')

        try {
            await db.query('BEGIN');    //Inicia a transação
            const values = [codigo, st.nome, st.matricula, st.destino, st.data];
            const sql = 'INSERT INTO public.historico (codigo, nome, matricula, destino, data_retirada) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
            const resultadoInsert = await db.query(sql, values);

            const item = await this.modificarItem(st, codigo);

            await db.query('COMMIT');   //SUCESSO: Salva as mudanças
            let returno = {sucesso: true, historicoId: resultadoInsert[0].id, item: item};
            return returno;
            
        } catch (error) {
            await db.query('ROLLBACK');
            console.log('Erro na transação com o banco de dados', error);
            throw error;
        }
        
    },

    modificarHistorico(id){
        console.log('Atualizar banco de dados!')
        return db.query(`UPDATE public.historico SET data_devolucao = NOW() WHERE id = $1`,[id]);
    },

    async iniciarDevolucao(st, codigo){
        console.log('Mostrar id do histórico!');

        try {

            await db.query('BEGIN');    //Inica a transação com o banco de dados

            const resultadoSelect = await db.query(`SELECT id FROM public.historico WHERE codigo = $1 AND data_devolucao IS NULL ORDER BY id DESC LIMIT 1`, [codigo]);
            
            console.log('id: ', resultadoSelect[0].id);

            if(resultadoSelect < 1){
                console.log('algo não saiu conforme o esperado!');
                await db.query('ROLLBACK');
                return {sucesso: false, menssagem: "Item já devolvido ou nao encontrado no histórico ativo."}
            }

            const historicoIdAberto = resultadoSelect[0].id;

            const historicoAtualizado = await db.query(`UPDATE public.historico SET data_devolucao = NOW() WHERE id = $1 RETURNING *`,[historicoIdAberto]);
            console.log('HISTORICO: ', historicoAtualizado);
            const item = await this.modificarItem(st, codigo);

            await db.query('COMMIT');   //SUCESSO: Salva as mudanças
            return {sucesso: true, historicoId: historicoIdAberto, item: item};
            
        } catch (error) {
            await db.query('ROLLBACK');
            console.log('Erro na transação com o banco de dados', error);
            throw error;
        }
             
    },
}