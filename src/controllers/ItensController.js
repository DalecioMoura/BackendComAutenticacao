const { result } = require('../db');
const ItemService = require('../services/ItensServices');

module.exports = {
    async listarTudo(req, res){
        console.log('Listar ítens');
        let json = {error:'', result:[]};

        let itens = await ItemService.listarItens();

        for(let i in itens){
            json.result.push({
                id:itens[i].id,
                codigo:itens[i].codigo,
                tipo:itens[i].tipo,
                localizacao:itens[i].localizacao,
                n_serie:itens[i].n_serie,
                modelo:itens[i].modelo,
                fabricante:itens[i].fabricante,
                descricao:itens[i].descricao,
                st:itens[i].st
            });
        }
        //json.result = JSON.stringify(json.result);
        //console.log('Itens: ' + res.json(json));
        res.json(json);
    },

    async listarItem(req, res){
        console.log('Listar ítem');
        let json = {error:'', result:[]};

        let id = JSON.parse(req.params.id);
        console.log("valor requisição: "+id)
        console.log("valor requisição: "+id.filtro)
        console.log("valor requisição: "+id.valor)
        let itens = await ItemService.listarItem(id.filtro, id.valor);
        
        if(itens)
            json.result = itens
        res.json(json);
    },

    async cadastrarItem(req, res){
        console.log('Cadastrar ítem');
        let json = {error:'', result:[]};
        
        let obj = {
                codigo:req.body.codigo,
                tipo:req.body.tipo,
                localizacao:req.body.localizacao,
                n_serie:req.body.n_serie,
                modelo:req.body.modelo,
                fabricante:req.body.fabricante,
                descricao:req.body.descricao,
                st:req.body.status
            };
   
        if(obj.codigo && obj.tipo){
            let item = await ItemService.cadastraItem(obj);
            console.log('cadastro: '+item[0].id)
            if(item[0] == 'erro'){
                json.error = item[1];
            }
            else{
                json.result = await ItemService.listarItem("id", item[0].id);
            }
        }else
            json.error = 'Campos não enviados.';
        res.json(json);
    },

    async modificarItem(req, res){
        console.log('Modificar ítem');
        let json = {error:'', result:[]};

        let id = JSON.parse(req.params.id);
        let st = req.body.status;
        console.log(st);
        console.log(id.filtro);
        console.log(id.valor);
        if(st && id.filtro && id.valor){
            await ItemService.modificarItem(st, id.filtro, id.valor);
            json.result = await ItemService.listarItem(id.filtro, id.valor);
        }else{
            json.error = 'Campos não enviados'
        }
        res.json(json);
    },

    async editarItem(req, res){
        console.log('Editar ítem');
        let json = {error:'', result:[]};

        let obj = {
            id:req.params.id,
            codigo:req.body.codigo,
            tipo:req.body.tipo,
            localizacao:req.body.localizacao,
            n_serie:req.body.n_serie,
            modelo:req.body.modelo,
            fabricante:req.body.fabricante,
            descricao:req.body.descricao,
            //st:req.body.status
        };
       
        if(obj.id && obj.codigo && obj.tipo){
            await ItemService.editarItem(obj);
            json.result = await ItemService.listarItem("id", obj.id);
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json)

    },

    async deletarItem(req, res){
        console.log('Deletar ítem');
        let json = {error:'', result:[]};

        let id = JSON.parse(req.params.id);
        if(id.filtro && id.valor){
            let retorno = await ItemService.deletearItem(id.filtro, id.valor);
            json.result = retorno;
        }else{
            json.error = 'O ítem não foi deletado!';
        }
        res.json(json);
    }
}
