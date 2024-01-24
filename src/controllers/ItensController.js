const { result } = require('../db');
const ItemService = require('../services/ItensServices');

module.exports = {
    async listarTudo(req, res){
        console.log('Chegou no controller');
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
        let json = {error:'', result:[]};

        let id = req.params.id;
        let itens = await ItemService.listarItem(id);
        
        if(itens)
            json.result = itens
        res.json(json);
    },

    async cadastrarItem(req, res){
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
                json.result = await ItemService.listarItem(item[0].id);
            }
        }else
            json.error = 'Campos não enviados.';
        res.json(json);
    },

    async modificarItem(req, res){
        let json = {error:'', result:[]};

        let id = req.params.id;
        let st = req.body.status;
        
        if(st && id){
            await ItemService.modificarItem(st, id);
            json.result = await ItemService.listarItem(id);
        }else{
            json.error = 'Campos não enviados'
        }
        res.json(json);
    },

    async editarItem(req, res){
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
            json.result = await ItemService.listarItem(obj.id);
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json)

    },

    async deletarItem(req, res){
        let json = {error:'', result:[]};

        let id = req.params.id

        if(id){
            await ItemService.deletearItem(id);
        }
    }
}
