const fs = require('fs');
const path = require('path');

module.exports = (caminho, nome, cb)=>{

    const extensaoValidas = ['.jpg', '.jpeg', '.png'];
    const tipo = path.extname(caminho);
    const ehInvalido = extensaoValidas.indexOf(tipo)===-1;
    if(ehInvalido){
        const error = {mensagem: "Não é uma figura ou não é uma figura Válida!!!"};
        cb(error);
    }else{
        const novoCaminho = `./src/assets/img/${nome}${tipo}`;
    
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', ()=> cb(null, novoCaminho));
    }
}
