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

        let filtro = req.query.filtro;
        let valor = req.query.valor;
        console.log("valor requisição: "+req.query);
        console.log("valor requisição: "+filtro);
        console.log("valor requisição: "+valor);
        let itens = await ItemService.listarItem(filtro, valor);
        
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
            //console.log('cadastro: '+item[0].id)
            console.log(JSON.stringify(item));
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

        let codigo = req.params.codigo;
        let st = req.body.status;
        console.log(st);
        console.log(codigo);

        if(!st || !codigo || !st.st){
            json.error = "Campos obrigatórios (status e código) não enviados.";
            return res.status(400).json(json);
        }

        try {

            let item = await ItemService.listarItem('codigo', codigo);
            console.log('lido: '+item[0].st.st);
            console.log('enviado: '+st.st);

            if(!item || item.length === 0){
                json.error = "Material não encontrado.";
                return res.status(404).json(json);
            }

            const statusAtual = item[0].st.st;

            console.log('status atual: ', statusAtual);

            if(st.st == statusAtual){
                if(st.st == 'Indisponível'){
                    json.error = `Esse item já está emprestado para ${item[0].st.nome}!`;
                    json.result = item
                }
                    
                if(st.st == 'Disponível'){
                    json.error = 'Esse item já foi devolvido!';
                    json.result = item
                }
                
                res.json(json);
                return;
           }

            let resultado = '';

            if(st.st == "Disponível"){
                console.log('entrou na devolução');
                resultado = await ItemService.iniciarDevolucao(st, codigo);
                console.log('resultado: ',JSON.stringify(resultado));
                //json.result = resultado.item;
            }
            else{
                console.log('entrou na retirada');
                resultado = await ItemService.iniciarRetirada(st, item[0].tipo, codigo);
                console.log('resultado: ',JSON.stringify(resultado));
                //json.result = resultado.item;

            }

            if(resultado.sucesso){
                console.log('deu certo');
                json.result = resultado.item;//await ItemService.listarItem('codigo', codigo);
                console.log('resultado.item: ',json.result);
                return res.json(json);
            }           
            else{
                console.log('não deu certo');
                json.error = resultado.mensagem;
                console.log(JSON.stringify(resultado));
                console.log(resultado.sucesso);
                console.log(resultado.resultadoHistoricoId);
                console.log(resultado.item);
                return res.status(400).json(json);
            }

        } 
        catch (error) {
            console.log('não deu certo mesmo');
            console.error("Erro no controller: ", error);
            json.error = 'Erro interno do servidor ao processar a modificação.';
            return res.status(500).json(json);
        }
        
        /*if(st && codigo){

            let item = await ItemService.listarItem('codigo', codigo);
            console.log('lido: '+item[0].st.st);
            console.log('enviado: '+st.st);
            
           if(st.st == item[0].st.st){
            if(st.st == 'Indisponível'){
                json.error = `Esse item já está emprestado para ${item[0].st.nome}!`;
                json.result = item
            }
                
            if(st.st == 'Disponível'){
                json.error = 'Esse item já foi devolvido!';
                json.result = item
            }
                
            res.json(json);
            return;
           }
            
            const resultado = await ItemService.modificarItem(st, codigo);
            console.log('resultado controller: ', resultado);

            json.result = await ItemService.listarItem('codigo', codigo);

            if(st.st == "Disponível"){
                ItemService.iniciarDevolucao(codigo);
            }
            else{
                ItemService.iniciarRetirada(codigo, st);
            }
            
            console.log(json.result);
        }else{
            json.error = 'Campos não enviados'
        }
        res.json(json);*/
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

        let codigo = req.params.codigo;
        console.log(codigo);
        if(codigo){
            let retorno = await ItemService.deletearItem('codigo', codigo);
            console.log(retorno.rowCount);
            json.result = retorno.rowCount;
        }else{
            json.error = 'O ítem não foi deletado!';
        }
        res.json(json);
    },

    async exibirHistorico(req, res){
        console.log('Exibir Histórico');

        let json = {error:'', result:[]};

        let codigo = req.query.codigo;
        
        console.log('Código1: ', codigo);
       
        if(codigo){
            console.log('Código no if: ', codigo);
            const historico = await ItemService.exibirHistorico(codigo);
            console.log(historico);
            json.result = historico;
        }else{
            const historico = await ItemService.exibirTodoHistorico(codigo);
            console.log(historico);
            json.result = historico;
        }
        res.json(json);
    },

    async ultimosLancamentos(req, res){
        console.log('Exibir Histórico');

        let json = {error:'', result:[]};

        const historico = await ItemService.ultimosLancamentos();
        console.log(historico);
        json.result = historico;
        
        res.json(json);
    }
}




