const atendimentos = require('../models/atendimentos/atendimentos');

module.exports = app=>{
    //Tirar essa rota depois... não faz sentido exitir
    app.get('/', (req, resp)=>{
        resp.redirect("/atendimentos")
    });

    app.route('/atendimentos')
        .get((req, resp)=>{
            atendimentos.lista().then(resultados=>{
                resp.json(resultados);
            }).catch(error=> resp.status(400).json(error));
        })
        .post((req, resp)=>{
            const atendimento = req.body;
            atendimentos.add(atendimento)
                .then(resultado =>{
                    resp.json(resultado);
                }).catch(error => resp.status(400).json(error))
        });

    app.route('/atendimentos/:id')
        .get((req, resp)=>{
            const id = parseInt(req.params.id);
            atendimentos.buscaPorId(id)
                .then(resultado => resp.json(resultado))
                .catch(error => resp.status(400).json(error));
        })
        .patch((req, resp)=>{
            const id = parseInt(req.params.id);
            console.log(id);
            console.log(req.body);
            atendimentos.altera(id, req.body)
                .then(resultados => resp.json(resultados))
                .catch(error => resp.status(400).json(error));
        })
        .delete((req, resp)=>{
            const id = parseInt(req.params.id);
            atendimentos.deletar(id)
                .then(mensagem => resp.json(mensagem))
                .catch(error => resp.status(400).json(error));
        });
}