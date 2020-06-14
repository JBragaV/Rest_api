class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaAtendimentos();
        this.criarPet();
    }

    criarTabelaAtendimentos(){
        const sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao dateTime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";

        this.conexao.query(sql, (error)=>{
            if(error){
                console.log(error);
                console.log("Erro ao criar a tabela");
            }else{
                
            }
        })
    }

    criarPet(){
        const sql = "CREATE TABLE IF NOT EXISTS Pet (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))";

        this.conexao.query(sql, (error)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Tabela Pet foi criada com sucesso!!!")
            }
        })
    }
}

module.exports = new Tabelas;