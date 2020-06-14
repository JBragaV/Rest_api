const conexao = require("../../infra/database/conexao");
const axios = require('axios');
const moment = require('moment');
const apiCpf= "http://localhost:8082";

class Atendimentos{
    add(atendimento, resp){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const nomeEhValido = atendimento.cliente.length > 4;

        const erros = [
            {
                nomeCampo: "Data",
                valido: dataEhValida,
                mensagem: "A data de entrega deve ser depois da data de criação"
            },
            {
                nomeCampo: "Nome",
                valido: nomeEhValido,
                mensagem: "O nome deve ter no mínimo 5 letras"
            }
        ]

        const existeErros = erros.filter(erro => !erro.valido);

        if(existeErros.length){
            console.log(data);
            console.log(dataCriacao);
            resp.status(400).send(existeErros);
        }else{
            const atendimentoDatado = {...atendimento, data, dataCriacao}
            const sql = "INSERT INTO Atendimentos SET ?";
    
            conexao.query(sql, atendimentoDatado, (error, resultado) =>{
                if(error){
                    console.log('Erro ao adicionar dados na tabela atendimentos');
                    resp.status(400).send(error);
                }else{
                    console.log("Atendimento adicionado com sucesso no banco de dados");
                    resp.status(201).send(resultado);
                }
            })
        }
    }

    lista(resp){
        const sql = `SELECT * FROM atendimentos`;

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{

                resp.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, resp){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, async(erro, resultados)=>{
            const atendimento = resultados[0]
            const cpf = atendimento.cliente;
            if(erro){
                resp.status(400).json(erro);
            }else{
                const {data} = await axios.get(`${apiCpf}/${cpf}`);
                atendimento.cliente = data
                resp.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, resp){
        console.log(valores.data)
        if(valores.data){
             valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        }
        const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`;

        conexao.query(sql, valores, (erro, resposta)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json(resposta);
            }
        })
    }

    deletar(id, resp){
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`;
        
        conexao.query(sql, (erro, resposta)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json(resposta);
            }
        })
    }
}

module.exports = new Atendimentos;