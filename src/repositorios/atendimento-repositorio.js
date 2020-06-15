const query = require('../infra/database/queries');
const axios = require('axios');

const apiCpf= "http://localhost:8082";

class AtendimentoRepositorio{
    adiciona(atendimento){
        const sql = "INSERT INTO Atendimentos SET ?";
        return new Promise((resolve, reject)=>{
            query(sql, atendimento)
                .then(resultados=>{
                    console.log(resultados);
                    resolve(atendimento);
                })
                .catch(error=>reject(error))
        });
    }

    lista(){
        const sql = `SELECT * FROM atendimentos`;
        return new Promise((resolve, reject)=>{
            query(sql)
                .then(resultados=>{
                    resolve(resultados);
                }).catch(error=> reject(error));
        })
    }

    buscarPorId(id){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
        return new Promise((resolve, reject)=>{
            query(sql).then(async(resultados)=>{
                const atendimento = resultados[0];
                const cpf = atendimento.cliente
                const {data} = await axios.get(`${apiCpf}/${cpf}`);
                atendimento.cliente = data
                resolve(atendimento);
            }).catch(erros => reject(erros));
        })
    }

    alterar(id, valores){
        return new Promise((resolve, reject)=>{
            if(valores.data){
                 valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            }
            const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`;

            query(sql, valores).then(resultados => {
                resolve(resultados);
            }).catch(error => reject(error));
        });
    }

    deletar(id){
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`;

        return new Promise((resolve, reject)=>{
            query(sql).then(resultado=>{
                console.log(resultado)
                resolve("Atendimento apagado com seucesso!!!");
            })
            .catch(error=>{
                console.log(error);
                reject("Erro ao deletar o atendimento!!!");
            })
        })
    }
}

module.exports = new AtendimentoRepositorio();