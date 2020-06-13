const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = ()=>{
    const app = express();

    //Os dados podem ser usado via browser ou via JSON 
    app.use(bodyParser.urlencoded({extended:true}));//config do browser
    app.use(bodyParser.json());//config do json
    
    consign().include("./src/controllers").into(app);
    
    return app  
}