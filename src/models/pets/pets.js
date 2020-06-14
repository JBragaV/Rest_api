const conexao = require('../../infra/database/conexao');
const uploadArquivo = require('../../upload/uploadDeArquivos');

class Pets{
    add(pet, resp){
        const sql = "INSERT INTO Pet SET ?";
        uploadArquivo(pet.imagem, pet.nome, (error, novoCaminho)=>{
            if(error){
                resp.status(400).json(error.mensagem);
            }else{
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                conexao.query(sql, novoPet, (erro, response)=>{
                    if(erro){
                        console.log(erro);
                        resp.status(400).json(erro);
                    }else{
                        console.log(response);
                        resp.status(200).json(novoPet);
                    }
                })
            }
        })
    }
}

module.exports = new Pets();