const moment = require('moment');

const conexao = require("../../infra/database/conexao");
const respositorio = require('../../repositorios/atendimento-repositorio');

class Atendimentos{

    constructor(){
        this.erros = [
            {
                nomeCampo: "Data",
                valido: false,
                mensagem: "A data de entrega deve ser depois da data de criação"
            },
            {
                nomeCampo: "Nome",
                valido: false,
                mensagem: "O nome deve ter no mínimo 5 letras"
            }
        ]
    }

    add(atendimento){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        this.erros[0].valido = moment(data).isSameOrAfter(dataCriacao);
        this.erros[1].valido = atendimento.cliente.length > 4;
        const existeErros = this.erros.filter(erro => !erro.valido);
        if(existeErros.length){
            console.log(data);
            console.log(dataCriacao);
            return new Promise((resolve, reject) => reject(existeErros));
        }else{
            const atendimentoDatado = {...atendimento, data, dataCriacao}
            return respositorio.adiciona(atendimentoDatado)
        }
    }

    lista(){
        return new Promise((resolve, reject)=>{
            respositorio.lista()
                .then(resultados=>{
                    resolve(resultados);
                }).catch(error=> reject(error));
        })
    }

    buscaPorId(id){
        return new Promise((resolve, reject)=>{
            respositorio.buscarPorId(id)
            .then(resultado =>{
                    console.log(resultado);
                    resolve(resultado);
                }).catch(error => reject(error));
        })
    }

    altera(id, valores){
        return new Promise((resolve, reject)=>{
            respositorio.alterar(id, valores)
                .then(resultados =>{
                    resolve(resultados);
                })
                .catch(error => reject(error));
        })
    }

    deletar(id){
        return new Promise((resolve, reject)=>{
            respositorio.deletar(id)
                .then(mensagem => resolve(mensagem))
                .catch(error => reject(error));
        })
    }
}

module.exports = new Atendimentos;