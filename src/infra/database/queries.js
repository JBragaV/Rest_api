const conexao = require('./conexao');

const queries = (sql, parametros="")=>{
    return new Promise((resolve, reject)=>{
        conexao.query(sql, parametros, (error, resultados)=>{
            if(error){
                reject(error);
            }else{
                resolve(resultados);
            }
        })
    })
}

module.exports = queries;