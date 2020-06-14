const PetModel = require('../models/pets/pets');

module.exports = (app) =>{

    app.post("/pet", (req, resp)=>{
        const pet = req.body;
        PetModel.add(pet, resp);
    })
}