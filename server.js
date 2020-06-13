const customExpress = require('./src/config/custom-express');
const conexao = require('./src/infra/conexao');
const Tabelas = require('./src/infra/tabelas');

conexao.connect(error=>{
    if (error) {
        console.log(error)
    }else{
        console.log("Conexão com banco de dados estabelecida!!!");
        Tabelas.init(conexao);
        const app = customExpress();
        
        app.listen(3000, (req, resp)=>{
            console.log(`Servidor iniciado na porta 3000`);
        });
    }
})