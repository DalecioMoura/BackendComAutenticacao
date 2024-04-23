const UsuariosServices = require('../services/UsuariosServices');

module.exports = {
    async listarUsuarios(req, res){
        let json = {error:'', result:[]};

        let usuarios = await UsuariosServices.listarUsuarios();

        for(let i in usuarios){
            json.result.push({
                id:usuarios[i].id,
                matricula:usuarios[i].matricula,
                nome:usuarios[i].nome,
                apelido:usuarios[i].apelido,
                setor:usuarios[i].setor,
                email:usuarios[i].email,
                usuario:usuarios[i].usuario
            });
        }
        res.json(json);
    },

    async listarUsuario(req, res){
        let json = {error:'', result:[]};

        let filtro = JSON.parse(req.params.id);
        console.log(filtro.filtro);
        console.log(filtro.valor);
        let usuario = await UsuariosServices.listarUsuario(filtro.filtro, filtro.valor);

        if(usuario)
            json.result = usuario;
        else
            json.error = 'Usuário não encontrado!'

        res.json(json);

        console.log(filtro);
    },

    async cadastrarUsuario(req, res){
        let json = {error:'', result:[]};
        console.log('chegou no controller')
        console.log(req.body)

        let obj = {
            matricula:req.body.matricula,
            nome:req.body.nome,
            apelido:req.body.apelido,
            setor:req.body.setor,
            email:req.body.email,
            usuario:req.body.usuario
        }

        if(obj.matricula && obj.nome && obj.apelido){
            let usuario = await UsuariosServices.cadastrarUsuario(obj);
            console.log(usuario[0]);
            json.result = await UsuariosServices.listarUsuario('id', usuario[0].id);
        }else{
            json.error = 'Usuário não cadastrado'
        }
        res.json(json);
    },

    async modificarUsuario(req, res){
        console.log('editar usuário')
        let json = {error:'', result:[]}

        let obj = {
            id:req.params.id,
            matricula:req.body.matricula,
            nome:req.body.nome,
            apelido:req.body.apelido,
            setor:req.body.setor,
            email:req.body.email,
            usuario:req.body.usuario
        };
        if(obj.matricula && obj.nome){
            await UsuariosServices.modificarUsuario(obj);
            console.log('usuario editado!');
            json.result = await UsuariosServices.listarUsuario('id', obj.id);
        
        }else{
            json.error = 'Dados não enviados!'
        }
        res.json(json);

    },
    
    async deletarUsuario(req, res){
        console.log('Deletar usuário!');
        let json = {error:'', result:[]};

        let id = req.params.id;

        if(id){
            let retorno = await UsuariosServices.deletarUsuario(id);
            json.result = retorno;
        }
        else
            json.error = 'O usuário não foi excluído do banco de dados'
        res.json(json);
    }
}