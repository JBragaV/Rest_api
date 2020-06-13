const atendimentos = require('../models/atendimentos/atendimentos');

module.exports = app=>{
    //Tirar essa rota depois... não faz sentido exitir
    app.get('/', (req, resp)=>{
        resp.redirect("/atendimentos")
    });

    app.get('/atendimentos', (req, resp)=>{
        atendimentos.lista(resp);
    });

    app.get('/atendimentos/:id', (req, resp)=>{
        const id = parseInt(req.params.id);
        atendimentos.buscaPorId(id, resp);
    });

    app.post('/atendimentos', (req, resp)=>{
        const atendimento = req.body;
        atendimentos.add(atendimento, resp);
    });

    app.patch('/atendimentos/:id', (req, resp)=>{
        const id = parseInt(req.params.id);
        atendimentos.altera(id, req.body, resp);
    });

    app.delete('/atendimentos/:id', (req, resp)=>{
        const id = parseInt(req.params.id);
        atendimentos.deletar(id, resp);
    });
}