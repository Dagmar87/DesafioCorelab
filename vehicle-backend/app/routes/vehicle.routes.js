module.exports = app => {
    const vehicles = require("../controllers/vehicle.controller.js");
    var router = require("express").Router();

    // Criar um novo veiculo
    router.post("/", vehicles.create);
    // Recuperar todos os veiculos
    router.get("/", vehicles.findAll);
    // Recuperar um único veiculo com id
    router.get("/:id", vehicles.findOne);
    // Atualizar um veiculo com id
    router.put("/:id", vehicles.update);
    // Excluir um veiculo com id
    router.delete("/:id", vehicles.delete);
    // Excluir todos os veiculos
    router.delete("/", vehicles.deleteAll);

    app.use('/api/vehicles', router);
};