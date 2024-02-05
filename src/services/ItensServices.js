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

    modificarItem(st, filtro, valor ){
        console.log('Atualizar banco de dados!')
        return db.query(`UPDATE public.materiais SET st = $1 WHERE (${filtro} = $2)`,[JSON.stringify(st), valor]);
    },

    editarItem(obj){
        console.log('Editar ítem no banco de dados!')
        return db.query('UPDATE public.materiais SET codigo=$1, tipo=$2, localizacao=$3, n_serie=$4, modelo=$5, fabricante=$6, descricao=$7 WHERE id=$8',
            [obj.codigo, obj.tipo, obj.localizacao, obj.n_serie, obj.modelo, obj.fabricante, obj.descricao, obj.id]);

    },

    deletearItem(filtro, valor){
        console.log('Deletar ítem do banco de dados!')
        return db.query(`DELETE FROM public.materiais WHERE ${filtro} = $1`,[valor]);
    }
}
